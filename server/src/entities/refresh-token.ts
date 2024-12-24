import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    userId: number;

    @Column()
    expiryDate: Date;

    @Column({ default: new Date() })
    createdAt: Date;

    @Column({ default: new Date() })
    updatedAt: Date;
}