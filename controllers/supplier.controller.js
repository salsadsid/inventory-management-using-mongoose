
const { createSupplierService, getSuppliersService, getSupplierByIdService, updateSupplierService } = require("../services//supplier.service")


exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the supplier"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the Supplier"
        })
    }
}
exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await getSuppliersService()

        res.status(200).json({
            status: "Success",
            data: suppliers
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the Suppliers"
        })
    }

}
exports.getSupplierById = async (req, res, next) => {
    const { id } = req.params
    try {
        console.log(id)
        const supplier = await getSupplierByIdService(id)
        if (!supplier) {
            return res.status(200).json({
                status: "Fail",
                message: "Can't find this supplier by id"
            })
        }
        res.status(200).json({
            status: "Success",
            data: supplier
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the supplier"
        })
    }

}
exports.updateSupplier = async (req, res, next) => {
    const { id } = req.params
    try {
        console.log(id)
        const result = await updateSupplierService(id, req.body)
        if (!result.nModified) {
            return res.status(200).json({
                status: "Fail",
                message: "Can't find this sore by id"
            })
        }
        res.status(200).json({
            status: "Success",
            data: result
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the Stores"
        })
    }

}
