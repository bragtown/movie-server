import { Movie } from './Movie';
export declare class MoviesService {
    private movies;
    private idCounter;
    createMovie(movie: Movie): Promise<Movie>;
    getMovies(): Promise<Movie[]>;
    getMovie(id: number): Promise<Movie>;
    edit(movie: Movie): Promise<Movie>;
}
