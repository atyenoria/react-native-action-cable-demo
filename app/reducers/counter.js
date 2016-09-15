import * as types from '../actions/actionTypes';

import ActionCable from 'action-cable-react-native'

const App = {}

App.cable = ActionCable.createConsumer("ws://localhost:4000/cable")


App.room_chat = App.cable.subscriptions.create("RoomChannel",{
  connected: function() {
    console.log("connected: action cable")
  },
  disconnected: function() {
    console.log("disconnected: action cable")
  },
  received: function(data) {
    console.log("data:" + data)
  },
  chat_test: function(message) {
    return this.perform('chat_test', { message: message, app: "chat"});
  }
});


const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCREMENT:
    console.log("inc")
    App.room_chat.chat_test("event.target.value");
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
