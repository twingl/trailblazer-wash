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

  render() {

    var classes = 'sidebar';
    if( this.props.node )
        classes = (this.props.visible) ? 'sidebar slidein' : 'sidebar slideout';

    return  <div className={classes} id="sidebar">
                <div className="close" onClick={this.close}>
                    <span className="btn">close</span>
                </div>
                <SidebarTitle node={this.props.node} actions={this.props.actions} constants={Constants} />
                <div className="url"></div>
                <div className="intro"></div>
            </div>

  }

  close() {
    var sidebar = document.getElementById('sidebar')
    sidebar.classList.remove('slidein')
    sidebar.classList.add('slideout')
  }

};
