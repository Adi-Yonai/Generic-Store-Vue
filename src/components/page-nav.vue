
<template>
    <nav>
        <button v-if="page > 1" @click="pickPage" id="1">1</button>
        <button v-if="page > 3" @click="pickPage" :id="page-2">{{page-2}}</button>
        <button v-if="page > 2" @click="pickPage" :id="page-1">{{page-1}}</button>
        <button>{{page}}</button>
        <button v-if="page < pages-1" @click="pickPage" :id="page+1">{{page+1}}</button>
        <button v-if="page < pages-2" @click="pickPage" :id="page+2">{{page+2}}</button>
        <button v-if="page < pages" @click="pickPage" :id="pages">{{pages}}</button>
    </nav>
    
  </template>
  
  <script>
    import itemService from '../services/item-service'
    import { useItemStore } from '../store/itemStore'
    import itemList from './item-list.vue'
    
    export default {
        setup() {
            const itemStore = useItemStore()
            return {itemStore}
        },
        data() {
            return {
            }
        },
        props: {
            pages: {
            type: Number,
            required: true
            },
            page: {
            type: Number,
            required: true
            }
        },
        computed: {
            itemsForDisplay() {
                return this.itemStore.products.slice(this.pageSize*(this.page-1), this.pageSize*this.page)
            },
        },
        created() {
        this.itemStore.fill()
        },
        methods: {
            select(id) {
                this.selectedItem = id
            },
            pickPage(ev) {
                this.$emit('newPage', +ev.target.id)
            }
        },
        watch: {
        },
        components: {
        }
    }
  </script>
  
  <style>
  
  nav {
    display: flex;
    justify-content: center;
  }

    img {
    object-fit: contain;
  }
  </style>