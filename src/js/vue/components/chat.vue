<script>
  import Spin from 'spin.js';
  import {mapState} from 'vuex';
  import * as Actions from '../store/actions';

  export default {
    data: function() {
      return {
        message: ''
      }
    },
    computed: mapState({
      messages: 'messages',
      user: 'user'
    }),
    methods: {
      send: function(e) {
        this.message = '';
        this.$store.dispatch(Actions.ADD_CHAT_MESSAGE, e.target.value);
      },
      deleteMessage: function(id) {
        console.log('delete', id);
        this.$store.dispatch(Actions.DELETE_CHAT_MESSAGE, id);
      }
    }
  };
</script>

<template>
    <div>
        <h2>Chat</h2>

        <ul class="collection">
            <li class="collection-item avatar" v-for="message in messages">
                <img src="images/yuna.jpg" alt="" class="circle">
                <span class="title">{{ message.data.text }}</span>
                <div>{{ message.data.createdAt }}</div>
                <a href="#" class="secondary-content" v-on:click.prevent="deleteMessage(message.id)"><i class="material-delete">Delete</i></a>

            </li>
        </ul>

        <div class="input-field">
            <input id="message" placeholder="message" v-on:keyup.enter="send" v-model="message">
            <label for="message"Message</label>
        </div>
    </div>
</template>

<style lang="sass">

</style>