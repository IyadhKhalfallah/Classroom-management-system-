import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileDocument} from './filedocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  API_ROUTE = '';
  fileDocuments: FileDocument[];
  constructor(private http: HttpClient) {
    this.fileDocuments = [];
  }

  getCourses(name: String, type: String, subject: String): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('key', 'value');
    return this.http.get<FileDocument[]>(this.API_ROUTE + '/api/courses', { headers: headers, params: params });
  }

  postCourse(fileDocument: FileDocument): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const jsondoc = {
      'name': fileDocument.name,
      'type': fileDocument.type,
      'user-id': fileDocument.creatorUserId,
      'link': fileDocument.link,
      'subject': fileDocument.subject,
    };
    this.http.post(this.API_ROUTE + '/api/courses', jsondoc , { headers: headers });
    return this.getCourses('', 'All' , 'All');
  }

  deleteCourse(fileDocument: FileDocument): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    this.http.delete(this.API_ROUTE + '/api/courses/' + fileDocument.id, { headers: headers });
    return this.getCourses('', 'All' , 'All');
  }

  // TODO: Delete this
  tmpGet(): FileDocument[] {
    const a = [
      new FileDocument(0 , 'test', 'td', 'ai' , 'google.fr', 'alaa'),
    ];
    return a;
  }


}
