import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  API_ROUTE="http://127.0.0.1:8000";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    var formData: any = new FormData();
    formData.append("email", username)
    formData.append("password", password)
      return this.http.post<any>(this.API_ROUTE+`/api/login`, formData)
          .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  register(username: string, password: string,firstname: string ) {
    var formData: any = new FormData();
    formData.append("name", firstname)
    formData.append("email", username)
    formData.append("password", password)
    return this.http.post<any>(this.API_ROUTE+`/api/register`, formData)
        .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
}



}
