import express from "express";
import { login, logout, register, getSuggestedUsers,updateProfile,followOrUnfollow, searchUsers } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { User } from '../models/user.model.js';

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/suggested").get(getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);
router.get('/search', isAuthenticated, searchUsers);

router.get('/profile/:userId', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password') // Exclude password
            .populate('profile.court'); // If you need court details

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user profile",
            error: error.message
        });
    }
});

export default router;

