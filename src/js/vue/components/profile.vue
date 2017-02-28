<script>
  import Spin from 'spin.js';
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      user: 'user'
    })
  };
</script>

<template>
    <div v-if="user">
        <h2>Profile</h2>

        <div>UID: {{ user.uid }}</div>
        <div>email: {{ user.email }}</div>

        <pre>{{ user }}</pre>
    </div>
</template>

<style lang="sass">

</style>