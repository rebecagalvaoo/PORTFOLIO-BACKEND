const ServicesModel = require('../models/services');
const createError = require('http-errors');

function formatService(item) {
    const data = item.toObject();
    data.id = data._id.toString();
    delete data._id;
    delete data.__v;
    return data;
}

module.exports.servicesList = async function (req, res, next) {
    try {
        const list = await ServicesModel.find({});

        res.json({
            success: true,
            message: 'Services list retrieved successfully.',
            data: list.map(formatService)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    try {
        const item = await ServicesModel.findById(req.params.id);

        if (!item) {
            return next(createError(404, 'Service not found.'));
        }

        res.json({
            success: true,
            message: 'Service retrieved successfully.',
            data: formatService(item)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processAdd = async function (req, res, next) {
    try {
        const result = await ServicesModel.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Service added successfully.',
            data: formatService(result)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processEdit = async function (req, res, next) {
    try {
        const result = await ServicesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!result) {
            return next(createError(404, 'Service not found.'));
        }

        res.json({
            success: true,
            message: 'Service updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processDelete = async function (req, res, next) {
    try {
        const result = await ServicesModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return next(createError(404, 'Service not found.'));
        }

        res.json({
            success: true,
            message: 'Service deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};
