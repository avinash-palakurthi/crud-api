import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/userRoute.js";
const mongoConnection = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log(`MongoDB connected ${conn.connection.host}`);
	} catch (error) {
		console.log(`error while connecting : ${error}`);
		process.exit(1);
	}
};

mongoConnection();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
	console.log(`server running at PORT : ${PORT}`);
});
