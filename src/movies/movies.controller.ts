import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { BookMovieTicketDto, CreateMovieDto } from './dto/create-movie.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovieDto, MovieListResponseDTO } from './dto/movie.dto';
import { Auth } from 'src/auth/auth.decorator';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  bookingList: Array<BookMovieTicketDto> = [];

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
    type: MovieDto,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for getting movie by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    const movie = this.moviesService.findOne(+id);

    if (!movie) {
      throw new NotFoundException('The movie has being deleted or not found');
    }
    return { ...movie, id, message: 'movie successfully retrieved' };
  }

  @Auth()
  @Post('/book-movie-ticket')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Endpoint for booking movie ticket' })
  buyMovieTicket(@Body() body: BookMovieTicketDto) {
    const data = {
      ...body,
      id: Math.floor(Math.random() * 10000000),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.bookingList.push(data);
    return { ...data, message: 'Ticket booked successfully' };
  }
}
