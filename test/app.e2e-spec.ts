import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { editUserDto } from '../src/user/dto/edit-user.dto';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from '../src/bookmark/dto/intex';

describe('app e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const modulerRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = modulerRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true }),
    );
    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3334',
    );
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'risvanguest0001@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });
      it('should throw if no dto', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      });
      it('should throw if no dto', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAcctkn', 'access_Token');
      });
    });
  });
  describe('User', () => {
    describe('Get user', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken('$S{userAcctkn}')
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should edit user data', () => {
        const dto: editUserDto = {
          firstName: 'risvan',
          lastName: 'vm',
          email: 'risvanguest00012@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users/edit')
          .withBearerToken('$S{userAcctkn}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
    });
  });
  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('should empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withBearerToken('$S{userAcctkn}')
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create bookmark', () => {
      it('should create bookmarks', () => {
        const dto: CreateBookmarkDto = {
          title: 'first bookmark',
          link: 'https://music.youtube.com/watch?v=lGGn4rNhZQ0&list=OLAK5uy_m2ke9Q7C44QYbUd5YG8TzvN4VF2375r3A',
        };
        return pactum
          .spec()
          .post('/bookmarks/create')
          .withBearerToken('$S{userAcctkn}')
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get bookmark', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withBearerToken('$S{userAcctkn}')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get bookmark by id', () => {
      it('should get bookmarks by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{userAcctkn}')
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}')
          .inspect();
      });
    });
    describe('Edit bookmark by id', () => {
      it('should edit bookmarks by id', () => {
        const dto: EditBookmarkDto = {
          title: 'fuck',
          description: 'youtube music',
        };
        return pactum
          .spec()
          .patch('/bookmarks/edit{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBody(dto)
          .withBearerToken('$S{userAcctkn}')
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Delete bookmark by id', () => {
      it('should delete bookmarks by id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/delete{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{userAcctkn}')
          .expectStatus(204)
          .inspect();
      });
      it('should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withBearerToken('$S{userAcctkn}')
          .expectStatus(200)
          .expectJsonLength(0)
          .inspect();
      });
    });
  });
});
