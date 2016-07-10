import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../actions';
import Constants from '../constants';

////components
import SidebarTitle from './sidebar-title';
import Upvote from './upvote';
import Neutralvote from './neutralvote';
import Downvote from './downvote';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      node: this.props.node
    };
  }

//  componentDidMount() {
//    chrome.runtime.onMessage.addListener((message) => {
//      switch (message.action) {
//        case Constants.__change__:
//          if (message.storeName === "NodeStore" && this.props.node && message.payload.localId === this.props.node.data.localId) {
//              console.log('setting the updated title ' + message.payload.title);
//            this.setState({
//                title: message.payload.title
//            });
//            //this.forceUpdate();
//          }
//      }
//    });
//  }

  componentWillReceiveProps(nexProps){
      this.state = {node: nexProps.node};
      console.log( this.state.node );
  }

  render(){

    var title   = '';
    var url     = '';
    var classes = (this.state.node === null) ? 'sidebar' : 'sidebar slideout';

    if( this.state.node ){

        title   = this.state.node.data.title;
        url     = this.state.node.data.url;
        classes = 'sidebar slidein';

        return  <div className={classes} id="sidebar">
                    <div className="close" onClick={this.close}>
                        <span className="btn">close</span>
                    </div>
                    <SidebarTitle node={this.state.node} actions={this.props.actions} constants={Constants} />
                    <div className="url">{url}</div>
                    <div className="intro"></div>
                    <Upvote node={this.state.node.data} />
                    <Neutralvote node={this.state.node.data} />
                    <Downvote node={this.state.node.data} nodes={this.props.nodes} onDownVote={this.onDownVote.bind(this)} />
                </div>
    }else{
        return  <div className={classes} id="sidebar">
                    <div className="close" onClick={this.close}>
                        <span className="btn">close</span>
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

  onDownVote(){
      this.props.onDownVote();
//      this.props.node = false;
//      this.setState({node: false});
  }

};
