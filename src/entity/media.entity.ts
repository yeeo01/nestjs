import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity('media', { schema: 'yejin' })
export class Media {
  @PrimaryGeneratedColumn()
    id: number

  @Column('int', { name: 'user_id', nullable: false })
    userId: number

  @Column('varchar', { name: 'name', nullable: false, length: 255 })
    name: string

  @Column('varchar', { name: 'url', nullable: false, length: 255 })
    url: string

  @Column('int', { name: 'size', nullable: true })
    size: number | null

  @Column('varchar', { name: 'type', nullable: false, length: 50 })
    type: string

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @DeleteDateColumn()
    deletedAt: Date | null

  @ManyToOne(() => User, (u) => u.media)
  @JoinColumn({ name: 'user_id' })
    user: User
}
