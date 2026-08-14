import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeoutInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(200),
      catchError((error: unknown) => {
        if (error instanceof TimeoutError) {
          this.logger.warn(
            `${context.getHandler().name} не відповів за 200 мс`,
          );
          return throwError(
            () => new RequestTimeoutException('Сервер не встиг обробити запит'),
          );
        }

        this.logger.error(`${context.getHandler().name} завершився помилкою`);
        return throwError(() => error);
      }),
    );
  }
}
