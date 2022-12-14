<template>
  <div>{{review.rating}}★</div>
  <div>{{review.fullName}}</div>
  <div>{{review.review}}</div>
  <div>{{postDate}}</div>
  <button @click="$emit('deleteReview', review.postDate)">X</button> <hr />
</template>

<script>
export default {
  props: {
    review: {
            type: Object,
            required: true
        }
  },
  computed: {
    postDate() {
      const date = new Date(this.review.postDate)
      return date.getDate() + '.' + (parseInt(date.getMonth())+1).toString()
      + '.' + date.getFullYear()
    }
  },
  methods: {
  },
  created() {
  },
  emits: [ 'deleteReview' ]
}
</script>

<style>
.item {
  background-color: #555;
  padding: 5px;
  border-radius: 10px;
}

.item:hover {
  background-color: #444;
}

.cheap {
  color: green;
}

.expensive {
  color: red;
}

.sale-msg {
  color: palevioletred;
  display: inline;
  left: 5px ;
}


</style>