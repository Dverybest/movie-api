import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('ping')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOkResponse({
    type:Object,
  })
  @ApiOperation({summary:'Test api'})
  getHello() {
    return this.appService.getHello();
  }
}
