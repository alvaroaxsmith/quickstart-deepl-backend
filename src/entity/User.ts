import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Translation } from "./Translation";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 255 })
  username!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 255 })
  password_hash!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Translation, (translation) => translation.user)
  translations!: Translation[];
}
