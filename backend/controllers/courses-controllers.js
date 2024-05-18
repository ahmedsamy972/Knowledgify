const mongoose = require("mongoose");

const HttpError = require('../models/http-error');
const Course = require('../models/course');
const Category = require("../models/category");
const User = require("../models/user");
const Section = require("../models/section");

const getCourse = async (req, res, next) => {
    const { courseId, uID } = req.params;
    
    let course;
    let enrolled = false;

    try {
        course = await Course.findOne({ ID: courseId }).select('-students');

        const sectionIds = course.sections;
        const sections = await Section.find({ ID: { $in: sectionIds } });

        const courseData = course.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } });
        courseData.sections = sections;
           
        if (uID && course.students.includes(uID)){
            enrolled = true;
        }
        res.json({ course: courseData, enrolled });


    } catch (err) {
        const error = new HttpError(
            'Fetching user failed, please try again later.',
            500
        );
        return next(error);
    }
};

const createCourse = async (req, res, next) => {
    const { title, description, instructor, code, category, coverImg } = req.body;
    const ID = category + code;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const createdCourse = new Course({
            ID,
            code,
            title,
            description,
            instructor,
            category, 
            coverImg
        });

        await createdCourse.save({ session });

        await Category.findOneAndUpdate(
            { ID: category }, 
            { $push: { courses: createdCourse.ID } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res
            .status(201)
            .json({ course: createdCourse });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        return next(error);
    }
};


const enrollInCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    const uID = req.body.uID;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const courseUpdateResult = await Course.updateOne(
            { ID: courseId },
            { $addToSet: { students: uID } }, 
            { session }
        );
        if (courseUpdateResult.nModified === 0) {
            throw new HttpError('Course not found or student already enrolled', 404);
        }

        const userUpdateResult = await User.updateOne(
            { ID: uID },
            { $addToSet: { enrolledCourses: courseId } }, 
            { session }
        );
        if (userUpdateResult.nModified === 0) {
            throw new HttpError('User not found or course already enrolled', 404);
        }

        await session.commitTransaction();
        session.endSession();

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        return next(error);
    }

    res
        .status(201)
        .json({ message: 'success'});
};



exports.getCourse = getCourse;
exports.createCourse = createCourse;
exports.enrollInCourse = enrollInCourse;
