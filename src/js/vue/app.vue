<script>
    export default {
      methods: {
        increment: function() {
          this.$store.commit('increment');
        },
        decrement: function() {
          this.$store.commit('decrement');
        }
      },
      computed: {
        count: function() {
          return this.$store.state.count;
        }
      }
    };
</script>

<template lang="html">
    <div class="container">
        <button v-on:click="increment">Add</button>
        <button v-on:click="decrement">Sub</button>
        {{ count }}
    </div>
</template>

<style lang="sass" scoped>

</style>