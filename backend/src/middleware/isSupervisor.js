export function isSupervisor(req, res, next) {
  if (req.role === "ANALISTA") {
    return res.status(401).json({ message: "Você não é supervisor!" });
  }

  next();
}
