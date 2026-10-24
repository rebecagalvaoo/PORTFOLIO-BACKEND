const ReferencesModel = require('../models/references');
const createError = require('http-errors');

function formatReference(item) {
    const data = item.toObject();
    data.id = data._id.toString();
    delete data._id;
    delete data.__v;
    return data;
}

module.exports.referencesList = async function (req, res, next) {
    try {
        const list = await ReferencesModel.find({});

        res.json({
            success: true,
            message: 'References list retrieved successfully.',
            data: list.map(formatReference)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    try {
        const item = await ReferencesModel.findById(req.params.id);

        if (!item) {
            return next(createError(404, 'Reference not found.'));
        }

        res.json({
            success: true,
            message: 'Reference retrieved successfully.',
            data: formatReference(item)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processAdd = async function (req, res, next) {
    try {
        const result = await ReferencesModel.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Reference added successfully.',
            data: formatReference(result)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processEdit = async function (req, res, next) {
    try {
        const result = await ReferencesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!result) {
            return next(createError(404, 'Reference not found.'));
        }

        res.json({
            success: true,
            message: 'Reference updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processDelete = async function (req, res, next) {
    try {
        const result = await ReferencesModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return next(createError(404, 'Reference not found.'));
        }

        res.json({
            success: true,
            message: 'Reference deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};
