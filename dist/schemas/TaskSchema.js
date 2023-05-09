"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    typeTask: { type: String, required: true },
    checked: { type: 'boolean' },
    isModalOpen: { type: 'boolean' }
});
