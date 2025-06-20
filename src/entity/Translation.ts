import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("translations")
export class Translation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  original_text!: string;

  @Column("text")
  translated_text!: string;

  @Column({ length: 10 })
  source_language!: string;

  @Column({ length: 10 })
  target_language!: string;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ nullable: true })
  user_id?: number;

  @ManyToOne(() => User, (user) => user.translations, { onDelete: "SET NULL" })
  @JoinColumn({ name: "user_id" })
  user?: User;
}
