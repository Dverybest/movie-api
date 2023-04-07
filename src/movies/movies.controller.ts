import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MovieDto, MovieListResponseDTO } from './dto/movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'movie list successfully retrieved',
    type: MovieListResponseDTO,
  })
  @Get()
  findAll() {
    const movies = this.moviesService.findAll();
    return {
      data: movies,
      status: 'success',
      message: 'movie list successfully retrieved',
    };
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'movie successfully retrieved',
    type: MovieDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const movie = this.moviesService.findOne(+id);

    if (!movie) {
      throw new NotFoundException('The movie has being deleted or not found');
    }
    return {
      data: movie,
      status: 'success',
      message: 'movie list successfully retrieved',
    };
  }
}
