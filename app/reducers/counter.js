import * as types from '../actions/actionTypes';

import ActionCable from 'action-cable-node'

const App = {}

App.cable = ActionCable.createConsumer("ws://localhost:4000/cable")


App.room = App.cable.subscriptions.create("RoomChannel",{
  connected: function() {
    console.log("connected: action cable")
  },
  disconnected: function() {
    console.log("disconnected: action cable")
  },
  received: function(data) {
    console.log("data:" + data)
  },
  speak: function(message) {
  }
});

const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCREMENT:
    console.log("inc")
      return {
        ...state,
        count: state.count + 1
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
