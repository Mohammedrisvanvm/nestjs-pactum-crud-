import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';



describe('app e2e', () => {
  let app:INestApplication
  beforeAll(async () => {
    const modulerRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    app=modulerRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({whitelist:true}))
    await app.init();
  })
  afterAll(()=>{
app.close() 
  })
  it.todo('should pass')
}) 

