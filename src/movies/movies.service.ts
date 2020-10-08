import { Injectable } from '@nestjs/common';
import { Movie } from './Movie';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private idCounter = 0;
  //TODO: ensure only user can do this
  async createMovie(movie: Movie): Promise<Movie> {
    movie.id = this.idCounter++;
    this.movies.push(movie);
    return movie;
  }

  async getMovies():Promise<Movie[]> {
    return this.movies;
  }
}
