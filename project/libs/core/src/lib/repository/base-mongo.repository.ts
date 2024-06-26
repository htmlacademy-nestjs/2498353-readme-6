import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../entity/base.entity';
import { StorableEntityInterface } from '../entity/storable-entity.interface';
import { EntityFactoryInterface } from '../entity/entity-factory.interface';
import { RepositoryInterface } from './repository.interface';

export abstract class BaseMongoRepository<
  T extends BaseEntity & StorableEntityInterface<ReturnType<T['toObject']>>,
  DocumentType extends Document,
> implements RepositoryInterface<T>
{
  constructor(protected entityFactory: EntityFactoryInterface<T>, protected readonly model: Model<DocumentType>) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    const plainObject = document.toObject();
    return this.entityFactory.createEntity(plainObject);
  }

  public async findById(id: T['id']): Promise<T> {
    const document = await this.model.findById(id).exec();
    return this.createEntityFromDocument(document);
  }

  public async save(entity: T): Promise<T> {
    const newEntity = new this.model(entity.toObject());
    await newEntity.save();

    entity.id = newEntity._id.toString();
    return entity;
  }

  public async update(entity: T): Promise<void> {
    const updatedDocument = await this.model
      .findByIdAndUpdate(entity.id, entity.toObject(), { new: true, runValidators: true })
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`BaseEntity with id ${entity.id} not found`);
    }
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`BaseEntity with id ${id} not found.`);
    }
  }
}
