import { JsonController, Get, Param, 
    //Authorized, 
    Post, HttpCode, Body } from 'routing-controllers'
import Event from './entity'

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

    //@Authorized()
    @Post('/events')
    @HttpCode(201)
    createEvent(
        @Body() event: Event
    ) {
        return event.save()
    }

}