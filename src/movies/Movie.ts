import { ApiProperty } from "@nestjs/swagger";

export class Movie {
  @ApiProperty()
  id: number;
  @ApiProperty()
  genre: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  releaseDate: string;
  @ApiProperty()
  plot: string;
  @ApiProperty()
  imdbid: string;
  @ApiProperty()
  poster: string;
}