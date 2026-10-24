const UsersModel = require('../models/users');
const createError = require('http-errors');

function formatUser(item) {
    const data = item.toObject();
    data.id = data._id.toString();
    delete data._id;
    delete data.__v;
    delete data.password;
    return data;
}

module.exports.usersList = async function (req, res, next) {
    try {
        const list = await UsersModel.find({}).select('-password');

        res.json({
            success: true,
            message: 'Users list retrieved successfully.',
            data: list.map(formatUser)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    try {
        const item = await UsersModel.findById(req.params.id).select('-password');

        if (!item) {
            return next(createError(404, 'User not found.'));
        }

        res.json({
            success: true,
            message: 'User retrieved successfully.',
            data: formatUser(item)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processAdd = async function (req, res, next) {
    try {
        const result = await UsersModel.create(req.body);

        res.status(201).json({
            success: true,
            message: 'User added successfully.',
            data: formatUser(result)
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processEdit = async function (req, res, next) {
    try {
        const updateData = { ...req.body };
        delete updateData.password;

        const result = await UsersModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { runValidators: true }
        );

        if (!result) {
            return next(createError(404, 'User not found.'));
        }

        res.json({
            success: true,
            message: 'User updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

module.exports.processDelete = async function (req, res, next) {
    try {
        const result = await UsersModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return next(createError(404, 'User not found.'));
        }

        res.json({
            success: true,
            message: 'User deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};
