import { JsonController, Get, Param, Authorized, Post, HttpCode, Body, Put, NotFoundError, CurrentUser } from 'routing-controllers'
import Ticket from './entity'
import User from '../users/entity'

@JsonController()
export default class TicketController {

    // @Get('/tickets')
    // async allTickets(
    //     @Param('id') eventId: number
    // ) {
    //     const event = await Event.findOne(eventId)
    //     if (!event) throw new BadRequestError(`Event does not exist`)
        
    //     const tickets = await Ticket.find()
    //     return { tickets }
    // }   

    @Get('/tickets')
    async allTickets() {
        const tickets = await Ticket.find({relations: ['event']})
        return { tickets }
    } 
   
    @Get('/tickets/:id([0-9]+)')
    getTicket(
        @Param('id') id: number
    ) {
        return Ticket.findOne(id)
    }  

    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
    async createTicket(
        @CurrentUser() user: User,
        @Body() ticket: Ticket,
    ) {      
        if (user) ticket.user = user
        return ticket.save()
    }

    @Authorized()
    @Put('/tickets/:id')
    async updateTicket(
        @Param('id') id: number,
        @CurrentUser() user: User,
        @Body() update: Partial<Ticket>
    ) {        
        const ticket = await Ticket.findOne(id)
        if (!ticket) throw new NotFoundError('Cannot find a ticket')
        if (user) ticket.user = user

        return await Ticket.merge(ticket, update).save()
    }
}