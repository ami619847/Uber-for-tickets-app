import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, IsCurrency } from 'class-validator';
import Ticket from '../tickets/entity'
import User from '../users/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  commentAuthor: string

  @IsCurrency()
  @Column('money')
  price: string

  @IsString()
  @Length(2,300)
  @Column('text')
  text: string

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  ticket: Ticket

  @ManyToOne(() => User, user => user.comments)
  user: User

}