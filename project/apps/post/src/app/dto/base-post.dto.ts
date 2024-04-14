import { IsArray, IsBoolean, IsEnum, isNotEmpty, IsNotEmpty, IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType, UserPost } from '@project/post-access';
import { POSTID_API, USERID_API } from '@project/constants';
import { Type } from 'class-transformer';
import { POST_STATUS_API, POST_TAGS_API, POST_TYPE_API, REPOSTED_API } from '../constants';

export class CreateBasePostDto implements UserPost {
  @ApiProperty(USERID_API)
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @ApiProperty(POST_TYPE_API)
  @IsNotEmpty()
  @IsEnum(PostType)
  public type!: PostType;

  @ApiProperty(POST_TAGS_API)
  @IsOptional()
  @IsArray({ each: true })
  @Type(() => String)
  public tags?: string[];

  @ApiProperty(POST_STATUS_API)
  @IsNotEmpty()
  @IsEnum(PostStatus)
  public status!: PostStatus;

  @ApiProperty(POSTID_API)
  @IsOptional()
  @IsUUID()
  public repostedFromPostId?: string;

  @ApiProperty(REPOSTED_API)
  @IsOptional()
  @IsBoolean()
  @ValidateIf((post) => isNotEmpty(post.repostedFromPostId))
  public isReposted?: boolean;
}
