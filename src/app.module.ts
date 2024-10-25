import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { catchError, retry } from 'rxjs';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor( readonly http: HttpService) {
    http.get('http://foo.bar', { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((e): never => {
        console.log(e.code);
        throw e;
      }),
      retry(1)
    ).subscribe({
      error: () => undefined
    })
  }
}
