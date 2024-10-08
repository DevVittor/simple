import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
export const createAdmin = async () => {
  const email = process.env.EMAIL_ADMIN;
  const password = process.env.PASSWORD_ADMIN;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return console.log(`Já tem um admin cadastrado`);
    }

    const createPasswordWithHash = await bcrypt.hash(password, 10);
    await userModel.create({
      email,
      password: createPasswordWithHash,
      role: "admin",
    });

    console.log(`Admin criado com sucesso!`);
  } catch (error) {
    console.log(
      `Não foi possível receber os dados necessários para criar o admin. Error: ${error.message}`
    );
  }
};
