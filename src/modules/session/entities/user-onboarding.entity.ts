import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('user_onboarding')
export class UserOnboarding {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index() // Index for fast lookup when a message arrives
  @Column({ type: 'varchar', length: 50 })
  chatId!: string;

  @Column({ type: 'varchar', length: 30, default: 'IDLE' })
  state!: string;

  @Column({ type: 'simple-json', default: '{}' })
  data!: Record<string, any>;
}
