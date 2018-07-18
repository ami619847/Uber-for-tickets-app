import { JsonController, Get, Param, 
    Authorized, 
    Post, HttpCode, CurrentUser, Body } from 'routing-controllers'
import Event from './entity'
import User from '../users/entity'

@JsonController()
export default class EventController {

    @Get('/events')
    async allEvents() {
        const events = await Event.find()
        return { events }
    }   
   
    @Get('/events/:id([0-9]+)')
    getEvent(
        @Param('id') id: number
    ) {
        return Event.findOne(id)
    }  

    @Authorized()
    @Post('/events')
    @HttpCode(201)
    async createEvent(
        @CurrentUser() user: User, 
        @Body() event: Event
    ) {
        if (user) event.user = user
        return event.save()
    }
    
    // @Authorized()
    // @Post('/events')
    // @HttpCode(201)
    // createEvent(
    //     //@CurrentUser() user: User,
    //     @Body() event: Event
    // ) {
        
    //     return event.save()
    // }
}