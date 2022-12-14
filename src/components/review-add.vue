
<template>
  <button @click="addBoxOpen = !addBoxOpen">{{btnMsg}}</button>
  <form v-if="addBoxOpen" @submit.prevent="addReview">
    <label for="rating" >Rating: </label>
    <select v-model="reviewToAdd.rating" id="rating">
      <option disabled selected hidden value="">Rating</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select> <hr/>
    <label for="name" >Full name: </label>
    <input v-model="reviewToAdd.fullName" placeholder="Full name" id="name" /> <hr/>
      <textarea v-model="reviewToAdd.review" placeholder="Your review" /> <hr/>
    <button> Submit</button>
    {{reviewToAdd}}
  </form>
</template>

<script>
  import itemService from '../services/item-service'
  import { useItemStore } from '../store/itemStore'
  
  export default {
    setup() {
      const itemStore = useItemStore()
      return {itemStore}
    },
    data() {
      return {
        reviewToAdd: {
          fullName: null,
          review: null,
          rating: "",
        },
        addBoxOpen: false
      }
    },
    computed: {
      btnMsg() {
        if (this.addBoxOpen) return "Close"
        return "Add review"
      }
    },
    created() {
    },
    methods: {
      addReview() {
        if (this.reviewToAdd.fullName && this.reviewToAdd.review && this.reviewToAdd.rating) {
          this.$emit('submitReview', this.reviewToAdd)
        } else console.log('Please fill out all the fields')
      }
    },
    watch: { 
    },
    emits: [ 'submitReview' ]
  }
</script>

<style>
  .reviewBox {
    background-color: darkcyan
  }

  img {
  object-fit: contain;
}

.det-box {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.det {
  background-color: #181818;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 80%; /* Could be more or less, depending on screen size */
}
</style>