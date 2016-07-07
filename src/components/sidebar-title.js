import React from 'react';

import Actions from '../actions';
import Constants from '../constants';

export default class SidebarTitle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      title: false
    };
  }

  componentWillReceiveProps(nexProps){
      this.state = {title: (nexProps.node) ? nexProps.node.data.title : ''};
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message) => {

      switch (message.action) {
        case Constants.__change__:
          if (message.storeName === "NodeStore" &&
              message.payload.node &&
              message.payload.node.localId === this.props.node.data.localId) {
            //this.setState({ title: message.payload.node.data.title });
            this.forceUpdate();
          }
      }
    });
  }

  render() {
    var editable = this.state.editable;

    if (editable) {
      return <div className="title-wrap">
                <input
                    id="title-input"
                    className="sidebar-title"
                    type="text"
                    autoFocus
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange.bind(this)}
                    onKeyPress={this.onKeyPress.bind(this)}
                    defaultValue={this.state.title} />
            </div>
    } else {
      return <div className="title-wrap">
                    <a href="#" className="sidebar-title" onClick={this.editTitle.bind(this)}>
                        <span>{this.state.title}</span>
                        <img onClick={this.editTitle.bind(this)} src="/assets/icons/editable-icon.svg" />
                    </a>
                </div>
    };
  }

  editTitle(evt){
      evt.preventDefault();
      this.setState({
          editable: true,
          title: this.props.node.data.title
      });
  }

  onFocus(evt) {
    evt.target.select();
  }

  onKeyPress(evt) {
    if (evt.key === 'Enter') this.onBlur();
    if (evt.key === 'Escape') {
      this.setState({title: this.props.node.data.title});
      this.setState({editable: false});
      this.onBlur();
    }
  }

  onChange(evt) {
    this.setState({title: evt.target.value});
  }

  onBlur(evt) {
    this.setState({editable: false});
    if (this.state.title != this.props.node.title) {
      Actions.setNodeTitle(this.props.node.data.localId, this.state.title);
    };
  }

};
