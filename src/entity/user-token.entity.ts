import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm'
import { User } from './user.entity'

@Entity('user_token', { schema: 'yejin' })
export class UserToken {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
  @Index('IDX_user_token_user_id')
    userId: number

  @Column({ type: 'varchar', length: 1000, collation: 'utf8mb4_unicode_ci' })
    refreshToken: string

  @Column({ type: 'datetime', nullable: true, default: null })
    expiredAt: Date | null

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
    updatedAt: Date

  @ManyToOne(() => User, (u) => u.userTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
    user: User
}
