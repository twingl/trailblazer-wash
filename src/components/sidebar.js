import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

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
                            type="text"
                            onBlur={this.onBlur.bind(this)}
                            onFocus={this.onFocus.bind(this)}
                            onChange={this.onChange.bind(this)}
                            defaultValue={title} />
                        <span id="edit-title" onClick={this.editTitle.bind(this)} className="btn">
                            edit <img src="/assets/icons/editable-icon.svg" />
                        </span>
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
                        <span id="title" className="title">{title}</span>
                        <span id="edit-title" onClick={this.editTitle.bind(this)} className="btn">
                            edit <img src="/assets/icons/editable-icon.svg" />
                        </span>
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
      this.setState({
          editableTitle: true,
          nodeTitle: this.props.node.data.title
      });
  }

  onFocus(evt) {
    evt.target.select();
  }

  onChange(evt) {
    this.setState({nodeTitle: evt.target.value});
  }

  onBlur(evt) {
    this.setState({editableTitle: false});

    console.log( this.props.node.data.title );
    console.log( this.state.nodeTitle );

    if (this.state.nodeTitle !== this.props.node.title) {
        console.log('update node title');
      //Actions.updateNodeTitle(this.props.assignment.localId, this.state.title);
    };
  }

};
