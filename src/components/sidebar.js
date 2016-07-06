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
  }

  render() {

    var classes = 'sidebar';
    var url = '';

    if( this.props.node ){
        classes = (this.props.visible) ? 'sidebar slidein' : 'sidebar slideout';
        url = this.props.node.data.url;

        return  <div className={classes} id="sidebar">
                <div className="close" onClick={this.close}>
                    <span className="btn">close</span>
                </div>
                <SidebarTitle node={this.props.node} actions={this.props.actions} constants={Constants} />
                <div className="url">{url}</div>
                <div className="intro"></div>
                <Upvote node={this.props.node.data} width={16} height={15} />
                <Neutralvote node={this.props.node.data} width={16} height={15} />
                <Downvote node={this.props.node.data} width={16} height={15} />
            </div>
    }else{
        return  <div className={classes} id="sidebar">
                <div className="close" onClick={this.close}>
                    <span className="btn">close</span>
                </div>
                <SidebarTitle node={this.props.node} actions={this.props.actions} constants={Constants} />
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

};
