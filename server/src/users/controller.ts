import { JsonController, Get, Param, Body, Post, HttpCode, Authorized } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {  
    
    @Post('/users')
    @HttpCode(201)
    async createUser(
        @Body() user: User
    ) {
        const {password, ...rest} = user
        const entity = User.create(rest)
        await entity.setPassword(password)
        return entity.save()
    }

    @Authorized()
    @Get('/users/:id([0-9]+)')
    getUser(
        @Param('id') id: number
    ) {
        return User.findOne(id)
    }

    @Authorized()
    @Get('/users')
    async allUsers() {
        const users = await User.find()
        return { users }
    }

}