/** @jsx React.DOM */
//helpers
var React = require('react');
var _ = require('lodash');
var domready = require('domready');

//components
var MapView = require('app/components/map-view');

//variables
var assignmentId;
var chrome = window.chrome;

var getMap =  function(assignmentId) {
  chrome.runtime.sendMessage({ action: "getMap", assignmentId: assignmentId }, function(response) {
      console.log('getmap fired')
      if (response.data && response.data.nodes && Object.keys(response.data.nodes).length > 0) {
        console.log('response', response, document.getElementsByTagName('body')[0])
        var data = response.data;

        React.renderComponent(
          <MapView title={response.data.assignment.title} data={data} />,
          document.getElementsByTagName('body')[0]
        );

      };
    });
};

if (window.location.hash) {
  var o = {};
  _.each(window.location.hash.substring(1).split('&'), function(i) {
    var kv = i.split('=');
    o[kv[0]] = kv[1];
  });
  assignmentId = parseInt(o.assignment);
};

//listen for updates to an assignment's nodes and render map (unused)
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.action === "updatedNodes" && request.assignmentId === assignmentId) {
    getMap(assignmentId);
  };
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.action === "updatedAssignment" && request.assignment.assignmentId === assignmentId) {
    getMap(assignmentId);
  };
});


domready(function() {
  console.log('domready fired')
  getMap(assignmentId);
});



