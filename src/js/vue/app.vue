<script>
    import TodoList from './todo-list.vue';
    import TodoListForm from './todo-list-form.vue';
    import Spinner from './spinner.vue';
    import axios from 'axios';

    export default {
      components: { TodoList, Spinner, TodoListForm },
      data: function() {
        return {
          loading: false,
          todos: [],
          error: ''
        };
      },
      methods: {
        handleResult: function(result) {
          this.loading = false;
          this.todos = result.data.data;
        },
        handleError: function(error) {
          this.loading = false;
          this.error = error.message;
        },
        reload: function() {
            this.loading = true;
            axios.get('http://localhost:8080/todos').then(this.handleResult).catch(this.handleError);
        },
        toggleTodo: function(todo) {
          this.loading = true;
          todo.done = !todo.done;
          axios.put(`http://localhost:8080/todos/${todo.id}/${todo.done}`).then(this.handleResult).catch(this.handleError);
        },
        addTodo: function(todo) {
          this.loading = true;
          axios.post('http://localhost:8080/todos', todo).then(this.handleResult).catch(this.handleError);
        },
        deleteTodo: function(todo) {
          this.loading = true;
          axios.delete(`http://localhost:8080/todos/${todo.id}`).then(this.handleResult).catch(this.handleError);
        }
      },
      mounted: function() {
        this.reload();
      }
    };
</script>

<template lang="html">
    <div class="container">
        <h2>TODO App</h2>
        <div><button v-on:click="reload" v-bind:disabled="loading">Reload</button></div>

        <div class="error" v-if="error">
            <div>{{ this.error }}</div>
            <div><a href="#" v-on:click.prevent="error = ''">Close</a></div>
        </div>

        <div class="list">
            <spinner v-bind:show="loading"></spinner>
            <todo-list v-bind:todos="todos" v-on:toggle="toggleTodo" v-on:delete="deleteTodo"></todo-list>
            <todo-list-form v-on:submit="addTodo"></todo-list-form>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    h2, button {
        margin-bottom: 15px;
    }

    .container {
        padding: 10px;
    }
    .list {
        position: relative;
    }

    .error {
        border: 3px solid red;
        background-color: #ffc3c8;
        padding: 10px;
        margin: 15px 0;
    }
</style>