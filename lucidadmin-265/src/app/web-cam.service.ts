import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebCamService {
  API_ROUTE='http://0.0.0.0:5001'
  constructor(private http: HttpClient) { }
  checkPerson(title: string){
    var formData: any = new FormData();
    formData.append("title", title)

    return this.http.post(this.API_ROUTE + '/', formData );
    
  }
}
