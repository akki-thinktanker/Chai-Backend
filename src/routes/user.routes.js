import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

userRouter.post("/login", loginUser);

// Secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refreshtoken").post(refreshAccessToken);
userRouter.route("/changepassword").post(changeCurrentPassword);
userRouter.route("/currentuser").get(verifyJWT, getCurrentUser);
userRouter.route("/updateaccount").patch(verifyJWT, updateAccountDetails);
userRouter
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
userRouter
  .route("/coverimage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
userRouter.route("/c/:username").get(verifyJWT, getUserChannelProfile);
userRouter.route("/history").get(verifyJWT, getWatchHistory);

export default userRouter;
