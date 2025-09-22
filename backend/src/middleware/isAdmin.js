export function isAdmin(req, res, next) {
  if (req.role !== "ADMIN") {
    return res
      .status(401)
      .json({ message: "Apenas Admin podem editar cargos" });
  }

  next();
}
