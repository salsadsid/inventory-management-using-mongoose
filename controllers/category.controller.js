
const { createCategoryService, getCategoriesService } = require("../services/category.service")


exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the category"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the category"
        })
    }
}
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await getCategoriesService()

        res.status(200).json({
            status: "Success",
            data: categories
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the categories"
        })
    }

}
