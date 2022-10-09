const Store = require('../models/Store')

exports.createStoreService = async (data) => {
    console.log(data)
    const result = await Store.create(data)
    console.log(result)
    return result
}
exports.getStoresService = async () => {
    const brands = await Store.find({})
    return brands
}
exports.getStoreByIdService = async (id) => {
    console.log(id)
    const store = await Store.find({ _id: id })
    console.log(store)
    return store
}