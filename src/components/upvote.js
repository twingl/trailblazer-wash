import React           from 'react';

import messageChannel  from '../util/message-channel';
import Actions from '../actions';
import Constants from '../constants';

export default class Upvote extends React.Component {

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
          if (message.payload.store === "NodeStore" &&
              message.payload.node.localId === this.props.node.localId) {
            this.props.node.rank = message.payload.node.rank;
            //this.setState({ rank: message.payload.node.rank });
          }
          break;
      }
    }.bind(this));
  }

  render() {
    var classes = this.state.rank === 1 ? "upvote button selected" : "upvote button";
    return  <a onClick={this.onClick.bind(this)}
              className={classes} >Upvote</a>;
  }

  onClick() {
    messageChannel.send({
      action: "trackUIEvent",
      eventName: "ui.popup.waypoint.toggle",
      eventData: { }
    });

    Actions.rankNodeWaypoint(this.props.node.localId);
  }

};
