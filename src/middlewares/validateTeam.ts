import { Request, Response, NextFunction } from "express";

export const validateTeam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requiredProperties: string[] = ["nome", "sigla"];
  if (requiredProperties.every((property) => property in req.body)) {
    next(); // Chama o próximo middleware
  } else {
    res.sendStatus(400); // Ou já responde avisando que deu errado
  }
};
