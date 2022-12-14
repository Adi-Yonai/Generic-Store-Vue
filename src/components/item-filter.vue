
<template>
    <main class="filter-box">
        <form @submit.prevent="$emit('filtered', filterToSend)">
            <label>
                Search:
                <input v-model="filterBy.byName"
                placeholder="Search..." />
            </label>
            <section>
                Price:
                <label>
                    From: $
                    <input v-model.number="filterBy.minPrice"
                    placeholder="Minimum Price" />
                </label>
                <label>
                    To: $
                    <input v-model.number="filterBy.maxPrice"
                    placeholder="Maximum Price" />
                </label>
            </section>
            <button>Filter</button>
        </form>
    </main>
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
                filterBy: {
                    byName: '',
                    minPrice: this.$route.query.min || null,
                    maxPrice: this.$route.query.max || null,
                }
            }
        },
        computed: {
            filterToSend() {
                return { ...this.filterBy }
            },
        },
        created() {
        this.itemStore.fill()
        },
        methods: {
            onFiltered() {
                this.$emit('filtered', this.filterBy)
            }
        },
        watch: { 
        },
        components: {
        }
    }
  </script>
  
  <style>
    .filter-box {
        background-color: #444;
        padding: 5px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        top: 24px;
        left: 0;
        right: 0;
    }
  
    img {
    object-fit: contain;
  }
  </style>