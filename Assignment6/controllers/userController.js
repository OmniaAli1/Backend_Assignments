import User from "../models/user.js";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const exist = await User.findOne({
      where: { email },
    });

    if (exist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user using build and save
    const user = User.build(req.body);
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (err) {
    // Handle validation errors
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation error",
        details: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }
    res.status(500).json({ error: err.message });
  }
};

export const updateOrCreateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Upsert with skip validation
    const [user, created] = await User.upsert(
      { id: parseInt(id), ...req.body },
      { validate: false }
    );

    res.status(created ? 201 : 200).json({
      message: created ? "User created" : "User updated",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    // Check if email parameter exists
    if (!email) {
      return res.status(400).json({
        error: "Email query parameter is required"
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["role"] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};