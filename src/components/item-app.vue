
<template>
  <main>
    <itemFilter @filtered="filter" />
    <itemList v-if="itemsForDisplay" :items="itemsForPage" @itemSelected="selectItem" />
    <pageNav v-if="pages" :pages="pages" :page="page" @newPage="changePage"/>
    <div v-if="selectedItem" class="det-box" @click="unselectItem">
      <itemDetails :item= "selectedItem" class="det" @click.stop=""/>
    </div>
  </main>
  
</template>

<script>
  import itemService from '../services/item-service'
  import { useItemStore } from '../store/itemStore'
  import itemList from './item-list.vue'
  import pageNav from './page-nav.vue'
  import itemFilter from './item-filter.vue'
  import itemDetails from './item-details.vue'
  
  export default {
    setup() {
      const itemStore = useItemStore()
      return {itemStore}
    },
    data() {
      return {
        selectedItem: null,
        pageSize: 12,
        page: +this.$route.query.page || 1,
        filterBy: {
                    byName: this.$route.query.name || '',
                    minPrice: this.$route.query.min || null,
                    maxPrice: this.$route.query.max || null
        },
        isShown: false      
      }
    },
  computed: {
    itemsForDisplay() {
      if (!this.itemStore.products) return
      if (!this.filterBy) return this.itemStore.products
      const min = this.filterBy.minPrice || 0
      const max = this.filterBy.maxPrice || Infinity
      const regex = new RegExp(this.filterBy.byName, 'i')
      const itemsForDisplay = this.itemStore.products.filter(item => 
      (regex.test(item.title)) && (item.listPrice.amount > min) && (item.listPrice.amount < max))
      return itemsForDisplay
    },
    itemsForPage(){
      if (this.itemsForDisplay) return this.itemsForDisplay.slice(this.pageSize*(this.page-1), this.pageSize*this.page)

    },
    pages() {
      if (this.itemsForDisplay) return parseInt(this.itemsForDisplay.length / this.pageSize) +1
    },
  },
  created() {
    this.itemStore.fill()
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
      const id = item.id
      this.$router.push({ name: 'itemDet', params: {id} }) 
    },
    changePage(newPage) {
      this.page = newPage
      this.setQuery()
    },
    setQuery() {
      const pathString = {path: '/items', query: { page: this.page }}
      if (this.filterBy.byName) pathString.query.name = this.filterBy.byName
      if (this.filterBy.minPrice) pathString.query.min = this.filterBy.minPrice
      if (this.filterBy.maxPrice) pathString.query.max = this.filterBy.maxPrice
      this.$router.push(pathString) 
    },
    filter(filterBy) {
      this.filterBy = filterBy
      this.setQuery()
    },
    unselectItem() {
      this.selectedItem = null
      this.$router.back() 
    }
  },
  watch: { 
  },
  components: {
    itemList,
    pageNav,
    itemFilter,
    itemDetails
}
}
</script>

<style>
  .list-container {
    margin-top: 82px;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 50px;
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