
const mongoose = require('mongoose')
const Stock = require('../models/Stock')
const { ObjectId } = mongoose.Types.ObjectId

exports.getStocksService = async (filters, queries) => {
    const stocks = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const total = await Stock.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return { total, page, stocks }
}

exports.getStockByIdService = async (id) => {
    // const stock = await Stock.findOne({ _id: id }).populate("store.id").populate("suppliedBy.id").populate("brand.id")
    const stock = await Stock.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
            $project: {
                category: 1,
                quantity: 1,
                price: 1,
                productId: 1,
                name: 1,
                'brand.name': { $toLower: '$brand.name' }
            }
        },
        {
            $lookup: {
                from: 'brands',
                localField: 'brand.name',
                foreignField: 'name',
                as: 'brandDetails'
            }
        }
    ])
    return stock
}
exports.createStockService = async (data) => {
    const result = await Stock.create(data)
    // const { _id: productId, brand } = product

    // const res = await Brand.updateOne(
    //     { _id: brand.id },
    //     { $push: { products: productId } }
    // )
    // console.log(res.nModified);
    return result
}
// exports.updateAProductService = async (productId, data) => {

//     // const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true })
//     const result = await Product.updateOne({ _id: productId }, { $inc: data }, { runValidators: true })
//     // const product = await Product.findById(productId)
//     // const result = await product.set(data).save();
//     return result
// }

// exports.bulkUpdateProductService = async (data) => {

//     // const result = await Product.updateMany({ _id: data.ids }, { $set: data.data }, { runValidators: true })

//     const products = [];
//     data.ids.forEach(product => {
//         products.push(Product.updateOne({ _id: product.id }, product.data))
//     });

//     const result = await Promise.all(products)
//     return result
// }

// exports.deleteProductByIdService = async (id) => {
//     const result = await Product.deleteOne({ _id: id })
//     return result
// }

// exports.bulkDeleteProductService = async (ids) => {
//     const result = await Product.deleteMany({})
//     return result
// }