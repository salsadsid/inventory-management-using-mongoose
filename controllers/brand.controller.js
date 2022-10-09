
const { createBrandService, getBrandsService, getBrandByIdService, updateABrandService } = require("../services/brand.service")


exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the brand"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the brand"
        })
    }
}
exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService()

        res.status(200).json({
            status: "Success",
            data: brands
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the brands"
        })
    }

}
exports.getBrandById = async (req, res, next) => {
    const { id } = req.params
    try {
        const brand = await getBrandByIdService(id)
        if (!brand) {
            return res.status(200).json({
                status: "Fail",
                message: "Can't find this brand by id"
            })
        }
        res.status(200).json({
            status: "Success",
            data: brand
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the brands"
        })
    }

}
exports.updateABrand = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await updateABrandService(id, req.body)
        console.log(result)
        if (!result.nModified) {
            return res.status(200).json({
                status: "Fail",
                message: "Can't Update this brand"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully update the brand"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't update the brands"
        })
    }

}