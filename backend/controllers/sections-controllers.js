const mongoose = require("mongoose");

const HttpError = require('../models/http-error');
const Section = require('../models/section');
const Course = require('../models/course');


const getCourseSection = async (req, res, next) => {
    const sectionId = req.params.sectionId;
    try {
        let section = await Section.findOne({ ID: sectionId });
        if (!section) {
            throw new Error('Section not found');
        }

        const course = await Course.findOne({ ID: section.course }, '-students -coverImg -category -sections');
        
        section = section.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } });
        section.course = course.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } });

        res.json({ section: section });

    } catch (err) {
        console.log(err);
        const error = new HttpError(
            'Fetching user failed, please try again later.',
            500
        );
        return next(error);
    }
};

const createCourseSection = async (req, res, next) => {
    const courseId = req.params.courseId;
    const { title, num, description } = req.body;

    const ID = courseId + "Sec" + num;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const createdSection = new Section({
            ID,
            title,
            num,
            description,
            course: courseId
        });

        await createdSection.save({ session });

        await Course.findOneAndUpdate(
            { ID: courseId }, 
            { $push: { sections: createdSection.ID } }, 
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res
            .status(201)
            .json({ section: createdSection });

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

const uploadSectionVids = async (req, res, next) => {
    const sectionId = req.params.sectionId;
    const { videos } = req.body;

    try {
        let section = await Section.findOneAndUpdate(
            { ID: sectionId },
            { $push: { videos: { $each: videos } } },
            { new: true }
        );

        const course = await Course.findOne({ ID: section.course }, '-students -coverImg -category -sections');

        section = section.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } });
        section.course = course.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } });

        res.json({ section: section });

    } catch (err) {
        console.log(err);
        const error = new HttpError(
            'Fetching user failed, please try again later.',
            500
        );
        return next(error);
    }
};

exports.getCourseSection = getCourseSection;
exports.createCourseSection = createCourseSection;
exports.uploadSectionVids = uploadSectionVids;

