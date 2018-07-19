import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, IsCurrency } from 'class-validator';
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

  @IsCurrency()
  @Column('money')
  price: string

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

  @ManyToOne(() => User, user => user.tickets)
  user: User

}
