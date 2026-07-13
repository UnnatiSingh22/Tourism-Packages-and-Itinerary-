import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: any;
  errors: any[];
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((response) => {
        let data = response;
        let pagination = {};
        let message = 'Operation completed';

        // Check if response contains nested pagination (e.g. from listing queries)
        if (response && typeof response === 'object' && 'data' in response && ('pagination' in response || 'meta' in response)) {
          data = response.data;
          pagination = response.pagination || response.meta || {};
          if (response.message) {
            message = response.message;
          }
        } else if (response && typeof response === 'object' && 'message' in response && 'data' in response) {
          data = response.data;
          message = response.message;
        }

        return {
          success: true,
          message,
          data: data === undefined ? {} : data,
          pagination,
          errors: [],
        };
      }),
    );
  }
}
