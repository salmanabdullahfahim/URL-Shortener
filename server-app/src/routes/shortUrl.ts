import express from "express";
import {
  createShortUrl,
  deleteShortUrl,
  getAllShortUrl,
  getShortUrl,
} from "../controllers/shortUrl";

const router = express.Router();

router.post("/shortUrl", createShortUrl);
router.get("/shortUrl", getAllShortUrl);
router.get("/shortUrl/:id", getShortUrl);
router.delete("/shortUrl/:id", deleteShortUrl);

export default router;
