import { model, Schema } from "mongoose";

export const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  urlImg: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  endurance: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
});

export const Robot = model("robot", robotSchema, "robots");
