const ProjectsModel = require('../models/projects');
const createError = require('http-errors');

// Format project data
function formatProject(project) {
    const data = project.toObject();
    data.id = data._id.toString();
    delete data._id;
    delete data.__v;
    return data;
}

// Get all projects
module.exports.projectsList = async function (req, res, next) {
    try {
        const list = await ProjectsModel.find({});

        res.json({
            success: true,
            message: 'Projects list retrieved successfully.',
            data: list.map(formatProject)
        });
    } catch (error) {
        next(error);
    }
};

// Get project by ID
module.exports.getByID = async function (req, res, next) {
    try {
        const project = await ProjectsModel.findById(req.params.id);

        if (!project) {
            return next(createError(404, 'Project not found.'));
        }

        res.json({
            success: true,
            message: 'Project retrieved successfully.',
            data: formatProject(project)
        });
    } catch (error) {
        next(error);
    }
};

// Add project
module.exports.processAdd = async function (req, res, next) {
    try {
        const result = await ProjectsModel.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Project added successfully.',
            data: formatProject(result)
        });
    } catch (error) {
        next(error);
    }
};

// Update project
module.exports.processEdit = async function (req, res, next) {
    try {
        const result = await ProjectsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!result) {
            return next(createError(404, 'Project not found.'));
        }

        res.json({
            success: true,
            message: 'Project updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

// Delete project
module.exports.processDelete = async function (req, res, next) {
    try {
        const result = await ProjectsModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return next(createError(404, 'Project not found.'));
        }

        res.json({
            success: true,
            message: 'Project deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};
