const http = require("node:http");
const fs = require("node:fs");
const port = 3000;

const readUsers = () => {
  const data = fs.readFileSync("users.json", { encoding: "utf-8" });
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users));
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  //Add user
  if (method === "POST" && url == "/users") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk.toString("utf-8");
      console.log(data);
    });

    req.on("end", () => {
      const { name, age, email } = JSON.parse(data); //newUser
      const users = readUsers();
      const userExist = users.find((user) => {
        return user.email === email;
      });
      if (userExist) {
        res.writeHead(409, { "content-type": "application/json" });
        res.write(
          JSON.stringify({ message: "email already exist.", statusCode: 409 }),
        );
        return res.end();
      }
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name,
        age,
        email,
      };
      users.push(newUser);
      writeUsers(users);

      res.writeHead(201, { "content-type": "application/json" });
      res.write(
        JSON.stringify({ message: "User added successfully.", newUser }),
      );
      return res.end();
    });
  }

  //Update User
  else if (method === "PATCH" && url.startsWith("/users/")) {
    const id = url.split("/")[2];

    let data = "";

    req.on("data", (chunk) => {
      data += chunk.toString();
    });

    req.on("end", () => {
      // check user existance
      const users = readUsers();

      const userIndex = users.findIndex((user) => {
        return user.id == id;
      });

      if (userIndex == -1) {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "User not found" }));
        return res.end();
      }
      //update user
      data = JSON.parse(data);
      Object.assign(users[userIndex], data);

      writeUsers(users);

      res.writeHead(200, { "content-type": "application/json" });
      res.write(
        JSON.stringify({
          message: "user updated successfully",
          statusCode: 200,
        }),
      );
      return res.end();
    });
  }

  //Delete User
  else if (method === "DELETE" && url.startsWith("/users/")) {
    const id = parseInt(url.split("/")[2]);

    if (isNaN(id)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "Invalid user ID" }));
      return res.end();
    }

    const users = readUsers();

    const userIndex = users.findIndex((user) => {
      return user.id == id;
    });

    if (userIndex == -1) {
      res.writeHead(404, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "User not found" }));
      return res.end();
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    writeUsers(users);

    res.writeHead(200, { "content-type": "application/json" });
    res.write(
      JSON.stringify({
        message: "User deleted successfully",
        user: deletedUser,
      }),
    );
    return res.end();
  }

  //Get All Users
  else if (method === "GET" && url == "/users") {
    const users = readUsers();
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify({ message: "Done", users }));
    return res.end();

  }
  
  //Get User by ID
  else if (method === "GET" && url.startsWith("/users/") && url !== "/users") {
    const id = parseInt(url.split("/")[2]);

    if (isNaN(id)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "Invalid user ID" }));
      return res.end();
    }

    const users = readUsers();

    const user = users.find((user) => {
      return user.id == id;
    });

    if (!user) {
      res.writeHead(404, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "User not found" }));
      return res.end();
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify(user));
    return res.end();
  }
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
