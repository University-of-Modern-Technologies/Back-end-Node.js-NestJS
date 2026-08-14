import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const EXTENSIONS: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
};

@Injectable()
export class FilesService {
  private readonly uploadsPath = join(process.cwd(), 'uploads');

  async save(file: Express.Multer.File) {
    await mkdir(this.uploadsPath, { recursive: true });

    const filename = `${randomUUID()}${EXTENSIONS[file.mimetype] ?? ''}`;
    await writeFile(join(this.uploadsPath, filename), file.buffer);

    return { filename, size: file.size };
  }

  saveMany(files: Express.Multer.File[]) {
    return Promise.all(files.map((file) => this.save(file)));
  }
}
