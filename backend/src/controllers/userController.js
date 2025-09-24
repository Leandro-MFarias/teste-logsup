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
  try {
    const user = await userService.getInfoUser(req.userId);

    return res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await userService.listUsers();

    return res.status(200).json(users);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export async function getRoles(req, res) {
  try {
    const roles = await userService.getRoles();

    return res.status(200).json(roles);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export async function updateUserRole(req, res) {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    const result = await userService.updateUserRole(userId, role);

    return res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}
