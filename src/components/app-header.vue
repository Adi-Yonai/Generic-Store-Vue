
<template>
    <header>
        <div class="title">{{pageTitle}}</div>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </header>
</template>
    
  <script>
    import itemPreview from './item-preview.vue'
    
    export default {
      setup() {
      },
      data() {
        return {
        }
      },
      props: {
    },
    computed: {
        pageTitle() {
            return 'CURRENT PAGE'
        }
    },
    created() {
    },
    methods: {
    },
    watch: {
        },
    components: {
    }
  }
  </script>
  
  <style>
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: 50px;
      background-color: purple;
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      left: 0;
      top: 0;
      right: 0;
    }
  
  </style>