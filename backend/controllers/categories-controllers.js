const HttpError = require('../models/http-error');
const Category = require('../models/category');
const Course = require("../models/course"); 

const getCategories = async (req, res, next) => {
    try {

        const categories = await Category.find({});
        const categoriesWithCourses = await Promise.all(categories.map(async category => {
            const courseIds = category.courses.slice(0, 3);
            const courses = await Course.find({ ID: { $in: courseIds } }, '-students -category -sections');

            return {
                ...category.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } }),
                courses: courses
            };
        }));

        res.json({ categories: categoriesWithCourses});

    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
};

const getCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findOne({ ID: categoryId });
        if (!category) {
            res.json({ message: "No Courses" });
        }
        const courseIds = category.courses;
        const courses = await Course.find({ ID: { $in: courseIds } }, '-students -category -sections');

        const categoryWithCourses = {
            ...category.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } }),
            courses: courses
        };
        res.json({ category: categoryWithCourses });

    } catch (err) {
        const error = new HttpError(
            'Fetching user failed, please try again later.',
            500
        );
        return next(error);
    }
};

const createCategory = async (req, res, next) => {
    const { name, fields } = req.body;
    const ID = name.replace(/\s/g, '');

    const createdCategory = new Category({
        ID,
        name,
        fields
    });
    try {
        await createdCategory.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        return next(error);
    }

    res
        .status(201)
        .json({ category: createdCategory });
};



exports.getCategories = getCategories;
exports.getCategory = getCategory;
exports.createCategory = createCategory;
