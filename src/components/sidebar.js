import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../actions';
import Constants from '../constants';

////components
import SidebarTitle from './sidebar-title';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

    var title   = '';
    var url     = '';
    var classes = (this.props.node === null) ? 'sidebar' : 'sidebar slideout';

    if( this.props.node ){
        title   = this.props.node.props.node.data.title;
        url     = this.props.node.props.node.data.url;
        classes = 'sidebar slidein';
    }

    return  <div className={classes} id="sidebar">
                <div className="close" onClick={this.close}>
                    <span className="btn">close</span>
                </div>
                <SidebarTitle node={this.props.node} actions={this.props.actions} constants={Constants} />
                <div className="url">{url}</div>
                <div className="intro"></div>
            </div>

  }

  close() {
    var sidebar = document.getElementById('sidebar')
    sidebar.classList.remove('slidein')
    sidebar.classList.add('slideout')
  }

};