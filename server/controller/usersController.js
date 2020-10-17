import User from '../models/userModel.js';
import Store from '../models/storeModel.js';
import generateToken from '../utils/jwt.js';

// @desc Auth user & get a token
// @route POST/api/users/login
// @access public to all
const authUserController = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		const store = await Store.find({ user: user._id });
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
			store: store ? store : null,
		});
	} else {
		res.status(401).send({ message: 'Invalid email or password' });
	}
};

// @desc get users profile
// @route GET/api/users/profile
// @access private to auth user
const getUserProfileController = async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404).send({ message: 'User not found' });
	}
};

// @desc update users profile
// @route PUT/api/users/profile
// @access private to auth user
const updateUserProfileController = async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			password: updatedUser.password,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404).send({ message: 'User not found' });
	}
};

// @desc register user
// @route POST/api/users
// @access public to all
const userRegisterController = async (req, res) => {
	const { email, password, name } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		res
			.status(400)
			.send({ message: `User already exits with the email ${email}` });
	} else {
		const user = await User.create({
			email,
			name,
			password,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).send({ message: 'Invalid User Data' });
		}
	}
};

// @desc get all users
// @route GET/api/users
// @access private, admin only
const getAllUsersController = async (req, res) => {
	const users = await User.find({});
	res.json(users);
};

// @desc delete a user
// @route DELETE/api/users/:userId
// @access private, admin only
const deleteUserController = async (req, res) => {
	const user = await User.findById(req.params.userId);
	if (user) {
		await user.remove();
		res.json({ message: 'user deleted' });
	} else {
		res.status(400);
		throw new Error("couldn't delete the user");
	}
};

// @desc get a user
// @route GET/api/users/:userId
// @access private, admin only
const getUserById = async (req, res) => {
	const user = await User.findById(req.params.userId).select('-password');
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("couldn't get the user");
	}
};

// @desc update users profile
// @route PUT/api/users:userId
// @access private to auth user
const updateUserById = async (req, res) => {
	const user = await User.findById(req.params.userId);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			password: updatedUser.password,
		});
	} else {
		res.status(404).send({ message: 'User not found' });
	}
};

export {
	authUserController,
	getUserProfileController,
	userRegisterController,
	updateUserProfileController,
	getAllUsersController,
	deleteUserController,
	getUserById,
	updateUserById,
};
