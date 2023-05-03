import { Request, Response, NextFunction } from "express";
import { teams } from '../teams'

interface Team {
  id: number;
  nome: string;
  sigla: string;
}

export const existingId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id: number = Number(req.params.id);
  const team: Team | undefined = teams.find((t) => t.id === id);
  if (team) {
    next();
  } else {
    res.sendStatus(404);
  }
};
