import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'

import UserController from "./users/controller"
import LoginController from "./logins/controller"
import EventController from "./events/controller"
import TicketController from "./tickets/controller"
import CommentController from "./comments/controller"


const app = createKoaServer({
   controllers: [
    UserController, 
    LoginController,     
    EventController,
    TicketController,
    CommentController     
    ]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))
