import TodoModel from "../models/Todo.js";
import isOwner from "../middleware/accessControl.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, description, completed, priority, dueDate, tags } = req.body;

    const todo = await TodoModel.create({
      title,
      description,
      completed,
      priority,
      dueDate,
      tags,
      owner: req.user._id
    });

    res.status(201).json({
      message: "Todo created successfully",
      todo
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const {
      search = "",
      sort = "newest",
      page = 1,
      limit = 10,
      completed
    } = req.query;

    const query = {
      owner: req.user._id
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (completed === "true") query.completed = true;
    if (completed === "false") query.completed = false;

    let sortOption = { createdAt: -1 };

    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "priority-high") sortOption = { priority: -1 };
    if (sort === "priority-low") sortOption = { priority: 1 };
    if (sort === "title-asc") sortOption = { title: 1 };
    if (sort === "title-desc") sortOption = { title: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const todos = await TodoModel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await TodoModel.countDocuments(query);

    res.status(200).json({
      message: "Todos fetched successfully",
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      todos
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    if (!isOwner(todo.owner, req.user._id)) {
      return res.status(403).json({
        message: "You are not authorized to view this todo"
      });
    }

    res.status(200).json({
      message: "Todo fetched successfully",
      todo
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    if (!isOwner(todo.owner, req.user._id)) {
      return res.status(403).json({
        message: "You are not authorized to update this todo"
      });
    }

    const allowedFields = [
      "title",
      "description",
      "completed",
      "priority",
      "dueDate",
      "tags"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        todo[field] = req.body[field];
      }
    });

    await todo.save();

    res.status(200).json({
      message: "Todo updated successfully",
      todo
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    if (!isOwner(todo.owner, req.user._id)) {
      return res.status(403).json({
        message: "You are not authorized to delete this todo"
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      message: "Todo deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};