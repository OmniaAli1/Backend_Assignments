import express from "express";
import checkConnectionDB from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
const app = express();
const port = 3000;

const bootstrap = () => {
  app.use(express.json());

  app.get("/", (req, res, next) => {
    res.status(200).json({ message: `Welcome on Saraha App` });
  });

  checkConnectionDB()

  app.use("/users", userRouter)

  app.use("{/*demo}", (req, res, next) => {
    throw new Error(`url ${req.originalUrl} Not Found`, {cause: 404})
    // res.status(404).json({message: `url ${req.originalUrl} Not Found`})
  });


  app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.cause || 500).json({message: err.message , stack: err.stack})
  })

  app.listen(port, () => {
    console.log("server is running on port", port);
  });
};

export default bootstrap;
