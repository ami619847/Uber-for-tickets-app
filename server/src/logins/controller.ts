import { JsonController, Post, Body, BadRequestError } from "routing-controllers"
import { IsString } from "class-validator"
import { sign } from '../jwt'
import User from "../users/entity"

class AuthenticatePayload {
    @IsString()
    email: string
  
    @IsString()
    password: string
  }
  
  @JsonController()
  export default class LoginController {
  
    //@Authorized
    @Post('/logins')
    async authenticate(
      @Body() {email, password}: AuthenticatePayload
    ) {
        // if user exists
        // else: send some HTTP 400 Bad request error
        const user = await User.findOne({ where: {email} })
        if (!user || !user.id) throw new BadRequestError('A user with this email does not exist')
        // if password is correct
        // else: send some HTTP 400 Bad request error
        if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct')
        // send back a jwt token        
        const jwt = sign({ id: user.id })
        return { jwt }
    }
  }
  