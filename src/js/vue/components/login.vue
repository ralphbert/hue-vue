<script>
  import Spin from 'spin.js';
  import * as Actions from '../store/actions';

  export default {
    data: function () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      register: function () {
        this.$store.dispatch(Actions.LOGIN, { username: this.username, password: this.password });
      }
    },
  };
</script>

<template>
    <div>
        <h3>Login</h3>

        <form v-on:submit.prevent="register">
            <div>
                <label>Username</label>
                <input v-model="username" title="Username" placeholder="Username">
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="password" title="Password" placeholder="Password">
            </div>

            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<style lang="sass">

</style>