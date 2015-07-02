var d3              = require('d3')
  , messageChannel  = require('../util/message-channel');

module.exports = function(node) {
  // If a link is middle clicked or ctrl/cmd+clicked
  if (d3.event.which === 2 || (d3.event.which === 1 && (d3.event.metaKey || d3.event.ctrlKey))) {
    d3.event.preventDefault();
    d3.event.stopPropagation();

    messageChannel.send({
      action: "trackUIEvent",
      eventName: "ui.map.node.click",
      eventData: {
        button: "meta"
      }
    });

    // Tell the runtime to open a new tab
    messageChannel.send({
      action: 'RESUME_RECORDING',
      payload: {
        localId: node.localId
      }
    });
  } else if (d3.event.which === 1) {
    d3.event.preventDefault();
    d3.event.stopPropagation();

    messageChannel.send({
      action: "trackUIEvent",
      eventName: "ui.map.node.click",
      eventData: {
        button: "left"
      }
    });

    if (node.tabId) {
      chrome.tabs.update(node.tabId, { active: true }, function(tab) {
        chrome.windows.update(tab.windowId, {focused: true});
      });
    } else {
      // Tell the runtime to open a new tab
    messageChannel.send({
      action: 'RESUME_RECORDING',
      payload: {
        localId: node.localId,
        focus: true
      }
    });
    }
  }
};
