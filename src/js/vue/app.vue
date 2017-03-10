<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    methods: {
      add: function (e) {
        this.$store.commit('add', e.target.value);
        e.target.value = '';
      },
      ...mapMutations({
        increment: 'increment'
      }),
      ...mapActions({
        incrementAsync: 'increment'
      }),
    },
    computed: {
      ...mapState({
        todos: 'todos',
        count: 'count'
      }),
      ...mapGetters({
        doneTodos: 'doneTodos',
        doneTodosCount: 'doneTodosCount',
        getTodoById: 'getTodoById'
      })
    }
  }
</script>

<template lang="html">
    <div class="container">
        <h2>Counter</h2>
        <div>
            <button v-on:click="increment({ amount: 1 })">+ sync</button>
            <p>{{ count }}</p>
        </div>
        <div>
            <button v-on:click="incrementAsync({ amount: 1 })">+ async</button>
            <p>{{ count }}</p>
        </div>

        <h2>Todos</h2>
        <h3>All:</h3>
        <ul>
            <li v-for="todo in todos">{{ todo.text }}</li>
        </ul>
        <h3>Done:</h3>
        <ul>
            <li v-for="todo in doneTodos">{{ todo.text }}</li>
        </ul>

        <input v-on:keypress.enter="add">
    </div>
</template>

<style lang="sass" scoped>

</style>