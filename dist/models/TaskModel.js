"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema_1 = require("../schemas/TaskSchema");
exports.Task = (0, mongoose_1.model)('Task', TaskSchema_1.taskSchema);
