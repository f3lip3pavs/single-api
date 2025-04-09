// Na sua pasta de interfaces ou em um arquivo de tipos separado
import { JwtPayload } from 'jsonwebtoken';
import { Request } from './express';

declare global {
  namespace Express {
    interface Request {
      userid?: string | JwtPayload; // Torne opcional se nem todas as rotas precisarem desse campo
    }
  }
}
