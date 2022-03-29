import express from "express";
import schoolController from "./school.controller";
import todoController from "./todo.controller";
import userController from "./user.controller";
import friendController from "./friend.controller";

const router = express.Router();

router.use("/schools", schoolController);
router.use("/todos", todoController);
router.use("/users", userController);
router.use("/friend", friendController);
export default router;
