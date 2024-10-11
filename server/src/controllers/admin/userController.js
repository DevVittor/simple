import { body, validationResult } from "express-validator";
import userModel from "../../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userReturn = async (req, res) => {
  console.log("OK");
  res.status(200).json({ msg: "Ok" });
};

export const loginAdmin = [
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("O email não pode ficar vázio")
      .bail()
      .isLength({ min: 1 })
      .withMessage("Esse email tem muito pouco caracteres")
      .bail()
      .isString()
      .isEmail()
      .withMessage("É necessário preencher o email corretamente")
      .bail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("É necessário preencher a senha")
      .bail()
      .isLength({ min: 6 })
      .withMessage("A sua senha tem menos que 6 caracteres")
      .bail()
      .isString()
      .withMessage("Preencha a senha corretamente")
      .bail(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },

  async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const user = await userModel.findOne({ email });
      console.log(user);
      if (!user || user.blocked === true || user.role !== "admin") {
        return res.status(409).json({ error: "Não foi posssível fazer login" });
      }

      const comparePasswordWithHash = await bcrypt.compare(
        password,
        user.password
      );
      if (!comparePasswordWithHash) {
        return res.status(409).json({ error: "Não foi possível fazer login" });
      }

      const payload = {
        _id: user._id,
        role: user.role,
      };

      const token = jwt.sign(payload, secret, {
        expiresIn: "7d",
      });

      const sevenDays = 1000 * 60 * 60 * 24 * 7;

      const cookieOptions = {
        httpOnly: true,
        maxAge: sevenDays,
        secure: true,
      };

      res
        .status(200)
        .cookie("access_token", `Bearer ${token}`, cookieOptions)
        .json({ msg: "Login Done", token });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para fazer o login do usuário",
        details: error.message,
      });
    }
  },
];
