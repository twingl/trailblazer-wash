import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../actions';
import Constants from '../constants';

//components
import AssignmentTitle from './assignment-title';
import ShareMap from './share-map';
import Legend from './legend';
import Trail from './trail';
import Sidebar from './sidebar';

import Logger from '../util/logger';
var logger = Logger('map-view');

export default class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sharePopoverState: false,
      currentNode: null,
      sidebarVisible: false
    };
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.action) {
        case Constants.RANK_NODE_DOWN_POPUP:

              if( message.payload.id && message.payload.parentId && message.payload.localParentId ){
                  console.log( message );
                  this.props.nodes.forEach(function(n, ni){

                      console.log(n.parentId + '==' + message.payload.id);

                        // The downvoted node has a child? Set the child with the deleted node parentID
                        if( n.parentId == message.payload.id )
                            Actions.updateNodeParentId(n.localId, message.payload.parentId, message.payload.localParentId);

                        if( ni == this.props.nodes.length-1 )
                            Actions.rankNodeDown(message.payload.localId);

                  }, this)
              }

        break;
      }
    });
  }

  render() {
    var nodeObj = {};
    this.props.nodes.map(node => nodeObj[node.localId] = node);

    var visible, shareText, title, url;

    visible       = this.props.assignment.visible; //state
    shareText     = (visible) ? "Shared" : "Share"; //state
    title         = this.props.assignment.title;
    url           = this.props.assignment.url;

    //nodes are immutable
    var data = {
      nodeObj: nodeObj,
      assignment: this.props.assignment
    };

    return  <div className="map-view-wrapper" onClick={this.handleClick.bind(this)}>
              <Link to="/assignments" className="nav-assignment-list"></Link>
              <AssignmentTitle assignment={this.props.assignment} actions={this.props.actions} constants={Constants} />
              <Trail id="map-container" svgId="map" assignment={this.props.assignment} nodes={this.props.nodes} onNodeClicked={this.onNodeClicked.bind(this)} actions={this.props.actions} />
              <Legend />
              <span className="help">
                <a
                  className="feedback"
                  href="mailto:hello@trailblazer.io?subject=Trailblazer In-App Feedback"
                  title="Problem? Let us know."
                  target="_blank">
                  Feedback |
                </a>
                <a
                  className="tutorial"
                  href="/build/tour.html"
                  title="How do I use Trailblazer?"
                  target="_blank" >
                  <img src="/assets/icons/tutorial-icon-light.svg" />
                </a>
                <ShareMap
                  localAssignmentId={this.props.assignment.localId}
                  visible={visible}
                  mapURL={url}
                  popover={this.state.sharePopoverState}
                  actions={this.props.actions}
                  togglePopover={this.togglePopover.bind(this)} />
              </span>
              <Sidebar node={this.state.currentNode} nodes={this.props.nodes} onDownVote={this.onDownVote.bind(this)} />
            </div>;
  }

  handleClick(evt) {
    //remove popover when clicking anywhere else
    if (this.state.sharePopoverState &&
        !document.getElementById('share-popover').contains(evt.target)) {
      this.setState({sharePopoverState: false});
    };
  }

  togglePopover() {
    var bool = !this.state.sharePopoverState;
    this.setState({sharePopoverState: bool});
  }

  onNodeClicked(node) {
    this.setState({
      currentNode: (this.state.currentNode == node) ? false : node
    });
  }

  onDownVote(){
      this.setState({ currentNode: false });
  }

};
