<script>
  import Spin from 'spin.js';

  export default {
    props: {
      show: {
        default: true
      }
    },
    mounted: function() {
      new Spin({color:'#000', lines: 12}).spin(this.$el);
    }
  };
</script>

<template>
    <div class="spinner" v-show="show"></div>
</template>

<style lang="sass">
    .spinner {
        z-index: 100;
        display: block;
        position: absolute;
        min-height: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.7);
    }
</style>