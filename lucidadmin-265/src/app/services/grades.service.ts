import { Injectable } from '@angular/core';
import {Grade} from './grade';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  grades: Grade[];
  API_ROUTE = '';
  constructor(private http: HttpClient) {
    this.grades = [];
  }
  getGrades(username: string, subject: string): Observable<Grade[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('username', username).append('subject', subject);
    return this.http.get<Grade[]>(this.API_ROUTE + '/api/grades', { headers: headers, params: params });
  }
}
