import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  data: T;
  status: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data = {}) => {
        const { message, ...rest } = data;
        return {
          status: data.status ?? 'success',
          data: !!Object.keys(rest).length?rest:null,
          ...(message ? { message } : {}),
        };
      }),
    );
  }
}
