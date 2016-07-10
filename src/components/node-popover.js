import React from 'react';

import classnames from 'classnames';
import Constants from '../constants';

export default class NodePopover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      title: this.props.node.title || <i>No title</i>
    };

    this.position = props.position;
    this.mouseInBounds;
    this.mouseInParentBounds;
  }

  // On component mount, register an event listener and callback
  componentDidMount() {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.action) {
        case Constants.SET_NODE_TITLE:
          if (message.payload.title && message.payload.localId == this.props.node.localId) {
            this.setState({ title: message.payload.title });
          }
      }
    });
  }

  // We want to set the dom attributes ourselves to avoid triggering React's
  // diffing algorithm every draw
  updatePosition(position) {
    this.position = position;
    let domNode = React.findDOMNode(this);
    domNode.setAttribute('style', `transform: translate(${this.position.x}px, ${this.position.y}px)`);
  }

  componentWillReceiveProps(newProps) {
    this.position = newProps.position;
  }

  activate() {
    clearTimeout(this.dismissTimeout);
    this.setState({ visible: true });
  }


  // Dismisses the popup if the mouse is not in its bounds or its parent's
  // bounds.
  softDismiss() {
    clearTimeout(this.dismissTimeout);
    this.dismissTimeout = setTimeout( () => {
      if (!this.mouseInBounds && !this.mouseInParentBounts && !this.state.deletePending) {
        this.setState({ visible: false });
      }
    }, 100);
  }

  onMouseEnter(evt) {
    this.mouseInBounds = true;
  }

  onMouseLeave(evt) {
    this.mouseInBounds = false;
    this.softDismiss();
  }

  onResumeClicked(evt) {
    this.props.actions.resumeRecording(this.props.node.localId);
  }

  onDeleteClicked(evt) {
    this.setState({ deletePending: true });
    (this.props.onDeletePending || (() => {}))(evt);
  }

  onConfirmDeleteClicked(evt) {
    this.setState({ deletePending: false });
    (this.props.onDeleteConfirmed || (() => {}))(evt);
  }

  onCancelDeleteClicked(evt) {
    this.setState({ deletePending: false });
    (this.props.onDeleteCancelled || (() => {}))(evt);
  }

  render() {
    let content;
    let actions;
    let title = this.state.title;

    if (this.state.deletePending) {
      actions = [
        <p className='warning'>
          This will delete all pages coloured red. Are you sure?
        </p>,
        <div className='actions'>
          <div className='secondary'>
            <button onClick={this.onCancelDeleteClicked.bind(this)} className='cancel-delete'>Cancel</button>
          </div>
          <div className='primary'>
            <button onClick={this.onConfirmDeleteClicked.bind(this)} className='confirm-delete'>Delete</button>
          </div>
        </div>
      ];
    } else if (this.props.node.deletePending) {
      // No actions while another node is being considered for deletion
    } else {
      actions = <div className='actions'>
        <div className='secondary'>
          <button onClick={this.onDeleteClicked.bind(this)} className='delete'>Delete</button>
        </div>
        <div className='primary'>
          <button onClick={this.onResumeClicked.bind(this)} className='resume'>Resume</button>
        </div>
      </div>
    }

    if (this.state.visible) {
      let classNames = classnames('node-popover', {
        'delete-pending': this.state.deletePending
      });

      content = <div className={classNames}>
        <div className='content'>

          <h1>{title}</h1>

          <div className='detail'>
            <a className='url' target='_blank' href={this.props.node.url}>{this.props.node.url}</a>
          </div>

          {actions}

        </div>
      </div>;
    }

    return <div
      onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}>
      {content}
    </div>
  }

};
