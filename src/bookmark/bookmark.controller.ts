import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { jwtGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
@UseGuards(jwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService:BookmarkService){}
    @Get()
    getBookmarks(@GetUser('id') userId:number) {
  
      this.bookmarkService.getBookmarks(userId)
    }
  @Post()
  createBookmarks(@GetUser('id') userId:number, @Param('id',ParseIntPipe) bookmarkId:number) {}
  @Get(':id')
  getBookmarksById(@GetUser('id') userId:number) {}
  @Patch(':id')
  editBookmarksById(@GetUser('id') userId:number) {}
  @Delete(':id')
  deleteBookmarksById(@GetUser('id') userId:number) {}
}
