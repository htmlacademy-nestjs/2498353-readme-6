import { compare, genSalt, hash } from 'bcrypt';
import { BaseEntity } from '@project/core';
import { StorableEntity } from '@project/core';
import 'multer';
import { SALT_ROUNDS } from '@project/constants';
import { AuthUser } from './types/auth-user.interface';
import { UserRole } from './types/user-role.enum';

export class UserAccessEntity extends BaseEntity implements StorableEntity<AuthUser> {
  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  /** Адрес электронной почты */
  public email: string;

  /** Имя пользователя */
  public login: string;

  /** Аватар */
  public avatar?: Express.Multer.File | null;

  /** Роль (разрешения в системе) */
  public role: UserRole;

  /** Хэш пароля */
  public passwordHash: string;

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;

    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.login = user.login;
  }

  /**
   * Преобразование из UserAccessEntity в объект
   * @returns {AuthUser}
   */
  public toObject(): AuthUser {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      email: this.email,
      avatar: this.avatar,
      login: this.login,
      role: this.role,
      passwordHash: this.passwordHash,
    };
  }

  /**
   * Создание пароля пользователя
   * @param {string} password
   * @returns {Promise<UserAccessEntity>}
   */
  public async createPassword(password: string): Promise<UserAccessEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  /**
   * Сравнение паролей при аутентификации
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}