<template>
  <main>
      <div class="item">
        <img :src= "item.thumbnail" />
        <div class="details">
          <h3>
            <div name="title">{{item.title}}</div>
          </h3>
          <div name="price" :class="priceClass">
            {{item.listPrice.amount}}{{currencySymbol}}
            <p v-if="item.listPrice.isOnSale" name="sale" class="sale-msg">ON SALE!</p>
          </div>
          <div name="length-text">{{lengthText}}</div>
          <div name="age-text">{{ageText}}</div>
        </div>
      </div>
  </main>
</template>

<script>
export default {
  props: {
    item: {
            type: Object,
            required: true
        }
  },
  computed: {
    linkUrl() {
      return "/items/" + this.item._id
    },
    currencySymbol() {
        switch (this.item.listPrice.currencyCode) {
          case 'ILS':
            return '₪'
          case 'USD':
            return '$'
          case 'EUR':
            return '€'
          default:
            return ''
          }
        },
        lengthText() {

          if (this.item.pageCount < 100) return 'Light Reading'
          if (this.item.pageCount > 500) return 'Long Reading'
          if (this.item.pageCount > 200) return 'Decent Reading'
          return null
        },
        ageText() {
          if (new Date().getFullYear() - this.item.publishedDate < 1) return 'New!'
          if (new Date().getFullYear() - this.item.publishedDate > 10) return 'Veteran Book'
          return null  
        },
        priceClass() {
          return {
            cheap: this.item.listPrice.amount < 20,
            expensive: this.item.listPrice.amount > 150
          }
        }
      },
      methods: {
      },
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