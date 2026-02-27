import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogPost) private readonly repo: Repository<BlogPost>) { }
    findAll() { return this.repo.find({ order: { publishedAt: 'DESC' } }); }
    findBySlug(slug: string) { return this.repo.findOne({ where: { slug } }); }
}
