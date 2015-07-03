var React       = require('react')
  , navigate    = require('react-mini-router').navigate;

/**
 * The Idle popup view.
 * Displayed when the user is signed in, but the current tab is not recording.
 */
module.exports = React.createClass({
  componentDidMount: function () {
    // Bind listener
    chrome.runtime.onMessage.addListener( function (message) {
      switch (message.action) {

        // If we hear a successful response then show the recording UI
        case this.props.constants.START_RECORDING_SUCCESS:
          if (message.payload.tabId === this.props.tabId) {
            this.props.actions.requestTabState(this.props.tabId);
          }
          break;

        // If we hear a fail response then show some error
        case this.props.constants.START_RECORDING_FAIL:
          if (message.payload.tabId === this.props.tabId) {
            // show an error
          }
          break;

        default:
          break;
      }
    }.bind(this));
  },

  onRecordClicked: function (evt) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      this.props.actions.startRecording(tab.id, tab);
    }.bind(this));
  },

  onViewTrailsClicked: function (evt) {
    chrome.tabs.create({ url: "/build/content.html" });
  },

  onSignOutClicked: function (evt) {
    this.props.actions.signOut();
  },

  onTutorialClicked: function (evt) {
    chrome.tabs.create({ active: true, url: chrome.runtime.getURL("/build/tour/sign-in.html") });
  },

  render: function () {
    return <div className="wrap idle cf">
      <a  className="button button-record start-recording"
          title="Record a New Trail"
          onClick={this.onRecordClicked}>

        <img src="/assets/icons/trail-icon.svg" />
      </a>

      <a  className="folder folder-view-trails"
          title="View my Trails"
          onClick={this.onViewTrailsClicked}>

        <img src="/assets/icons/folder-icon.svg" />
      </a>

      <a  className="sign-out"
          title="Sign Out"
          onClick={this.onSignOutClicked}>

        <img src="/assets/icons/sign-out-icon.svg" />
      </a>

      <a  className="tutorial"
          title="How to use Trailblazer"
          onClick={this.onTutorialClicked}>

        <img src="/assets/icons/tutorial-icon.svg" />
      </a>
    </div>;
  }
});
