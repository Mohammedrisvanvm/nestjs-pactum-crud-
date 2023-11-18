import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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
  ) {
    return this.prisma.bookMark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async editBookmarksById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    //get bookmark by id
    const bookmark =
      await this.prisma.bookMark.findUnique({
        where: { id: bookmarkId },
      });

    //check if user owns the book
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resourse denied',
      );

    //edit bookmark
    return this.prisma.bookMark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookMark.findUnique({
        where: { id: bookmarkId },
      });
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resourse denied',
      );
    await this.prisma.bookMark.delete({
      where: { id: bookmarkId },
    });
  }
}
