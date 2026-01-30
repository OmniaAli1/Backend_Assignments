const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

const app = express();
const port = 3000;

app.use(express.json());

const readUsers = () => {
  try {
    const data = fs.readFileSync("users.json", { encoding: "utf-8" });
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

// 1. POST /user - Add new user
app.post("/user", (req, res) => {
  const { name, age, email } = req.body;

  if (!name || age === undefined || !email) {
    return res.status(400).json({
      message: "Name, age, and email are required",
    });
  }

  const users = readUsers();

  const userExist = users.find((u) => u.email === email);
  if (userExist) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    age,
    email,
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

// 2. PATCH /user/:id - Update user
app.patch("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, email } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name) users[userIndex].name = name;
  if (age !== undefined) users[userIndex].age = age;

  if (email) {
    const emailExists = users.some(
      (u, index) => u.email === email && index !== userIndex,
    );
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    users[userIndex].email = email;
  }

  writeUsers(users);

  res.status(200).json({
    message: "User updated successfully",
    user: users[userIndex],
  });
});

// 3. DELETE /user/:id - Delete user
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  writeUsers(users);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser,
  });
});

// 4. GET /user/getByName
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const users = readUsers();
  const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase());

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// 6. GET /user/filter
app.get("/user/filter", (req, res) => {
  const minAge = parseInt(req.query.minAge);

  if (isNaN(minAge)) {
    return res.status(400).json({ message: "minAge must be a number" });
  }

  const users = readUsers();
  const filteredUsers = users.filter((u) => u.age >= minAge);

  res.status(200).json(filteredUsers);
});

// 7. GET /user/:id
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const users = readUsers();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// 5. GET /user (LAST)
app.get("/user", (req, res) => {
  const users = readUsers();
  res.status(200).json(users);
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
