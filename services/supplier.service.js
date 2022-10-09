const Supplier = require('../models/Supplier')

exports.createSupplierService = async (data) => {
    console.log(data)
    const result = await Supplier.create(data)
    console.log(result)
    return result
}
exports.getSuppliersService = async () => {
    const suppliers = await Supplier.find({})
    return suppliers
}
exports.getSupplierByIdService = async (id) => {
    console.log(id)
    const supplier = await Supplier.findOne({ _id: id })
    console.log(supplier)
    return supplier
}
exports.updateSupplierService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, data, {
        runValidators: true
    })
    console.log(result);
    return result

}