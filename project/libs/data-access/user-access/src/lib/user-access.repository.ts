import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { AuthUserInterface } from './types/auth-user.interface';
import { UserAccessEntity } from './user-access.entity';
import { UserAccessFactory } from './user-access.factory';

@Injectable()
export class UserAccessRepository extends BasePostgresRepository<UserAccessEntity> {
  constructor(entityFactory: UserAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: UserAccessEntity): Promise<UserAccessEntity> {
    return this.dataSource.user
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp as AuthUserInterface));
  }

  public async findOneByEmail(email: string): Promise<UserAccessEntity> {
    return this.dataSource.user
      .findFirst({
        where: {
          email,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp as AuthUserInterface));
  }

  public async changePassword(id: string, passwordHash: string): Promise<UserAccessEntity> {
    return this.dataSource.user
      .update({
        where: {
          id,
        },
        data: {
          passwordHash,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp as AuthUserInterface));
  }

  public async findById(id: string): Promise<UserAccessEntity> {
    return this.dataSource.user
      .findUnique({
        where: {
          id,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp as AuthUserInterface));
  }
}
