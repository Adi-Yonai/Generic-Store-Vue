
<template>
  <div class="review-list-container">
      <reviewPreview v-for="review in reviews" :review="review" :key="review.postDate"
      @deleteReview="$emit('deleteReview', review.postDate)" class="review-preview" />
  </div>
</template>

<script>
  import reviewPreview from './review-preview.vue'
  
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
    reviews: {
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
    reviewPreview
  }
}
</script>

<style>
</style>