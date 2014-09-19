/** @jsx React.DOM */

(function($) {
  //assignment list component with embedded list items
  var AsssignmentList = React.createClass({
    render: function () {
      var assignments = this.props.items.map(function (assignment) {
        return <AsssignmentItem item={assignment} />;
      });

      return <ul>{assignments}</ul>;
    }
  });


  var AsssignmentItem = React.createClass({
    render: function () {
      return  <div>
                <li
                  key={this.props.item.id}
                  onClick={this.handleClick} >
                  {this.props.item.title}
                </li>
                <a onClick={this.destroy}>Delete</a>
              </div>
    },

    handleClick: function () {
      var id = this.props.item.id;
      chrome.runtime.sendMessage({action: 'getNodes', assignmentId: id})
      window.location.href  = "/ui/pages/map.html#assignment=" + id;
    },

    destroy: function () {
      var id = this.props.item.id;
      chrome.runtime.sendMessage({action: 'destroyAssignment', assignmentId: id})
    }
  });

  // listen for updates to assignments and render in a list
  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.action === "updatedAssignments") {
      var assignments = request.updatedAssignments;

      if (assignments.length > 0) {
        React.renderComponent(
          <AsssignmentList items={assignments} />,
          document.getElementById('assignment-list')
        );
      };
    }
  });

  // send message to chrome to trigger assignment update
  $(document).ready(function () {
    chrome.runtime.sendMessage({ action: 'getAssignments' });
  });
}(window.jQuery));
