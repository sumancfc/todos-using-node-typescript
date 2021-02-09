import { RequestHandler } from "express";
import { Todos } from "./../models/todos";

const TODO: Todos[] = [];

export const createTodos: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  //   console.log(text);

  const todos = new Todos(Math.random().toString(), text);

  TODO.push(todos);

  res.status(201).json({
    message: "Todos created successfully",
    todosCreated: todos,
  });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODO });
};

export const updateTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updateText = (req.body as { text: string }).text;

  const TodoIndex = TODO.findIndex((todo) => todo.id === todoId);

  if (TodoIndex < 0) throw new Error("Todos not found!!!");

  TODO[TodoIndex] = new Todos(TODO[TodoIndex].id, updateText);

  res.json({ message: "Todo updated", updateddTodo: TODO[TodoIndex] });
};

export const deleteTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODO.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) throw new Error("Todos not found!!!");

  TODO.splice(todoIndex, 1);

  res.json({
    message: "Todo Deleted",
    deletedTodos: TODO[todoIndex],
  });
};
