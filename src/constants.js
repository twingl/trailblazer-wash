export default {
  __change__:                       'change', // NOTE: reserved for emit('change')

  COMPLETED_ONBOARDING_STEP: "COMPLETED_ONBOARDING_STEP",

  onboarding: {
    STEP_1: "STEP_1",
    STEP_2: "STEP_2",
    STEP_3: "STEP_3",
    STEP_4: "STEP_4",
    STEP_5: "STEP_5",
    STEP_6: "STEP_6",
    STEP_7: "STEP_7",
    STEP_7_TWEET: "STEP_7_TWEET"
  },

  /**
   * Actions to request 'change' be emitted with current data
   */
  REQUEST_ASSIGNMENTS:              'REQUEST_ASSIGNMENTS',
  REQUEST_NODES:                    'REQUEST_NODES',

  /**
   * Synchronisation actions
   */
  FETCH_ASSIGNMENTS:                'FETCH_ASSIGNMENTS',
  FETCH_ASSIGNMENTS_SUCCESS:        'FETCH_ASSIGNMENTS_SUCCESS',
  FETCH_ASSIGNMENTS_FAIL:           'FETCH_ASSIGNMENTS_FAIL',
  UPDATE_ASSIGNMENT_CACHE:          'UPDATE_ASSIGNMENT_CACHE',
  UPDATE_ASSIGNMENT_CACHE_SUCCESS:  'UPDATE_ASSIGNMENT_CACHE_SUCCESS',
  UPDATE_ASSIGNMENT_CACHE_FAIL:     'UPDATE_ASSIGNMENT_CACHE_FAIL',
  ASSIGNMENTS_SYNCHRONIZED:         'ASSIGNMENTS_SYNCHRONIZED',

  FETCH_NODES:                      'FETCH_NODES',
  FETCH_NODES_SUCCESS:              'FETCH_NODES_SUCCESS',
  FETCH_NODES_FAIL:                 'FETCH_NODES_FAIL',
  UPDATE_NODE_PARENT_ID:            'UPDATE_NODE_PARENT_ID',
  UPDATE_NODE_CACHE:                'UPDATE_NODE_CACHE',
  UPDATE_NODE_CACHE_SUCCESS:        'UPDATE_NODE_CACHE_SUCCESS',
  UPDATE_NODE_CACHE_FAIL:           'UPDATE_NODE_CACHE_FAIL',
  NODES_SYNCHRONIZED:               'NODES_SYNCHRONIZED',

  PERSIST_ASSIGNMENT:               'PERSIST_ASSIGNMENT',
  PERSIST_ASSIGNMENT_SUCCESS:       'PERSIST_ASSIGNMENT_SUCCESS',
  PERSIST_ASSIGNMENT_FAIL:          'PERSIST_ASSIGNMENT_FAIL',
  PERSIST_NODE:                     'PERSIST_NODE',
  PERSIST_NODE_SUCCESS:             'PERSIST_NODE_SUCCESS',

  SAVE_MAP_LAYOUT:                  'SAVE_MAP_LAYOUT',
  PERSIST_MAP_LAYOUT:               'PERSIST_MAP_LAYOUT',
  PERSIST_MAP_LAYOUT_FAIL:          'PERSIST_MAP_LAYOUT_FAIL',

  /**
   * Actions invoked by Chrome
   */
  SET_NODE_TITLE:                   'SET_NODE_TITLE',
  TAB_TITLE_UPDATED:                'TAB_TITLE_UPDATED',
  TAB_CREATED:                      'TAB_CREATED',
  TAB_FOCUSED:                      'TAB_FOCUSED',
  CREATED_NAVIGATION_TARGET:        'CREATED_NAVIGATION_TARGET',
  TAB_UPDATED:                      'TAB_UPDATED',
  HISTORY_STATE_UPDATED:            'HISTORY_STATE_UPDATED',
  WEB_NAV_COMMITTED:                'WEB_NAV_COMMITTED',
  TAB_CLOSED:                       'TAB_CLOSED',
  TAB_REPLACED:                     'TAB_REPLACED',
  EXTENSION_INSTALLED:              'EXTENSION_INSTALLED',
  EXTENSION_UPDATED:                'EXTENSION_UPDATED',
  CHROME_UPDATED:                   'CHROME_UPDATED',

  /**
   * User actions
   */
  CREATE_NODE_SUCCESS:              'CREATE_NODE_SUCCESS',
  UPDATE_NODE_SUCCESS:              'UPDATE_NODE_SUCCESS',
  DESTROY_NODE:                     'DESTROY_NODE',
  BULK_DESTROY_NODES:               'BULK_DESTROY_NODES',
  CREATE_ASSIGNMENT_SUCCESS:        'CREATE_ASSIGNMENT_SUCCESS',
  DESTROY_ASSIGNMENT:               'DESTROY_ASSIGNMENT',
  DESTROY_ASSIGNMENT_SUCCESS:       'DESTROY_ASSIGNMENT_SUCCESS',
  UPDATE_ASSIGNMENT_TITLE:          'UPDATE_ASSIGNMENT_TITLE',
  UPDATE_NODE_TITLE:                'UPDATE_NODE_TITLE',

  START_RECORDING:                  'START_RECORDING',
  START_RECORDING_SUCCESS:          'START_RECORDING_SUCCESS',
  START_RECORDING_FAIL:             'START_RECORDING_FAIL',
  RESUME_RECORDING:                 'RESUME_RECORDING',
  RESUME_RECORDING_FAIL:            'RESUME_RECORDING_FAIL',
  STOP_RECORDING:                   'STOP_RECORDING',
  STOP_RECORDING_SUCCESS:           'STOP_RECORDING_SUCCESS',

  VIEWED_ASSIGNMENT_LIST:           'VIEWED_ASSIGNMENT_LIST',
  VIEWED_MAP:                       'VIEWED_MAP',

  RANK_NODE_WAYPOINT:               'RANK_NODE_WAYPOINT',
  RANK_NODE_NEUTRAL:                'RANK_NODE_NEUTRAL',
  RANK_NODE_DOWN:                   'RANK_NODE_DOWN',
  RANK_NODE_DOWN_POPUP:             'RANK_NODE_DOWN_POPUP',

  MAKE_ASSIGNMENT_VISIBLE:          'MAKE_ASSIGNMENT_VISIBLE',
  MAKE_ASSIGNMENT_HIDDEN:           'MAKE_ASSIGNMENT_HIDDEN',

  SIGN_IN:                          'SIGN_IN',
  SIGN_IN_SUCCESS:                  'SIGN_IN_SUCCESS',
  SIGN_OUT:                         'SIGN_OUT'
}
