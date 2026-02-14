import mongoose from "mongoose";
import { GenderEnum, providerEnum } from "../../common/enum/user.enum.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 5,
      trim: true,
    },
    lasttName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 5,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      //lowercase: true  // email.toLowerCase()  to prevent duplication
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    age: Number,
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
      default: GenderEnum.male,
    },
    phone: {
            type: String,
            required: true
        },
    profilePicture: String,
    confirmed: Boolean, // exists only after OTP confirmation
    provider: {
      type: String,
      enum: Object.values(providerEnum),
      default: providerEnum.system,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    toJSON:{virtuals: true},
    toObject: {virtuals: true}
  },
);

userSchema.virtual("userName")
    .get(function () {
        return this.firstName + " " + this.lasttName;
    })
    .set(function(v) {
        const [firstName, lasttName] = v.split(" ")
        this.set({firstName, lasttName})
    })

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
