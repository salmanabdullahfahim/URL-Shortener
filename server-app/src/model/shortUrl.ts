import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: "string",
      required: true,
    },
    shortUrl: {
      type: "string",
      required: true,
      default: nanoid().substring(0, 10),
    },
    clicks: {
      type: "string",
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
