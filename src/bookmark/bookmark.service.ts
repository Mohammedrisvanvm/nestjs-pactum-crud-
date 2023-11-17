import { Injectable } from '@nestjs/common';
import { editUserDto } from 'src/user/dto/edit-user.dto';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookMark.findMany({
      where: {
        userId,
      },
    });
  }

  async createBookmarks(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    const bookMark =
      await this.prisma.bookMark.create({
        data: { userId, ...dto },
      });
    return bookMark;
  }

  getBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {}

  editBookmarksById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {}

  deleteBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {}
}
