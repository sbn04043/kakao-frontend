import express from "express";
import User from "../model/user.model";

const router = express.Router();

type UserType = {
  name: string;
  phone: string;
  statusMessage: string;
};

router.get("/", async (req, res) => {
  const users: User[] = await User.findAll();
  return res.status(200).json(users);
});

router.post("/", async (req, res) => {
  const { name, phone, statusMessage } = req.body as UserType;
  if (!name || !phone) {
    return res.status(400).json();
  }

  const newUser = await User.create({
    name: name,
    phone: phone,
    statusMessage: statusMessage,
  });

  return res.status(201).json({
    userId: newUser.id,
  });
});

export default router;
