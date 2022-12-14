import { defineStore } from 'pinia'

import itemService from '../services/item-service'
//import { reviewStore } from './review.store.js'

export const useItemStore = new defineStore('itemStore',{
  state:() => {
    return {
      products: null,
    }
  },
  modules: {
  },
  mutations: {
  },
  actions: {
    async fill() {
      if (!this.products) { try {
        this.products = await itemService.getItems()
      } catch (error) {
        console.log('Could not load products. Error:' + error)
      }
      }
    },
    async getById(itemId) {
      if (this.products) { try {
        const itemToGet = await this.products.find(item => item.id === itemId)
        if (!itemToGet) throw new Error('Could not find requested item')
        return { ...itemToGet }
      } catch (error) {
        return error
      }
      }
    },
    async addReview(itemId, review) {
      const updatedReview = await itemService.addReview(itemId, review)
      const idx = this.products.findIndex(item => {return item.id === itemId})
      this.products[idx].reviews.push(updatedReview)
    },
    async deleteReview(itemId, postDate) {
      try {
        await itemService.deleteReview(itemId, postDate)
        const itemIdx = this.products.findIndex( item => {return item.id === itemId})
        const reviewIdx = this.products[itemIdx].reviews.findIndex( review => {return review.postDate === postDate})
        this.products[itemIdx].reviews.splice(reviewIdx,1)
      } catch {
        console.log(`Couldn't delete review. Try again later`)
      }
    }
  },
  getters: {
  }
})
