import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route with additional error handling
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    next();
  } catch (err) {
    res.status(500).send("File upload error: " + err.message);
  }
}, addFood);

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
