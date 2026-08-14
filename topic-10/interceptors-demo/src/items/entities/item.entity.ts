import { Exclude, Expose } from 'class-transformer';

export class ItemEntity {
  id: number;

  title: string;

  @Exclude()
  internalNote: string;

  @Expose()
  get shortTitle(): string {
    return this.title.slice(0, 4);
  }

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
