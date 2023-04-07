import { Injectable } from '@nestjs/common';
import { movieList } from 'src/utils/movie-list';

@Injectable()
export class MoviesService {
  findAll() {
    return movieList.map((item, index) => ({ id: index + 1, ...item }));
  }

  findOne(id: number) {
    const movie = movieList.find((_, index) => index + 1 === id);
    return movie;
  }
}
