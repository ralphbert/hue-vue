import Vue from '../../../../node_modules/vue/dist/vue.common';
import Vuex from 'vuex';
import firebase from '../utils/firebase';
import * as Actions from './actions';
import DebugPlugin from '../plugins/debug';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    errors: {},
    messages: []
  },
  mutations: {
    [Actions.USER_CHANGED]: function (store, user) {
      store.user = user;
    },
    [Actions.ADD_ERROR]: function (store, error) {
      var key = 'global';

      if (typeof error != 'string') {
        key = error.type;
      }

      var errors = store.errors[key];

      if (!errors) {
        errors = [];
      }

      errors.push(error.message);
      store.errors = { ...store.errors, [key]: errors }
    },
    [Actions.CLEAR_ERROR]: function (store, type) {
      store.errors = { ...store.errors, [type]: [] }
    },
    [Actions.SET_CHAT_MESSAGES]: function (store, messages) {
      store.messages = messages;
    }
  },

  actions: {
    [Actions.REGISTER]: function (context, data) {
      console.log(Actions.REGISTER, data);
      context.commit(Actions.CLEAR_ERROR, 'auth');
      firebase.auth().createUserWithEmailAndPassword(data.username, data.password).catch(function (e) {
        console.error(e);
        context.commit(Actions.ADD_ERROR, { type: 'auth', message: e.message });
      });
    },
    [Actions.LOGIN]: function (context, data) {
      console.log(Actions.LOGIN, data);
      context.commit(Actions.CLEAR_ERROR, 'auth');
      firebase.auth().signInWithEmailAndPassword(data.username, data.password).catch(function (e) {
        console.error(e);
        context.commit(Actions.ADD_ERROR, { type: 'auth', message: e.message });
      }).then(function() {
        console.log('signInWithEmailAndPassword', arguments);
      }, function(e) {
        console.log('ERROR', arguments);
        console.error(e);
      });
    },
    [Actions.LOGOUT]: function(context) {
      console.log(Actions.LOGOUT);
      firebase.auth().signOut().then(function() {}, function(e) {
        context.commit(Actions.ADD_ERROR, { type: 'auth', message: e.message });
      });
    },
    [Actions.ADD_CHAT_MESSAGE]: function (context, message) {
      var messagesRef = firebase.database().ref('messages');
      var messageRef = messagesRef.push();
      messageRef.set({
        text: message,
        user: context.state.user.email,
        createdAt: new Date()
      });
    },
    [Actions.DELETE_CHAT_MESSAGE]: function (context, id) {
      console.log(Actions.DELETE_CHAT_MESSAGE, id);
      var messagesRef = firebase.database().ref('messages/' + id);
      messagesRef.remove();
    }
  },

  plugins: [ DebugPlugin ]
});