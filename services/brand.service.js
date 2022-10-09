const Brand = require('../models/Brand')

exports.createBrandService = async (data) => {
    console.log(data)
    const result = await Brand.create(data)
    console.log(result)
    return result
}
exports.getBrandsService = async () => {
    const brands = await Brand.find({}).populate('products')
    return brands
}
exports.getBrandByIdService = async (id) => {
    const brand = await Brand.find({ _id: id })
    return brand
}
exports.updateABrandService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
    })
    return result
}