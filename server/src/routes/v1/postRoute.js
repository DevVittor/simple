import { Router } from "express";

const router = Router();

import {
  searchPost,
  listPost,
  createPost,
  deletePost,
} from "../../controllers/postController.js";

router.get("/", searchPost);
router.get("/list", listPost);
router.post("/create", createPost);
router.post("/delete", deletePost);

export default router;
