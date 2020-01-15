import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileDocument} from './filedocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  API_ROUTE = 'http://127.0.0.1:8000';
  fileDocuments: FileDocument[];
  constructor(private http: HttpClient) {
    this.fileDocuments = [];
  }

  getCourses(name: String, type: String, subject: String): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    //const params = new HttpParams().append('key', 'value');
    return this.http.get<FileDocument[]>(this.API_ROUTE + '/api/courses');
  }

  postCourse(fileDocument: FileDocument){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    var formData: any = new FormData();
    formData.append("name", fileDocument.name)
    formData.append("type", fileDocument.type,)
    formData.append("user_id", fileDocument.creatorUserId)
    formData.append("link", fileDocument.link)
    formData.append("subject", fileDocument.subject)
    formData.append("description", "test")

    return this.http.post(this.API_ROUTE + '/api/courses', formData );
    
  }

  deleteCourse(fileDocument: FileDocument): Observable<FileDocument[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    this.http.delete(this.API_ROUTE + '/api/courses/' + fileDocument.id, { headers: headers });
    return this.getCourses('', 'All' , 'All');
  }




}
