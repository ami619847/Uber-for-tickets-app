import React, {PureComponent} from 'react';  

export default class FraudRisk extends PureComponent {
    state = {}
        
    authorRisk() {
        const userIdTickets = this.props.tickets.map(ticket => {
            return ticket.user.id
        })
        const numTicketsByUser = userIdTickets.filter(creator => {
            return creator = this.props.ticket.user.id
        }).length

        if (numTicketsByUser === 1) return 10 
        else return 0
    }
    
    averagePriceRisk() {
        const ticketsPrices = this.props.tickets.map(ticket => ticket.price) 
        const totalTicketsSum = ticketsPrices.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        })                
        const averagePrice = totalTicketsSum/this.props.tickets.length 
        
        const expensiveRisk = ((averagePrice - this.props.ticket.price)/averagePrice)*100
        const cheapRisk = ((this.props.ticket.price - averagePrice)/averagePrice)*100

        if (averagePrice>this.props.ticket.price){
            return cheapRisk 
        } else if (cheapRisk<-10){
            return -10
        } else return expensiveRisk    
    }

    hoursRisk() {
        const timestamp_hours = this.props.ticket.createdAt.slice(11, 13)          
        if (timestamp_hours >= 9 && timestamp_hours <= 17) {
            return -10
        } else return 10
    }

    commentsRisk(){
        if (this.props.comments.length > 3) {
            return 5
        } else return 0
    }

    FraudRisk() {
        const total = this.authorRisk() + this.averagePriceRisk() + this.hoursRisk() + this.commentsRisk()
        
        if (total<5) {
            return 5 
        } else if (total>95) {
            return 95
        } else return total
    }

    render() {
        const {ticket} = this.props
        if (!ticket) return null
        
        return (
            <dev>{this.FraudRisk()}</dev>           
        )
    }
}