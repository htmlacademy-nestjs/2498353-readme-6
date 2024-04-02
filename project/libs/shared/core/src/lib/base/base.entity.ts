import { BaseInterface } from './base.interface';

/** Сущность */
export abstract class BaseEntity implements BaseInterface {
  /** Идентификатор */
  private _id = '';

  /** Дата обновления */
  private _updatedAt: Date;

  /** Дата создания */
  private _createdAt: Date;

  /** Дата удаления */
  private _deletedAt: Date;

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public set createdAt(value: Date) {
    this._updatedAt = value;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public get deletedAt(): Date {
    return this._deletedAt;
  }

  public set deletedAt(value: Date) {
    this._deletedAt = value;
  }
}