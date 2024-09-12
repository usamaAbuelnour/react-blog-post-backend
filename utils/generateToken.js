const { sign } = require("jsonwebtoken");
const { promisify } = require("util");
const asyncSign = promisify(sign);

const generateToken = async (id) =>
    await asyncSign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });


module.exports = generateToken;
