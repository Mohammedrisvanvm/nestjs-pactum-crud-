import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum'
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto/auth.dto';

describe('app e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
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
    await app.listen(3334)

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3334')
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = { email: 'risvanguest0001@gmail.com', password: '123' }
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signup').withBody({ password: dto.password }).expectStatus(400).inspect()

      })
      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400).inspect()

      })
      it('should throw if no dto', () => {
        return pactum.spec().post('/auth/signup').withBody({ email: dto.email }).expectStatus(400).inspect()

      })
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201).inspect()
      })
    })
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signin').withBody({ password: dto.password }).expectStatus(400).inspect()

      })
      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400).inspect()

      })
      it('should throw if no dto', () => {
        return pactum.spec().post('/auth/signin').withBody({ email: dto.email }).expectStatus(400).inspect()

      })
      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).inspect().stores('userAcctkn','access_Token')

      })
    }) 

  })
  describe('User', () => {
    describe('Get user', () => {
it('should get current user',()=>{
  return  pactum.spec().get('/users/me').withBearerToken('$S{userAcctkn}').expectStatus(200).inspect() 

})
    })
    describe('Edit user', () => {

    })
  })
  describe('Bookmark', () => {
    describe('Create bookmark', () => {

    })
    describe('Get bookmark', () => {

    })
    describe('Get bookmark by id', () => {

    })
    describe('Edit bookmark by id', () => {

    })
    describe('Delete bookmark by id', () => {

    })
  })

});
