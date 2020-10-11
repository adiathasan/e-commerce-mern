import User from '../models/userModel.js';
import generateToken from '../utils/jwt.js';

// @desc Auth user & get a token
// @route POST/api/users/login
// @access public to all
const authUserController = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).send({ message: 'Invalid email or password' });
	}
};

// @desc get users profile
// @route GET/api/users/profile
// @access private to auth user
const getUserProfileController = async (req, res) => {
	const user = await User.findById(req.user._conditions._id);
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
	console.log(req.user._conditions._id);
	const user = await User.findById(req.user._conditions._id);
	console.log(req.body);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			console.log(req.body.password);
			user.password = req.body.password;
		}

		const updatedUser = await user.save();
		console.log(updatedUser);
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

export {
	authUserController,
	getUserProfileController,
	userRegisterController,
	updateUserProfileController,
};
