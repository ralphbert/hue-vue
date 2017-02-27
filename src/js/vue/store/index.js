import Vue from '../../../../node_modules/vue/dist/vue.common';
import Vuex from 'vuex';
import firebase from '../utils/firebase';
import * as Actions from './actions';
import DebugPlugin from '../plugins/debug';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    errors: {}
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
        alert(0);
      }, function(e) {
        console.error(e);
      });
    },
    [Actions.LOGOUT]: function(context) {
      console.log(Actions.LOGOUT);
      firebase.auth().signOut().then(function() {}, function(e) {
        context.commit(Actions.ADD_ERROR, { type: 'auth', message: e.message });
      });
    }
  },

  plugins: [ DebugPlugin ]
});