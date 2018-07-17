import { JsonController, Get, Param, 
    //Authorized, 
    Post, HttpCode, Body, Put, NotFoundError } from 'routing-controllers'
import Ticket from './entity'

@JsonController()
export default class TicketController {

    @Get('/tickets')
    async allTickets() {
        const tickets = await Ticket.find()
        return { tickets }
    }   
   
    @Get('/tickets/:id([0-9]+)')
    getTicket(
        @Param('id') id: number
    ) {
        return Ticket.findOne(id)
    }  

    //@Authorized()
    @Post('/tickets')
    @HttpCode(201)
    createTicket(
        @Body() ticket: Ticket
    ) {
        return ticket.save()
    }

    //@Authorized()
    @Put('/tickets/:id')
    async updateTicket(
        @Param('id') id: number,
        @Body() update: Partial<Ticket>
    ) {
        const ticket = await Ticket.findOne(id)
        if (!ticket) throw new NotFoundError('Cannot find a ticket')

        return Ticket.merge(ticket, update).save()
    }

}