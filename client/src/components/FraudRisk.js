// import React, {PureComponent} from 'react';  

// export default class FraudRisk extends PureComponent {
//     state = {}
    
//     // authorRisk() {
//     //     if (this.props.tickets.ticketAuthor.length > 1){
//     //         return 10
//     //     } else return 0
//     // }
  
//     averagePriceRisk() {
//         const ticketsPrices = this.props.tickets.map((ticket) => {
//             ticket.price
//         })
//         const totalTicketsSum = ticketsPrices.reduce((accumulator, currentValue) =>{
//             accumulator + currentValue
//         })            
//         const averagePrice = totalTicketsSum / this.props.tickets.length 

//         const expensiveRisk = ((averagePrice - this.props.ticket.price)/averagePrice)*100
//         const cheapRisk = ((this.props.ticket.price - averagePrice)/averagePrice)*100
  
//         if (averagePrice>this.props.ticket.price){
//             return cheapRisk 
//         } else return expensiveRisk    
//     }
  
//     hoursRisk() {
//         const timestamp_hours = this.props.ticket.createdAt.slice(11, 13)          
//         if (timestamp_hours >= 9 && timestamp_hours <= 17) {
//             return -10
//         } else return 10
//     }

//     commentsRisk(){
//         if (this.props.comments.length > 3) {
//             return 5
//         } else return 0
//     }

//     FraudRisk() {
//         const total = this.averagePriceRisk() + this.hoursRisk() + this.commentsRisk() 
//         //+ this.authorRisk()
//         const newTotal = new Number(total)
//         if (newTotal<5) {
//             return newTotal 
//         } else if (newTotal>95) {
//             return "It is a possible fraud"
//         } else return newTotal
//         console.log(newTotal)
//     } 
    
//     render() {
//         const {ticket} = this.props
//         if (!ticket) return null

//         return (
//             <dev>{this.FraudRisk()}</dev>           
//         )
//     }
// }

