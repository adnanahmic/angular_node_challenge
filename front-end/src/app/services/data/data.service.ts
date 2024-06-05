import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://192.168.100.84:3000/api/v1/public';

  constructor(private http: HttpClient) {}

  // Method to get data
  getData(endpoint: string, params?: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, {
      headers: { params },
    });
  }

  // Method to post data
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data);
  }
}
