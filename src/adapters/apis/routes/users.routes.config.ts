// import { CommonRoutesConfig } from "./common.routes.config";
// import UsersController from "../controllers/users.controller";
// import UsersMiddleware from "../middlewares/users.middleware";
// import express from "express";

// export class UsersRoutes extends CommonRoutesConfig {
//     constructor(app: express.Application) {
//         super(app, 'UsersRoutes');
//     }

//     configureRoutes(): express.Application {
//         this.app.route(`/users`)
//             .get(UsersController.listUsers)
//             .post(
//                 UsersMiddleware.validateRequiredUserBodyFields,
//                 UsersMiddleware.validateUserRepeated,
//                 UsersController.createUser
//             );


//             this.app.route(`/users/:userId`)
//                         .all(UsersMiddleware.validateUserExists)
//                         .get(UsersController.getUserById)
//                         .put(
//                             UsersMiddleware.validateRequiredUserBodyFields,
//                             UsersController.updateUser
//                         )//TODO conferir delete
//                         .delete(UsersController.removeUser);

//         return this.app;
//     }
// }
