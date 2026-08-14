import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (tag === null) {
      throw new NotFoundException(`Тег з id ${id} не знайдено`);
    }
    return tag;
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagsRepository.preload({ id, ...updateTagDto });
    if (tag === undefined) {
      throw new NotFoundException(`Тег з id ${id} не знайдено`);
    }
    return this.tagsRepository.save(tag);
  }

  async remove(id: string): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagsRepository.remove(tag);
  }

  async findByIds(ids: string[]): Promise<Tag[]> {
    if (ids.length === 0) {
      return [];
    }
    const tags = await this.tagsRepository.find({
      where: { id: In(ids) },
    });
    if (tags.length !== ids.length) {
      throw new NotFoundException('Один або кілька тегів не знайдено');
    }
    return tags;
  }
}
