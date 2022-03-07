import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FirebaseApp } from 'angularfire2';

@Injectable({
    providedIn: 'root'
})
export class GetMenuService {

    private httpHeaders: any;

    constructor(private httpClient: HttpClient) {
        this.httpHeaders = new HttpHeaders();
        this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
    }

    defaultGetRequest(url: string) {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'json');

        return this.httpClient.get<any>(
            `${environment.urlFirebase}` + url,
            {
                params: searchParams
            }
        ).pipe(
            catchError(this.handleError),
            map((result: { [key: string]: any }) => {
                // console.log(result);

                let data = [];

                for (const key in result) {
                    if (result.hasOwnProperty(key)) {
                        data.push({ ...result[key], id: key })
                    }
                }

                return data;
            })
        )
    }



    private handleError(httpErrorResponse: HttpErrorResponse) {
        let pesanError = "Oops... Error Occured";

        if (httpErrorResponse.error)
            return throwError(pesanError);
    }
} 
