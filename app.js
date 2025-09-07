const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json({ message: "User created successfully", user: newUser });
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === userId);
  if (user) {
    user.name = req.body.name;
    res.status(200).json({ message: "User updated successfully", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
