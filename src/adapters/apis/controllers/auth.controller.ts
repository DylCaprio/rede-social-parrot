import express from 'express'
import debug from 'debug'

import loginAuthUsercase from '../../../domain/usecases/auth/login.auth.usercase';

const log: debug.IDebugger = debug('app:auth-controller');

class AuthController {
    async login(req: express.Request, res: express.Response){
        const user = await loginAuthUsercase.execute(req.body);
        if(user){
            res.status(200).send(user);
        } else {
            res.status(401).send({
                error: `Dados incorretos.`
            });
        }

    }
}

export default new AuthController();
