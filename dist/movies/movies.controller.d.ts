import { Movie } from './Movie';
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly movieService;
    constructor(movieService: MoviesService);
    getMovies(): Promise<Movie[]>;
    createMovie(movie: Movie): Promise<Movie>;
    editMovie(movie: Movie): Promise<Movie>;
    getMovie(id: string): Promise<Movie>;
    setup(): Promise<Movie[]>;
}
