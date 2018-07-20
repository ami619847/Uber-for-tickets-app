import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length } from 'class-validator';
import Event from '../events/entity'
import Comment from '../comments/entity'
import User from '../users/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  ticketAuthor: string

  @Column('integer')
  price: number

  @IsString()
  @Length(2,300)
  @Column('text')
  description: string

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date

  @ManyToOne(() => Event, event => event.tickets)
  event: Event

  @OneToMany(() => Comment, comment => comment.ticket, {eager:true})
  comments: Comment[]

  @ManyToOne(() => User, user => user.tickets, {eager:true})
  user: User

}