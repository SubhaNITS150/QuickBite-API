import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// All the listed foods
const listFood = async(req, res) => {
  try {

    const foods = await foodModel.find({});
    res.json({success: true, data: foods})

  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"})
  }
}

//Remove food items

const removeFood = async (req, res) => {
  try {
    // Validate ID
    const foodId = req.body.id;
    if (!foodId) {
      return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(foodId);

    // Check if food exists
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Remove the image file if it exists
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.error(`Failed to delete image: ${err.message}`);
      });
    }

    // Delete the food record
    await foodModel.findByIdAndDelete(foodId);
    res.json({ success: true, message: "Food Removed" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};


export { addFood, listFood, removeFood };
