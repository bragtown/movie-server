"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const Movie_1 = require("./Movie");
const axios_1 = require("axios");
const movies_service_1 = require("./movies.service");
const swagger_1 = require("@nestjs/swagger");
let MoviesController = class MoviesController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getMovies() {
        return this.movieService.getMovies();
    }
    async createMovie(movie) {
        return this.movieService.createMovie(movie);
    }
    async editMovie(movie) {
        return this.movieService.edit(movie);
    }
    async getMovie(id) {
        return this.movieService.getMovie(parseInt(id, 10));
    }
    async setup() {
        const imdbids = ["tt0317705", "tt3606756", "tt0317219", "tt1216475", "tt3606752", "tt0120623"];
        const movies = await Promise.all(imdbids.map(imdbid => {
            return axios_1.default.get(`http://www.omdbapi.com/?i=${imdbid}&apikey=43cf6f`).then(imdbMovieResponse => {
                const movie = new Movie_1.Movie();
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
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovies", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiBody({ type: Movie_1.Movie }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Movie_1.Movie]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "createMovie", null);
__decorate([
    common_1.Put(),
    swagger_1.ApiBody({ type: Movie_1.Movie }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Movie_1.Movie]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "editMovie", null);
__decorate([
    common_1.Get('/movie/:id'),
    swagger_1.ApiParam({ name: "id", type: "number" }),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovie", null);
__decorate([
    common_1.Get("/setup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "setup", null);
MoviesController = __decorate([
    swagger_1.ApiTags('Movie'),
    common_1.Controller('/api/movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map