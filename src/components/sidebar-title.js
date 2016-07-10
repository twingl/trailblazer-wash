import React from 'react';

import Actions from '../actions';
import Constants from '../constants';

export default class SidebarTitle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      title: this.props.node.data.title
    };
  }

  componentWillReceiveProps(nexProps){
      this.setState({
          title: (nexProps.node) ? nexProps.node.data.title : 'No title'
      });
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.action) {
        case Constants.__change__:
          if (message.storeName === "NodeStore" && this.props.node && message.payload.localId === this.props.node.data.localId) {
              console.log('setting the updated title ' + message.payload.title);
            this.setState({
                editable: false,
                title: message.payload.title
            });
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
      this.setState({title: this.props.node.data.title, editable: false});
      this.onBlur();
    }
  }

  onChange(evt) {
    this.state.title = evt.target.value;
  }

  onBlur(evt) {
    this.setState({
        editable: false
    });
    console.log(this.state.title + ' == ' + this.props.node.data.title );

    if (this.state.title != this.props.node.data.title) {
      Actions.setNodeTitle(this.props.node.data.localId, this.state.title);
    };
  }

};
