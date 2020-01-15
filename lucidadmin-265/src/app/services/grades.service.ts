import { Injectable } from '@angular/core';
import {Grade} from './grade';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  grades: Grade[];
  API_ROUTE = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {
    this.grades = [];
  }
  getGrades(): Observable<Grade[]> {
    const headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Credentials', 'true');

    return this.http.get<Grade[]>(this.API_ROUTE + '/api/grade');
  }
}
