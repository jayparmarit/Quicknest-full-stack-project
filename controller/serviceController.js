import Category from "../model/Category.js"

const add = async (req, res, next) => {
    try {

        const { name, price, duration, description, isActive, category } = req.body;

        const existingService = await Service.findOne({ name });

        if (existingService) {
            return next(new HttpError("service is already exist", 400))
        }

        const existingCategory = await Category.findById(category);

        if (!existingCategory) {
            return next(new HttpError("category not existed", 404))
        }

        const newService = new Service({
            name,
            price,
            duration,
            description,
            isActive,
            category,
        })

    } catch (error) {

    }
}

export default { add }