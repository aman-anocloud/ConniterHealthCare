import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get() @ApiOperation({ summary: 'List all blog posts' })
    findAll() { return this.blogService.findAll(); }

    @Get(':slug') @ApiOperation({ summary: 'Get a blog post by slug' })
    findOne(@Param('slug') slug: string) { return this.blogService.findBySlug(slug); }
}
