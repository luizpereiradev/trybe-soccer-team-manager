import { promises as fs } from 'fs';
import { Request, Response, NextFunction } from 'express';

// como vamos ler arquivos assincronamente, precisamos do async
export async function apiCredentials(req: Request, res: Response, next: NextFunction) {
  // pega o token do cabeçalho, se houver
  const token = req.header('X-API-TOKEN');
  if (!token) {
    res.sendStatus(401); // não autorizado
    return;
  }
  // lê o conteúdo do `./authdata.json` (relativo à raiz do projeto)
  const authdata = await fs.readFile('./authdata.json', { encoding: 'utf-8' });
  // readFile nos deu uma string, agora vamos carregar um objeto a partir dela
  const authorized = JSON.parse(authdata);

  if (token in authorized) {
    next(); // pode continuar
  } else {
    res.sendStatus(401); // não autorizado
  }
};