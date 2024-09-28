import User from "../models/userModel.js";

export const fetchUserController = async (req, res) => {
	try {
		const allUsers = await User.find();
		if (allUsers.length === 0) {
			return res.status(400).json({ message: "there are no users" });
		}
		return res.status(201).json({ message: "fetched all users", allUsers });
	} catch (error) {
		console.log("error in fetchUserController", error.message);
		return res.status(500).json({ error: "error while fetching", error });
	}
};

export const createUserController = async (req, res) => {
	try {
		const userData = new User(req.body);
		const { email } = userData;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "user already exist" });
		}
		const savedUser = await userData.save();
		return res
			.status(201)
			.json({ message: "user saved successfully", savedUser });
	} catch (error) {
		console.log("error in createUserController ", error.message);
		return res.status(500).json({ error: "error while creating user", error });
	}
};

export const updateUserController = async (req, res) => {
	try {
		const id = req.params.id;
		const existingUserId = await User.findOne({ _id: id });
		if (!existingUserId) {
			return res.status(404).json({ message: "user not found" });
		}
		const updateUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		return res
			.status(201)
			.json({ message: "user updated successfully", updateUser });
	} catch (error) {
		console.log("error in updateUserController", error.message);
		return res
			.status(500)
			.json({ message: "error while updating user", error });
	}
};

export const deeteUserController = async (req, res) => {
	try {
		const id = req.params.id;
		const existingUserId = await User.findOne({ _id: id });
		if (!existingUserId) {
			console.log("no such user");
			return res.status(400).json({ error: "no records found" });
		}
		const userId = await User.findByIdAndDelete(id);
		return res.status(201).json({ message: "user deleted", userId });
	} catch (error) {
		console.log("error in deeteUserController", error);
		return res.status(500).json({ error: "error while deleting", error });
	}
};
