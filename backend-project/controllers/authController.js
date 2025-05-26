import Users from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    res.status(200).json({
      message: 'Login successful',
      user: req.session.user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const checkAuth = (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
};
