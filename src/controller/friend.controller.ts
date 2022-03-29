import express from "express";
import Friend from "../model/friend.model";
import User from "../model/user.model";

const router = express.Router();

type FriendSearchType = {
  phone: string;
};

router.post("/", async (req, res) => {
  const { userId, phone } = req.body;

  if (!userId || !phone) {
    return res.status(400).json({
      message: "올바른요청이 아닙니다.",
    });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({
      message: "잘못된 사용자의 요청입니다.",
    });
  }

  const friendUser = await User.findOne({
    where: {
      phone,
    },
  });

  if (!friendUser) {
    return res.status(404).json({
      message: "존재하지 않는 사람입니다.",
    });
  }

  const existFriend = await Friend.findOne({
    where: {
      userId: user.id,
      friendId: friendUser.id,
    },
  });

  if (existFriend) {
    return res.status(400).json({
      message: "이미 친구입니다.",
    });
  }

  await Friend.create({
    userId: user.id,
    friendId: friendUser.id,
  });

  return res.status(201).json();
});

router.get("/search", async (req, res) => {
  const { phone } = req.query as FriendSearchType;
  if (!phone) {
    res.status(400).json({
      meassage: "존재하지 않는 번호입니다.",
    });
  }

  const user = await User.findOne({
    where: {
      phone,
    },
  });
  if (!user) {
    res.status(404).json({
      meassage: "존재하지 않는 유저 번호입니다.",
    });
  }

  res.status(200).json(user);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json();
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json();
  }

  const friends = await user.$get("myFriends", {
    include: [
      {
        model: User,
      },
    ],
  });

  const friendList = friends.map((friend) => {
    return friend.getDataValue("friendUser");
  });

  return res.status(200).json(friendList);
});

export default router;
