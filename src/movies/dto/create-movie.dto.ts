import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
} from 'class-validator';
export class CreateMovieDto {}

export class BookMovieTicketDto {
  @IsNotEmpty()
  @ApiProperty()
  movieId: number;

  @IsPositive()
  @ApiProperty()
  numberOfTicket: number;

  @IsNotEmpty()
  @ApiProperty()
  selectedDate: string;

  @IsNotEmpty()
  @ApiProperty()
  selectedTime: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsPhoneNumber()
  @ApiProperty()
  phoneNumber: string;
}
