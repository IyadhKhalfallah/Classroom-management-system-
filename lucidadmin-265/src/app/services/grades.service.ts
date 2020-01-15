import { Injectable } from '@angular/core';
import {Grade} from './grade';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GradeSubmit} from "./gradesubmit";

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
    return this.http.get<Grade[]>(this.API_ROUTE + '/api/grade');
  }
  postGrades(gradeSubmits: GradeSubmit[]) {
    return this.http.post(this.API_ROUTE + '/api/grade', JSON.stringify(gradeSubmits));
  }
}
