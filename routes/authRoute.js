import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//register route
router.post("/register", registerController);

//register route
router.post("/login", loginController);

router.get("/test",requireSignIn,isAdmin, testController);

//protected route for user authentication
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
})

//protected route for admin authentication
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
});

//update profile
router.put("/profile",requireSignIn,updateProfileController);

export default router;
