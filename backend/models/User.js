import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

// Create schema for todo
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "The User name field is required"],
  },
  email: {
    type: String,
    required: [true, "The User email field is required"],
    lowecase: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "The password field is required"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const authUser = await bcrypt.compare(password, user.password);
    if (authUser) {
      return user;
    }
    throw Error("wrong password");
  }
  throw Error("user not found");
};

// Create model for User
const User = mongoose.model("User", UserSchema);
export default User;
