<script>
  export default {
    props: {
    },
    data: function () {
      return {
        title: ''
      }
    },
    methods: {
      submit: function() {
        this.$emit('submit', { title: this.title });
        this.title = '';
      }
    }
  }
</script>

<template>
    <form class="todo-form" v-on:submit.prevent="submit">
        <input v-model="title"> <button type="submit">Add</button>
    </form>
</template>

<style lang="sass" scoped>
    input, button {
        font-size: 17px;
    }
</style>