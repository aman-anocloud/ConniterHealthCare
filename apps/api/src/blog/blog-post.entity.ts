import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blog_posts')
export class BlogPost {
    @PrimaryGeneratedColumn('uuid') @ApiProperty() id: string;
    @Column() @ApiProperty() title: string;
    @Column({ unique: true }) @ApiProperty() slug: string;
    @Column({ type: 'text' }) @ApiProperty() content: string;
    @Column({ type: 'text', nullable: true }) @ApiProperty() excerpt: string;
    @Column() @ApiProperty() category: string;
    @Column({ nullable: true }) @ApiProperty() coverImage: string;
    @CreateDateColumn() @ApiProperty() publishedAt: Date;
}
