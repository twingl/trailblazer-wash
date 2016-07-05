import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../actions';
import Constants from '../constants';

////components
//import AssignmentTitle from './assignment-title';
//import ShareMap from './share-map';
//import Legend from './legend';
//import Trail from './trail';
//
//import Logger from '../util/logger';
//var logger = Logger('map-view');

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editableTitle: false,
      nodeTitle: ''
    };

  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message) => {

      switch (message.action) {
        case Constants.__change__:
          if (message.storeName === "NodeStore" &&
              message.payload.node &&
              message.payload.node.localId === this.props.node.data.localId) {
            this.setState({ nodeTitle: message.payload.node.data.title });
            this.forceUpdate();
          }
      }
    });
  }

  render() {
//    var nodeObj = {};
//    this.props.nodes.map(node => nodeObj[node.localId] = node);
//
//    var visible, shareText, title, url;
//
//    visible       = this.props.assignment.visible; //state
//    shareText     = (visible) ? "Shared" : "Share"; //state
//    title         = this.props.assignment.title;
//    url           = this.props.assignment.url;
//
//    //nodes are immutable
//    var data = {
//      nodeObj: nodeObj,
//      assignment: this.props.assignment
//    };

    var title   = '';
    var url     = '';
    var classes = 'sidebar';

    if( this.props.node ){
        title   = this.props.node.data.title;
        url     = this.props.node.data.url;
        classes = (this.props.visible) ? 'sidebar slidein' : 'sidebar slideout';
    }

    var editable = this.state.editableTitle;

    if( editable ){
        return  <div className={classes} id="sidebar">
                    <div className="close" onClick={this.close}>
                        <span className="btn">close</span>
                    </div>
                    <div className="title-wrap">
                        <input
                            id="title-input"
                            className="sidebar-title"
                            type="text"
                            autoFocus
                            onBlur={this.onBlur.bind(this)}
                            onFocus={this.onFocus.bind(this)}
                            onChange={this.onChange.bind(this)}
                            onKeyPress={this.onKeyPress.bind(this)}
                            defaultValue={title} />
                    </div>
                    <div className="url">{url}</div>
                    <div className="intro"></div>
                </div>
    }else{
        return  <div className={classes} id="sidebar">
                    <div className="close" onClick={this.close}>
                        <span className="btn">close</span>
                    </div>
                    <div className="title-wrap">
                        <a href="#" className="sidebar-title" onClick={this.editTitle.bind(this)}>
                            <span>{title}</span>
                            <img onClick={this.editTitle.bind(this)} src="/assets/icons/editable-icon.svg" />
                        </a>
                    </div>
                    <div className="url">{url}</div>
                    <div className="intro"></div>
                </div>
    }

  }

  close() {
    var sidebar = document.getElementById('sidebar')
    sidebar.classList.remove('slidein')
    sidebar.classList.add('slideout')
  }

  editTitle(evt){
      evt.preventDefault();
      this.setState({
          editableTitle: true,
          nodeTitle: this.props.node.data.title
      });
  }

  onFocus(evt) {
    evt.target.select();
  }

  onKeyPress(evt) {
    if (evt.key === 'Enter') this.onBlur();
    if (evt.key === 'Escape') {
      this.setState({nodeTitle: this.props.node.data.title});
      this.setState({editableTitle: false});
      this.onBlur();
    }
  }

  onChange(evt) {
    this.setState({nodeTitle: evt.target.value});
  }

  onBlur(evt) {
    this.setState({editableTitle: false});
    if (this.state.nodeTitle != this.props.node.title) {
      Actions.setNodeTitle(this.props.node.data.localId, this.state.nodeTitle);
    };
  }

};
