export default {
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'Eat', done: true },
      { id: 2, text: 'Do sports', done: true }
    ]
  },
  mutations: {
    add: (state, text) => {
      state.todos.push({
        id: state.todos.length,
        text: text,
        done: false
      })
    },
    // store
    increment (state, payload) {
      state.count += payload.amount
    }
  },
  getters: {
    doneTodos: (state, getters) => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: function(state, getters) {
      return function(id) {
        return getters.todos.find(todo => todo.id === id)
      }
    }
  },
  // store
  actions: {
    increment: function(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload);
      }, Math.random() * 2000);
    }
  },
};