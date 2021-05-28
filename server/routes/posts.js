import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

//localhost:5000/posts

router.get("/", getPosts);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.patch("/:id/likepost", auth, likePost);

export default router;
