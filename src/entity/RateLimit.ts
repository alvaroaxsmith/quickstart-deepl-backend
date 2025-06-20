import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity("rate_limits")
export class RateLimit {
  @PrimaryColumn({ length: 45 })
  ip_address!: string;

  @Column({ default: 1 })
  request_count!: number;

  @UpdateDateColumn()
  last_request_time!: Date;
}
