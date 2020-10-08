import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Movie } from './Movie';
import axios from "axios";
import { MoviesService } from './movies.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('Movie')
@Controller('/api/movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovies() : Promise<Movie[]> {
    return this.movieService.getMovies();
  }

  @Post()
  @ApiBody({type:Movie})
  async createMovie(@Body() movie:Movie):Promise<Movie> {
    return this.movieService.createMovie(movie);
  }

  @Put()
  @ApiBody({type:Movie})
  async editMovie(@Body() movie:Movie):Promise<Movie> {
    return this.movieService.edit(movie);
  }

  @Get('/movie/:id')
  @ApiParam({name:"id", type:"number"})
  async getMovie(@Param("id") id: string): Promise<Movie> {
    return this.movieService.getMovie(parseInt(id, 10));
  }

  @Get("/setup")
  async setup():Promise<Movie[]> {
    const imdbids = ["tt0317705", "tt3606756", "tt0317219", "tt1216475", "tt3606752", "tt0120623"];
    const movies = await Promise.all(imdbids.map(imdbid => {
      return axios.get(`http://www.omdbapi.com/?i=${imdbid}&apikey=43cf6f`).then(imdbMovieResponse => {
        const movie = new Movie();
        movie.title = imdbMovieResponse.data.Title;
        movie.plot = imdbMovieResponse.data.Plot;
        movie.genre = imdbMovieResponse.data.Genre;
        movie.releaseDate = imdbMovieResponse.data.Released;
        movie.poster = imdbMovieResponse.data.Poster;
        movie.imdbid = imdbid;
        return movie;
      });
    }));
    return await Promise.all(movies.map(movie => this.movieService.createMovie(movie)));
  }
}
