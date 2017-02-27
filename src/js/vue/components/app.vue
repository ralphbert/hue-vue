<script>
  import {mapState} from 'vuex';
  import firebase from '../utils/firebase';
  import * as Actions from '../store/actions';
  import Register from './register.vue';
  import Login from './login.vue';

  export default {
    computed: mapState({
      user: 'user',
      errors: 'errors'
    }),
    components: { Register, Login },
    mounted: function () {
      var self = this;
      firebase.auth().onAuthStateChanged(function (user) {
        console.log('onAuthStateChanged', arguments);
        self.$store.commit(Actions.USER_CHANGED, user);
      });
    }
  };
</script>

<template lang="html">
    <div class="container">
        <h2>HUE Chat</h2>

        {{ errors }}

        <div class="error" v-if="errors">
            <div v-for="messages, key in errors">
                <div v-for="message in messages">{{ messages }}</div>
                <div><a href="#" v-on:click.prevent="$store.commit('CLEAR_ERROR', key)">Clear</a></div>
            </div>
        </div>

        {{ user }}

        <login v-if="user"></login>
        <register v-if="!user"></register>

        <router-view ></router-view>
    </div>
</template>

<style lang="sass" scoped>

</style>