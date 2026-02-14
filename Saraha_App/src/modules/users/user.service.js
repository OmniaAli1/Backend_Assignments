import { providerEnum } from "../../common/enum/user.enum.js";
import { encrypt } from "../../common/utils/security/encrypt.security.js";
import { successResponse } from "../../common/utils/success.response.js";
import * as db_service from "../../DB/models/db.service.js";
import userModel from "../../DB/models/user.model.js";

// const asyncHandler = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch((error) => {
//             // res.status(400).json({msg:error.message})
//             next(error)  //direct go to global error handling
//         })
//     }
// }

export const signUp =async (req, res, next) => {

    const { userName, email, password, cPassword, age, gender, phone } = req.body;

    if (password !== cPassword) {
        throw new Error("inValid password", {cause: 400})
    }

    if (await db_service.findOne({
        model: userModel,
        filter: { email },
        })
    ) {
        throw new Error("email already exist");
        // return res.status(409).json({ message: "email already exist" });
    }
    const user = await db_service.create({
        model: userModel,
        data: { userName, email, password, age, gender, phone: encrypt(phone) },
    });
    // res.status(201).json({ message: "done", user });
    successResponse({res, status: 201, data: user})
    }


export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await db_service.findOne({
        model: userModel,
        filter: { email, provider: providerEnum.system },
    });

    if (!user) {
        throw new Error("user not exist", {cause: 400})
        // return res.status(409).json({ message: "user not exist" });
    }
    if (password !== user.password) {
        throw new Error("InValid password", {cause: 400})
        // return res.status(400).json({ message: "InValid password" });
    }

    // res.status(201).json({ message: "done", user });
    successResponse({res, data: user})
};
