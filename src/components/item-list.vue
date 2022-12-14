
<template>
  <div class="list-container">
    <itemPreview v-for="item in items" :item="item" :key="item._id"
    @click="$emit('itemSelected',item)" class="item-preview">
    </itemPreview>    
  </div>
</template>

<script>
  import itemPreview from './item-preview.vue'
  
  export default {
    setup() {
    },
    data() {
      return {
        selectedItem: null,
        page: 1,
        pageSize: 12
      }
    },
    props: {
    items: {
            type: Array,
            required: true
        }
  },
  computed: {
  },
  created() {
  },
  methods: {
  },
  watch: {
      },
  components: {
    itemPreview
  }
}
</script>

<style>
  .list-container {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 50px;
  }

  img {
  max-height: 200px;
}
.item-preview {
    max-width: 200px;
  }
</style>