import * as userService from "../services/userService.js";
import { createSessionCookies } from "../utils/jwt.js";

export async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);

    createSessionCookies(res, user);

    res.status(201).json({ message: "Conta criada" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export async function signIn(req, res) {
  try {
    const user = await userService.signIn(req.body);

    createSessionCookies(res, user);

    return res.status(200).json({ message: "Login Efetuado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export async function getUser(req, res) {
  const user = await userService.getInfoUser(req.userId);

  return res.status(200).json(user);
}
