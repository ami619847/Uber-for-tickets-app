import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, 
  //IsUrl, IsDate 
} from 'class-validator'
import Ticket from '../tickets/entity'
import User from '../users/entity'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @IsString()
  @Length(2,300)
  @Column('text')
  description: string
  
  //@IsUrl()
  @Column('text')
  picture: string

  //@IsDate()
  @Column('daterange')  //https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
  date: string
  // date: Date

  @OneToMany(() => Ticket, ticket => ticket.event, {eager:true})
  tickets: Ticket[]

  @ManyToOne(() => User, user => user.events)
  user: User

}

//no email and phone in the ad entity, they belong to the User entity
//@ManyToOne(() => User, user => user.id)
//seller: User
//}