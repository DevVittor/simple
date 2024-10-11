import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const createUser = [
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("O email é obrigatório e não pode ser vazio.")
      .bail()
      .isLength({ min: 1 })
      .withMessage("Tem que ter pelo menos 1 caracteres")
      .bail()
      .isEmail()
      .withMessage("O email deve ser válido.")
      .bail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("A senha é obrigatória e não pode ser vazia.")
      .bail()
      .isLength({ min: 6 })
      .withMessage("A senha deve ter no mínimo 6 caracteres."),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Deu ruim", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  async (req, res) => {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const emailRegistered = await userModel.findOne({ email });
      if (emailRegistered) {
        return res
          .status(409)
          .json({ error: "Não foi possível cadastrar um novo usuário." });
      }

      const createPasswordWithHash = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        email,
        password: createPasswordWithHash,
      });

      const payload = {
        _id: user._id,
        email: user.email,
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
        sameSite: "None",
      };

      res
        .status(201)
        .cookie("access_token", `Bearer ${token}`, cookieOptions)
        .json({ msg: "Usuário criado", token });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para criar um novo usuário",
        details: error.message,
      });
    }
  },
];

/*export const createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ error: "Preencha todos os campos do formulário corretamente" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ error: "Não foi possível criar uma conta" });
    }

    const createPasswordWithHash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      password: createPasswordWithHash,
    });

    const payload = {
      _id: newUser._id,
      role: newUser.role,
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
      .status(201)
      .cookie("access_token", `Bearer ${token}`, cookieOptions)
      .json({ msg: "User Created", token });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Não foi possível receber os dados necessários para criar um novo usuário",
        details: error.message,
      });
  }
};*/

export const detailsUser = async (req, res) => {
  const { userId } = req.query;
  console.log("UserId: ", userId);
  if (!userId) {
    return res
      .status(404)
      .json({ error: "Não foi possível identificar o usuário" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user || user.blocked === true) {
      return res
        .status(404)
        .json({ error: "Não foi possível mostrar detalhes do usuário" });
    }

    res.status(200).json({ msg: "Detalhes encontrados", user: user.limit });
  } catch (error) {
    res.status(500).json({
      error:
        "Não foi possível receber os dados necessários para mostrar detalhes do usuário",
      details: error.message,
    });
  }
};

export const loginUser = [
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("É necessário ter o email preenchido")
      .bail()
      .isEmail()
      .withMessage("É necessário ter caracteristicas de email no formulário")
      .bail()
      .isLength({ min: 1 })
      .withMessage("Tenha pelo menos 1 caracters no formulário email")
      .bail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("É necessário ter o campo email preenchido")
      .bail()
      .isString()
      .withMessage("O tipo da senha tem que ser um tipo texto")
      .bail()
      .isLength({ min: 6 })
      .withMessage("A senha tem que ter pelo menos 6 caracteres.")
      .bail(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Deu ruim", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (!user || user.blocked === true) {
        return res.status(404).json({ error: "Não foi possível fazer login" });
      }

      const checkPasswordWithHash = await bcrypt.compare(
        password,
        user.password
      );
      if (!checkPasswordWithHash) {
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
          "Não foi possível receber os dados necessários para acessar a conta",
        details: error.message,
      });
    }
  },
];

export const deleteUser = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res
      .status(404)
      .json({ error: "Não foi poss;ivel localizar o usuário" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Não foi possível deletar o usuário" });
    }

    await userModel.findByIdAndDelete(userId);
    res.status(201).json({ msg: "Account Delete Done" });
  } catch (error) {
    res.status(500).json({
      error:
        "Não foi possível receber os dados necessários para deletar a conta",
      details: error.message,
    });
  }
};
