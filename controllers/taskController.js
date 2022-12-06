const Task = require("../models/taskModel");
const catchAsync = require("../middlewares/async");
const { createError } = require("../errors/customError");

exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    tasksLength: tasks.length,
    tasks,
  });
});

exports.createTask = catchAsync(async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({
    newTask,
  });
});

exports.getSingleTask = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    return next(createError("No Task with this ID ! ", 404));
  }
  res.status(200).json({
    task,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedTask = await Task.findOneAndDelete({ _id: id });

  if (!deletedTask) {
    return next(createError("No Task with this ID ! ", 404));
  }

  res.status(200).json({
    deletedTask,
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    return next(createError("No Task with this ID ! ", 404));
  }

  res.status(200).json({
    updatedTask,
  });
});
