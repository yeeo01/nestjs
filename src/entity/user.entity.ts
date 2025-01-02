import { TGenderType } from 'src/type/user/GenderType'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'

@Entity('user', { schema: 'yejin' })
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column('varchar', { name: 'signin_id', length: 100, unique: true })
    signinId: string

  @Column('varchar', { name: 'password', length: 100 })
    password: string

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
    name: string | null

  @Column('varchar', {
    name: 'email',
    nullable: true,
    length: 150,
    default: null
  })
    email: string | null

  @Column('varchar', { name: 'phone_number', nullable: true, length: 100 })
    phoneNumber: string | null

  @Column('varchar', { name: 'gender', nullable: true, length: 45 })
    gender: TGenderType | null

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date

  @DeleteDateColumn()
    deletedAt: Date | null
}
