/** @jsx React.DOM */
var d3ify = require('app/d3ify');
var React = require('react');
var _ = require('lodash');

//components
var Map = require('app/components/map');


var assignmentId;
var chrome = window.chrome;

//React component. TODO pare these off into their own directory.
var MapName = React.createClass({
  render: function () {
    return <h1>{this.props.name}</h1>
  }
});

if (window.location.hash) {
  var o = {};
  _.each(window.location.hash.substring(1).split('&'), function(i) {
    var kv = i.split('=');
    o[kv[0]] = kv[1];
  });
  assignmentId = parseInt(o.assignment);
};




var getMap =  function(assignmentId) {
  chrome.runtime.sendMessage({ action: "getMap", assignmentId: assignmentId }, function(response) {
      if (response.data && response.data.nodes && Object.keys(response.data.nodes).length > 0) {
        var name = "map";
        var data = d3ify(response.data);

        React.renderComponent(
          <MapName name={response.data.assignment.title} />,
          document.getElementById('title')
        );

        React.renderComponent(
          <Map id={name} width={960} height={500} selector={"#"+name} data={data} />,
          document.getElementById('map-container')
        );
      };
    });
};

//listen for updates to an assignment's nodes and render map
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.action === "updatedNodes" && request.assignmentId === assignmentId) {
    getMap(assignmentId);
  };
});

getMap(assignmentId);


