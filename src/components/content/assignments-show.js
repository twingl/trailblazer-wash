var React       = require('react')
  , MapView     = require('../map-view');

var _ = require('lodash');


/**
 * The Assignments Show view.
 *
 * Shows a single Assignment, rendering it as a MapView
 */
module.exports = React.createClass({

  getInitialState: function () {
    return {
      assignment: undefined,
      nodes: []
    };
  },

  componentDidMount: function () {
    chrome.runtime.onMessage.addListener( function (message) {
      switch (message.action) {
        case this.props.constants.__change__:
          if (message.storeName === "NodeStore" &&
              message.payload.assignment &&
              message.payload.assignment.localId === this.props.localId) {

            if (this.isMounted()) this.setState({
              assignment: message.payload.assignment,
              nodes: message.payload.nodes
            });
          }
          if (message.storeName === "AssignmentStore" &&
              message.payload.assignment &&
              message.payload.assignment.localId === this.props.localId) {

            if (this.isMounted()) this.setState({
              assignment: message.payload.assignment
            });
          }
          break;
      }
    }.bind(this));

    this.props.actions.viewedMap(this.props.localId);
    this.props.actions.requestNodes(this.props.localId);
  },

  render: function () {
    var el;
    if (this.state.assignment) {
      document.title = this.state.assignment.title;
    }

    if (this.state.assignment && this.state.nodes) {
      el = <MapView
        assignment={this.state.assignment}
        nodes={this.state.nodes}
        actions={this.props.actions}
        constants={this.props.constants} />;
    } else {
      el = <span>Loading</span>;
    }

    return <div className="wrap assignment-show">{el}</div>
  }
});


