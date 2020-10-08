import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MoviesModule } from './movies.module';

describe("movies", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports:[MoviesModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });
  it('/SETUP movies', () => {
    return request(app.getHttpServer())
      .get('/api/movies/setup')
      .expect(200);
  });
  it('gets /api/movies', () => {
    return request(app.getHttpServer())
      .get('/api/movies')
      .expect(200);
  });
  it('creates a movie', ()=> {
    return request(app.getHttpServer())
      .post('/api/movies')
      .send({
        title: "The Incredibles",
        plot: "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
        genre: "Animation, Action, Adventure, Family",
        releaseDate: "05 Nov 2004",
        poster: "https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_SX300.jpg",
        imdbid: "tt0317705",
      })
      .expect(201);
  })
});