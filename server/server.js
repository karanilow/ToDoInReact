import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { getSecret } from "./secrets";
import Task from "./model/task";

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret("dbUri"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

router.get("/tasks", (req, res) => {
  Task.find((err, tasks) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: tasks });
  });
});

router.post("/tasks", (req, res) => {
  const task = new Task();
  // body parser lets us use the req.body
  const { taskName, isTaskGroup, partOfGroup } = req.body;
  if (!taskName) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: "You must provide a task name",
    });
  }
  task.author = "Nils";
  task.name = taskName;
  task.createdAt = new Date();
  task.updatedAt = new Date();
  task.updatedBy = "Nils";
  task.isTaskGroup = isTaskGroup;
  task.partOfGroup = partOfGroup;
  //isTaskGroup && task.partOfGroups.push(task._id);
  task.status = "default";
  task.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.put("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res.json({ success: false, error: "No task id provided" });
  }
  Task.findById(taskId, (error, task) => {
    if (error) return res.json({ success: false, error });
    const { status } = req.body;
    if (status) task.status = status;
    task.updatedAt = new Date();
    task.save((error) => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

router.delete("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res.json({ success: false, error: "No task id provided" });
  }
  Task.deleteOne({ _id: taskId }, (error, task) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
