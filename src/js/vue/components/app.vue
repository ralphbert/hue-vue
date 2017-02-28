<script>
  import {mapState} from 'vuex';
  import firebase from '../utils/firebase';
  import * as Actions from '../store/actions';
  import Register from './register.vue';
  import Login from './login.vue';

  export default {
    computed: mapState({
      user: 'user',
      errors: 'errors',
      messages: 'messages',
    }),
    methods: {
      logout: function() {
        this.$store.dispatch(Actions.LOGOUT);
      }
    },
    components: { Register, Login },
    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        this.$store.commit(Actions.USER_CHANGED, user);
      });

      firebase.database().ref('messages').limitToLast(100).on('value', (messages) => {
        console.log(messages.val());
        var result = [];
        messages.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          result.push({
            id: childKey,
            data: childData
          });
        });
        this.$store.commit(Actions.SET_CHAT_MESSAGES, result);
      });
    }
  };
</script>

<template lang="html">
    <div class="container">
        <h2>HUE Chat</h2>

        <div class="error" v-if="errors">
            <div v-for="messages, key in errors">
                <div v-for="message in messages">{{ messages }}</div>
                <div v-if="messages.length"><a href="#" v-on:click.prevent="$store.commit('CLEAR_ERROR', key)">Clear</a></div>
            </div>
        </div>

        <nav v-if="user">
            <ul>
                <li><router-link to="/chat">Chat</router-link></li>
                <li><router-link to="/profile">Profile</router-link></li>
                <li><a href="#" v-on:click.prevent="logout">Logout {{ user.email }}</a></li>
            </ul>
        </nav>


        <login v-if="!user"></login>
        <register v-if="!user"></register>

        <router-view ></router-view>
    </div>
</template>

<style lang="sass" scoped>

</style>