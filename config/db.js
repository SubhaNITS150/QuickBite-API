import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://quickbite:Subha%232910@cluster0.rstvp.mongodb.net/food-del').then(() => {
        console.log("DB Connected");
    })
}