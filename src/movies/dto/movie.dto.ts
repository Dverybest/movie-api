import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  rated: string;

  @ApiProperty()
  released: string;

  @ApiProperty()
  runtime: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  writer: string;

  @ApiProperty()
  actors: string;

  @ApiProperty()
  plot: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  awards: string;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  metascore: string;

  @ApiProperty()
  imdbRating: string;

  @ApiProperty()
  imdbVotes: string;

  @ApiProperty()
  imdbID: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  response: string;

  @ApiProperty()
  images: string[];
}

export class MovieListResponseDTO {
  @ApiProperty()
  status: string;

  @ApiProperty({ type: [MovieDto] })
  data: [MovieDto];
}
