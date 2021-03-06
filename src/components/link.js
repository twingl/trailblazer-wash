import React from 'react';

import classnames from 'classnames';

export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this.position = props.position;
  }

  // We want to set the dom attributes ourselves to avoid triggering React's
  // diffing algorithm every draw
  updatePosition(position) {
    this.position = position;
    let domNode = React.findDOMNode(this);

    domNode.setAttribute('x1', this.position.from.x);
    domNode.setAttribute('y1', this.position.from.y);
    domNode.setAttribute('x2', this.position.to.x);
    domNode.setAttribute('y2', this.position.to.y);
  }

  componentWillReceiveProps(newProps) {
    this.position = newProps.position;
  }

  render() {
    let classes = classnames('link', {
      'delete-pending': !!this.props.link.data.deletePending
    });

    return <line className={classes}
      x1={this.position.from.x} y1={this.position.from.y}
      x2={this.position.to.x} y2={this.position.to.y} />;
  }
};
