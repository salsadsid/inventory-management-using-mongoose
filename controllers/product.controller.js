const Product = require('../models/Product');
const { getProductsService, createProductService, updateAProductService, bulkUpdateProductService } = require('../services/product.services');



exports.createProduct = async (req, res, next) => {
    //save or create
    try {
        const result = await createProductService(req.body)
        // const product = new Product(req.body)
        // const result = await product.save()
        // const product = new Product(req.body)
        result.logger()
        // if (product.quantity == 0) {
        //   product.status = "out-of-stock"
        // }

        // const result = await product.save()


        res.status(200).json({
            status: 'success',
            message: "Data inserted Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: 'Data in not inserted',
            error: error.message
        })
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product.find({}, 'name quantity -_id').sort({ quantity: -1 });
        // const products = await Product
        //   .where("name").equals(/\w/)
        //   .where("quantity").gt(20).lt(600)
        //   .limit(3).sort({ quantity: -1 })
        const products = await getProductsService()
        res.status(200).json({
            status: "success",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message
        })
    }
}
exports.updateAProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateAProductService(id, req.body);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't update the data",
            error: error.message
        })
    }
}

exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't update the bulk data",
            error: error.message
        })
    }
}