const Product = require('../models/Product');
const { getProductsService, createProductService, updateAProductService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require('../services/product.services');



exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product.find({}, 'name quantity -_id').sort({ quantity: -1 });
        // const products = await Product
        //   .where("name").equals(/\w/)
        //   .where("quantity").gt(20).lt(600)
        //   .limit(3).sort({ quantity: -1 })

        let filters = { ...req.query }
        const excludedFields = ['sort', 'page', 'limit', 'fields']
        excludedFields.forEach(field => delete filters[field])

        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // console.log(filterString)
        filters = JSON.parse(filterString)
        console.log(filters);
        const queries = {}
        // console.log(req.query)
        // console.log(filters)
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            // console.log(sortBy)
            queries.sortBy = sortBy
            // console.log(queries)
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            // console.log(fields)
            queries.fields = fields
            // console.log(fields)
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * Number(limit);

            queries.skip = skip;
            queries.limit = Number(limit)
        }
        const products = await getProductsService(filters, queries)
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

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteProductByIdService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "Fail",
                message: "Couldn't delete the data"
            })
        }
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't delete the data",
            error: error.message
        })
    }
}

exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductService(req.body.ids);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "Fail",
                message: "Couldn't delete the data"
            })
        }
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't delete the bulk data",
            error: error.message
        })
    }
}
