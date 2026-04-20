import express, { Response } from "express";
import { authenticate, AuthRequest } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { Role } from "../role";

const router = express.Router();

router.get("/profile", authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});

router.post(
  "/content",
  authenticate,
  authorize([Role.ADMIN, Role.EDITOR]),
  (req: AuthRequest, res: Response) => {
    res.json({ message: "Content created" });
  },
);

router.delete(
  "/system",
  authenticate,
  authorize([Role.ADMIN]),
  (req: AuthRequest, res: Response) => {
    res.json({ message: "System deleted" });
  },
);

export default router;
