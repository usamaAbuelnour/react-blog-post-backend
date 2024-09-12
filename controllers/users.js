const { compare } = require("bcrypt");
const UserModel = require("../models/user");
const generateToken = require("../utils/generateToken");
const { registerValidationSchema } = require("../utils/userValidate");

const register = async (req, res) => {
    await registerValidationSchema.validate(req.body);

    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
        return res.status(409).send("This email is already in use!!");
    const newUser = await UserModel.create({ name, email, password });
    setTimeout(async () => {
        res.status(201).send({
            id: newUser._id,
            email: newUser.email,
            token: await generateToken(newUser._id),
        });
    }, 1000);
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser && (await compare(password, existingUser.password))) {
        return res.send({
            id: existingUser._id,
            email: existingUser.email,
            token: await generateToken(existingUser._id),
        });
    }
    res.status(401).send("Incorrect credentials");
};

module.exports = { register, login };
