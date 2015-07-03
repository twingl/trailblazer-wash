var _                             = require('lodash')
  , Fluxxor                       = require('fluxxor')
  , constants                     = require('../constants')
  , TrailblazerHTTPStorageAdapter = require('../adapter/trailblazer_http_storage_adapter')
  , Logger                        = require('../util/logger');

var logger = new Logger('stores/assignment-store.js');

var AssignmentStore = Fluxxor.createStore({

  initialize: function (options) {
    logger.info('initialize', { options: options })
    var options             = options || {};
    this.db                 = options.db;

    logger.info('bindActions', { this: this })

    this.bindActions(
      constants.SIGN_OUT,                   this.handleSignOut,

      constants.REQUEST_ASSIGNMENTS,        this.handleRequestAssignments,

      constants.CREATE_ASSIGNMENT_SUCCESS,  this.handleCreateAssignmentSuccess,
      constants.UPDATE_ASSIGNMENT_TITLE,    this.handleUpdateAssignmentTitle,
      constants.DESTROY_ASSIGNMENT_SUCCESS, this.handleDestroyAssignmentSuccess,

      constants.ASSIGNMENTS_SYNCHRONIZED,   this.handleAssignmentsSynchronized,
      constants.MAKE_ASSIGNMENT_VISIBLE,    this.handleMakeAssignmentVisible,
      constants.MAKE_ASSIGNMENT_HIDDEN,     this.handleMakeAssignmentHidden
    );
  },

  handleSignOut: function () {
    this.db.assignments.clear();
  },

  /**
   * Emit all assignment data
   */
  handleRequestAssignments: function () {
    // Get the assignments from the DB, fire a change, and fire a fetch assignments
    this.db.assignments.all().then(function(assignments) {
      this.emit('change', { assignments: assignments });
      this.flux.actions.fetchAssignments();
    }.bind(this));
  },

  /**
   * Emit all assignment data
   */
  handleCreateAssignmentSuccess: function () {
    this.db.assignments.all().then( function (assignments) {
      this.emit('change', { assignments: assignments });
    }.bind(this));
  },

  /**
   * Updates an assignment record with a new title
   */
  handleUpdateAssignmentTitle: function (payload) {
    logger.info('handleUpdateAssignmentTitle', { payload: payload });
    this.db.assignments.db.transaction("readwrite", ["assignments"], function(err, tx) {
      var store = tx.objectStore("assignments")
        , oncomplete = [];

      store.get(payload.localId).onsuccess = function(evt) {
        var assignment = evt.target.result;

        assignment.title = payload.title;
        store.put(assignment).onsuccess = function(evt) {
          this.emit('change', { assignment: assignment });

          oncomplete.push(function() {
            this.flux.actions.persistAssignment(assignment.localId);
          }.bind(this));
        }.bind(this);
      }.bind(this);

      tx.oncomplete = function() {
        _.each(oncomplete, function(cb) { cb(); });
      }.bind(this);
    }.bind(this));
  },

  /**
   * Emits a change with the assignment list
   */
  handleDestroyAssignmentSuccess: function (payload) {
    this.db.assignments.all().then(function(assignments) {
      this.emit('change', { assignments: assignments });
    }.bind(this));
  },

  /**
   * Emits a change event from this store with the complete list of assignments
   */
  handleAssignmentsSynchronized: function () {
    this.db.assignments.all().then(function(assignments) {
      this.emit('change', { assignments: assignments });
    }.bind(this));
  },

  handleMakeAssignmentVisible: function (payload) {
    logger.info('handleMakeAssignmentVisible');

    this.db.assignments.get(payload.localId).then(function(assignment) {
      if (assignment && assignment.id) {
        var data = {
          assignment: {
            visible: true
          }
        };

        new TrailblazerHTTPStorageAdapter().update("assignments", assignment.id, data, {})
          .then(function(response) {
            //success
            this.db.assignments.db.transaction("readwrite", ["assignments"], function(err, tx) {
              var successCallbacks = [];

              var store = tx.objectStore("assignments");

              store.get(assignment.localId).onsuccess = function(evt) {
                var assignment = evt.target.result;

                assignment.visible = response.visible;
                assignment.url = response.url;

                store.put(assignment).onsuccess = function(evt) {
                  successCallbacks.push(function() {
                    this.emit('change', { assignment: assignment });
                  }.bind(this));
                }.bind(this);

              }.bind(this);

              tx.oncomplete = function() {
                _.each(successCallbacks, function(cb) { cb(); });
              };

            }.bind(this));
          }.bind(this),
          function (response) {
            //error
          }.bind(this));
      }
    }.bind(this));
  },

  handleMakeAssignmentHidden: function (payload) {
    logger.info('handleMakeAssignmentHidden');

    this.db.assignments.get(payload.localId).then(function(assignment) {
      if (assignment && assignment.id) {
        var data = {
          assignment: {
            visible: false
          }
        };

        new TrailblazerHTTPStorageAdapter().update("assignments", assignment.id, data, {})
          .then(function(response) {
            //success
            this.db.assignments.db.transaction("readwrite", ["assignments"], function(err, tx) {
              var successCallbacks = [];

              var store = tx.objectStore("assignments");

              store.get(assignment.localId).onsuccess = function(evt) {
                var assignment = evt.target.result;

                assignment.visible = response.visible;
                assignment.url = response.url;

                store.put(assignment).onsuccess = function(evt) {
                  successCallbacks.push(function() {
                    this.emit('change', { assignment: assignment });
                  }.bind(this));
                }.bind(this);

              }.bind(this);

              tx.oncomplete = function() {
                _.each(successCallbacks, function(cb) { cb(); });
              };

            }.bind(this));
          }.bind(this),
          function (response) {
            //error
          }.bind(this));
      }
    }.bind(this));
  }

});

module.exports = AssignmentStore;
