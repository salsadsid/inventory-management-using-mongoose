
const { createStoreService, getStoresService, getStoreByIdService } = require("../services/store.service")


exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the Store"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the Store"
        })
    }
}
exports.getStores = async (req, res, next) => {
    try {
        const stores = await getStoresService()

        res.status(200).json({
            status: "Success",
            data: stores
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the Stores"
        })
    }

}
exports.getStoreById = async (req, res, next) => {
    const { id } = req.params
    try {
        console.log(id)
        const store = await getStoreByIdService(id)
        if (!store) {
            return res.status(200).json({
                status: "Fail",
                message: "Can't find this sore by id"
            })
        }
        res.status(200).json({
            status: "Success",
            data: store
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the Stores"
        })
    }

}
