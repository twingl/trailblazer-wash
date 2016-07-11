import React           from 'react';

import messageChannel  from '../util/message-channel';
import Actions from '../actions';
import Constants from '../constants';

export default class VoteMinDown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rank: props.node.rank
    };
  }

  componentDidMount() {
    // listen for `change` evts for the current node
    messageChannel.listen( function (message) {
      switch (message.action) {
        case Constants.__change__:
          if (message.payload.store === "NodeStore"  && message.payload.node &&
              message.payload.node.localId === this.props.node.localId) {
            this.props.node.rank = message.payload.node.rank;
            this.setState({ rank: message.payload.node.rank });
          }
          break;
      }
    }.bind(this));
  }

  render() {
    var width = this.props.width + "px";
    var height= this.props.height + "px";
    var viewBox = "0 0 " + this.props.width  + " " + this.props.height;
    var waypointClass = this.state.rank === -1 ? "downvote button button-danger min selected" : "downvote button button-danger min";

    return  <a onClick={this.onClick.bind(this)} className={waypointClass} >
                <img src="/assets/icons/downvote.svg" />
            </a>;
  }

  onClick() {

    Actions.rankNodeDownPopUp(this.props.node.id, this.props.node.localId, this.props.node.parentId, this.props.node.localParentId);

  }

};
