"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const TaskModel_1 = require("./models/TaskModel");
const app = (0, express_1.default)();
app.use(express_1.default.json());
run().catch(err => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/taskdb');
        }
        catch (err) {
            console.log("error while db connection" + err);
        }
        //   const task = new Task({
        //     content: 'Go to gym',
        //     type: 'To Do',
        //     checked: false,
        //     isModalOpen: false
        //   });
        //await task.save();
    });
}
app.get("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield TaskModel_1.Task.findOne();
        res.status(200).json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server");
    }
}));
app.get("/task/done", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield TaskModel_1.Task.where("typeTask").equals("Done");
        res.status(200).json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server");
    }
}));
app.get("/task/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield TaskModel_1.Task.where("typeTask").equals("To Do");
        res.status(200).json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server");
    }
}));
app.get("/task/trash", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield TaskModel_1.Task.where("typeTask").equals("Trash");
        res.status(200).json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server");
    }
}));
app.post("/task/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new TaskModel_1.Task({
            content: 'Go to lake',
            typeTask: 'To Do',
            checked: false,
            isModalOpen: false
        });
        res.status(200).json(task);
        yield task.save();
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server");
    }
}));
const taskId = '645943c01a47ed2d08cc8fe1';
app.post("/task/done", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield TaskModel_1.Task.findOneAndUpdate({ _id: `${taskId}` }, { typeTask: "Done", checked: true });
        res.json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
}));
app.post("/task/trash", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield TaskModel_1.Task.findOneAndUpdate({ _id: `${taskId}` }, { typeTask: "Trash" });
        res.json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
}));
app.post("/task/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield TaskModel_1.Task.findOneAndUpdate({ _id: `${taskId}` }, { typeTask: "To do", checked: false });
        res.json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
}));
app.post("/task/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield TaskModel_1.Task.findOneAndDelete({ _id: `${taskId}` });
        res.json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
}));
app.listen(8080, () => {
    console.log("server is running");
});
