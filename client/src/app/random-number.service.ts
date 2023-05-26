import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { RandomData, RandomResponse } from "./models";
import { Observable, Subject, map, tap } from "rxjs";

const URL_API_RANDOM = 'http://localhost:8080/api/random'

@Injectable()
export class RandomService {

    onRequest = new Subject<RandomResponse>()
    
    http = inject(HttpClient)

    // default count = 1
    getRandomNumbers(count = 1): Observable<number[]> {
        const qs = new HttpParams()
            .set('count', count)

        // URL = http://localhost.8080/api/random?count=1
        return this.http.get<RandomResponse>(URL_API_RANDOM, {params: qs})
            .pipe(
                // pass the RandomResponse obj to onRequest
                tap(resp => this.onRequest.next(resp)),
                // returns the number[] from RandomResponse obj
                map(resp => resp.numbers)
            )
    }

    postRandomNumbersAsJson(data: RandomData): Observable<number[]> {
        // content-type: application/json
        // accepts: application/json
        return this.http.post<RandomResponse>(URL_API_RANDOM, data) // data in body
            .pipe(
                tap(resp => this.onRequest.next(resp)),
                map(resp => resp.numbers)
            )
    }

    postRandomNumbersAsForm(data: RandomData): Observable<number[]> {
        // content-type: application/x-www-form-urlencoded
        // accepts: application/json

        // form.toString() => min=-100&max=10&count=10
        const form = new HttpParams()
            .set("min", data.min)
            .set("max", data.max)
            .set("count", data.count)

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')

        // because headers is named 'headers', don't need to type { headers: headers }
        return this.http.post<RandomResponse>(URL_API_RANDOM, form.toString(), {headers})
            .pipe(
                tap(resp => this.onRequest.next(resp)),
                map(resp => resp.numbers)
            ) 
    }
}