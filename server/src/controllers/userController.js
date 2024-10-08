import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const detailsUser = async (req, res) => {
  const { userId } = req.query;
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

    res.status(200).json({ msg: "Detalhes encontrados", user });
  } catch (error) {
    res.status(500).json({
      error:
        "Não foi possível receber os dados necessários para mostrar detalhes do usuário",
      details: error.message,
    });
  }
};

export const createUser = async (req, res) => {
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
  } catch (error) {}
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      error: "É necessário ter todos os campos do formulário preenchidos",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user || user.blocked === true) {
      return res.status(404).json({ error: "Não foi possível fazer login" });
    }

    const checkPasswordWithHash = await bcrypt.compare(password, user.password);
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
};

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
