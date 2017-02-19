<script>
  export default {
    props: {
      todos: {
        type: Array,
        default: []
      }
    },
    data: function () {
      return {
        sort: 'createdAt'
      }
    },
    computed: {
      list: function() {
        return this.todos.sort((todoA, todoB) => {
          if (this.sort == 'done') {
            if (todoA.done) {
              return 1;
            } else {
              return -1;
            }
          } else if (this.sort == 'title') {
            if (todoA.title.toLowerCase() < todoB.title.toLowerCase()) {
              return -1;
            } else if (todoA.title.toLowerCase() > todoB.title.toLowerCase()) {
              return 1;
            }
          } else if (this.sort == 'createdAt' || this.sort == 'updatedAt') {
            var dateA = new Date(todoA[this.sort]);
            var dateB = new Date(todoB[this.sort]);
            console.log(dateA);
            return dateB - dateA;
          }

          return 0;
        });

      }
    },
    methods: {
      todoClicked: function(todo) {
        this.$emit('toggle', todo);
      },
      deleteClicked: function(todo) {
        this.$emit('delete', todo);
      }
    }
  }
</script>

<template>
    <div>
        <div class="sort">
            <span v-bind:class="{ active: sort == 'createdAt' }" v-on:click="sort='createdAt'">created</span>
            <span v-bind:class="{ active: sort == 'updatedAt' }" v-on:click="sort='updatedAt'">updated</span>
            <span v-bind:class="{ active: sort == 'title' }" v-on:click="sort='title'">title</span>
            <span v-bind:class="{ active: sort == 'done' }" v-on:click="sort='done'">done</span>
        </div>
        <transition-group name="todo-list" tag="ul">
            <li class="todo-item" v-bind:class="{ 'todo-done': todo.done }" v-for="todo in list" v-bind:key="todo.id">
                <label v-bind:for="'todo-' + todo.id" v-on:click="todoClicked(todo)">
                    <span></span>
                    {{ todo.title }}
                </label>
                <a v-if="todo.done" href="#" v-on:click.prevent="deleteClicked(todo)">delete</a>
                <div class="date">{{ todo.updatedAt | date }}</div>
            </li>
        </transition-group>
    </div>
</template>

<style lang="sass" scoped>
    $time: 0.3s;

    ul {
        list-style: none;
        margin: 0 0 15px;
        padding: 0;
    }

    .date {
        color: #aaa;
        font-size: 0.8em;
    }

    li {
        position: relative;
        padding: 5px 0 5px 32px;

        label {
            cursor: pointer;
            &:hover {
                 background-color: #fff;
            }
            span {
                position: absolute;
                display: block;
                top: 2px;
                margin-left: -32px;
                width: 20px;
                height: 20px;
                border-radius: 10px;
                border: 1px solid #808080;
            }
        }

        &.todo-done {
            span {
                background-color: #d3ffcd;

                &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 14px;
                    height: 14px;
                    border-radius: 7px;
                    background-color: rgb(86, 181, 106);
                    border-color: rgb(86, 181, 106);
                 }
            }
        }
    }

    .sort {
        margin-bottom: 15px;
        span {
            padding: 3px 5px;
            border: 1px solid transparent;
            cursor: pointer;

            &:hover {
                 border-color: #ccc;
            }
            &.active {
                 border-color: black;
            }
        }
    }

    .todo-item {
        display: block;
        margin-right: 10px;
    }
    .todo-list-enter-active, .todo-list-leave-active {
        transition: all $time;
    }
    .todo-list-enter, .todo-list-leave-to /* .list-leave-active for <2.1.8 */ {
        opacity: 0;
        transform: translateX(-30px);
    }
    .todo-list-move {
        transition: transform $time;
    }
    .todo-list-leave-active {
        position: absolute;
    }
</style>