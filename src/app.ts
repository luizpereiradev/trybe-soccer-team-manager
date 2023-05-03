import express, { Application, Request, Response } from 'express';
import { teams } from './teams';
import { validateTeam } from './middlewares/validateTeam';
import { existingId } from './middlewares/existingId';

const app: Application = express();

app.listen(3001, () => console.log('Ouvindo na porta 3001!'));

let nextId: number = 3;

interface Team {
  id: number;
  nome: string;
  sigla: string;
}

app.use(express.json());

app.get('/teams', (req: Request, res: Response) => res.json(teams));

app.get('/teams/:id', existingId, (req: Request,  res: Response) => {
  const id: number = Number(req.params.id);
  const team: Team | undefined = teams.find(t => t.id === id);
  if (team) {
    res.json(team);
  } else {
    res.sendStatus(404);
  }
});

app.post('/teams', validateTeam, (req: Request, res: Response) => {
  const team: Team = { id: nextId, ...req.body };
  teams.push(team);
  nextId += 1;
  res.status(201).json(team);
});

app.put('/teams/:id', validateTeam, existingId, (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  const index: number = teams.indexOf(team as Team);
  const updated: Team = { id, ...req.body };
  teams.splice(index, 1, updated);
  res.status(201).json(updated);
});

app.delete('/teams/:id', existingId, (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  const index: number = teams.indexOf(team as Team);
  teams.splice(index, 1);
});

export default app;