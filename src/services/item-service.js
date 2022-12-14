
import { storageService } from './async-storage-service.js';


async function getItems() {
    try {
        const products = await storageService.query('products');
        return products
    } catch (error) {
        console.log('Could not load products. Error:' + error)
    }
}

async function getById(itemId) {
    try {
        const itemToGet = await this.products.find(item => item.id === itemId)
        if (!itemToGet) throw new Error('Could not find requested item')
        return { ...itemToGet }
    } catch (error) {
        return error
    }
}

async function addReview(itemId, review) {
    const item = await storageService.get("products", itemId)
    review.postDate = Date.now()
    item.reviews.push(review)
    await storageService.put("products", item)
    return review
}

async function deleteReview(itemId, postDate) {
    const item = await storageService.get("products", itemId)
    const idx = item.reviews.findIndex( review => {return review.postDate === postDate})
    item.reviews.splice(idx,1)
    await storageService.put("products", item)
}

export default {
    getItems,
    getById,
    addReview,
    deleteReview
  }