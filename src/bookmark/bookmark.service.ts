import { Injectable } from '@nestjs/common';
import { editUserDto } from 'src/user/dto/edit-user.dto';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Injectable()
export class BookmarkService {
  createBookmarks(
    userId: number,
    dto: CreateBookmarkDto,
  ) {}

  getBookmarks(userId: number) {}

  getBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {}

  editBookmarksById(
    userId: number,
    dto: EditBookmarkDto,
  ) {}

  deleteBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {}
}
