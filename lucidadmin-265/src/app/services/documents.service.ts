import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileDocument} from './document';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

const API_ROUTE = '';

export class DocumentsService {
  documents: FileDocument[];
  constructor(private http: HttpClient) {
    this.documents = [];
  }

  getCourses(name: String, type: String, subject: String): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('key', 'value');
    return this.http.get<FileDocument[]>(API_ROUTE + '/api/courses', { headers: headers, params: params });
  }

  postCourse(document: FileDocument): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const jsondoc = {
      'name': document.name,
      'type': document.type,
      'user-id': document.creatorUserId,
      'link': document.link,
      'subject': document.subject,
    };
    this.http.post(API_ROUTE + '/api/courses', jsondoc , { headers: headers });
    return this.getCourses('', 'All' , 'All');
  }

  deleteCourse(document: FileDocument): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    this.http.delete(API_ROUTE + '/api/courses/' + document.id, { headers: headers });
    return this.getCourses('', 'All' , 'All');
  }


}
