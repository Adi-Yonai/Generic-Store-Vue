
<template>
  <main v-if="currItem">
    <img :src="currItem.thumbnail"/>
    <h2>{{currItem.title}}</h2>
    by
    {{currItem.authors}}
    (Author)<br/>
    <p>{{shortDesc}}</p>
    <button v-if="isLong" @click="isReadMore = !isReadMore">{{readMoreTxt}}</button>
    <hr/>
    <div v-if="currItem" class="cart-add-container">
      <h2>{{price}}{{currencySymbol}}</h2><hr/>
      <button>Add to cart</button>
      <button>Add to wishlist</button>
    </div>
    <div class="product-details">
      <p>Pages: {{currItem.pageCount}}</p>
      <p>Publication date: {{currItem.publishedDate}}</p>
    </div>
    <div class="reviewBox">
      <reviewAdd @submitReview="addReview" /> <hr/>
      <div v-if="currItem" class="review-list-container">
      <reviewPreview v-for="review in currItem.reviews" :review="review" :key="review.postDate"
      @deleteReview="deleteReview" />
      </div>
    </div>
  </main>
</template>


  <script>
  import reviewPreview from './review-preview.vue'
  import reviewAdd from './review-add.vue'
  import itemService from '../services/item-service'
  import { useItemStore } from '../store/itemStore'


  export default {
    setup() {
      const itemStore = useItemStore()
      return {itemStore}
    },
    props: ['item'],
    created() {
     },
    data() {
        return {
            currItem: null,
            isReadMore: false
        }
    },
    watch: {
        'this.$route.params.itemId': {
            async handler() {
              if (this.item) {
                this.currItem = this.item
              } else {
                await this.itemStore.fill()
                  const id = this.$route.params.itemId
                  this.currItem = await this.itemStore.getById(id)
                  if (!this.currItem.description) this.currItem.description = 'Description unavailable'
              }
            },
            immediate: true
        }
    },
    methods: {
      addReview(reviewToAdd) {
        this.itemStore.addReview(this.currItem.id, reviewToAdd)
      },
      deleteReview(postDate) {
        this.itemStore.deleteReview(this.currItem.id, postDate)        
      }
    },
    computed: {
      authorUrl() {
        return "/authors/" + this.currItem.authors
      },
      currencySymbol() {
        if (this.currItem.listPrice) {
          switch (this.currItem.listPrice.currencyCode) {
            case 'ILS':
              return '₪'
            case 'USD':
              return '$'
            case 'EUR':
              return '€'
            default:
              return ''
                  }
                  }
      },
      price() {
        if (this.currItem.listPrice) return this.currItem.listPrice.amount
      },
      isLong() {
        if (this.currItem.description) return this.currItem.description.length > 100
        else return null
      },
      shortDesc() {
        if (this.isLong && !this.isReadMore) return this.currItem.description.slice(0,100) + '...'
        else return this.currItem.description
      },
      readMoreTxt() {
        if (this.isReadMore) return 'Read Less'
        else return 'Read More'
      }
    },
    unmounted() { },
    components: {
      reviewPreview,
      reviewAdd
    }
  }
  </script>

<style>

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