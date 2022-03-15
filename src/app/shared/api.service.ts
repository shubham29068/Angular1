import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  // here will be define post get put delete 
  postRestaurant(data: any) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
      return res;
    }))
  }
  getRestaurant(data: any) {
    return this._http.get<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
      return res;
    }))
  }
  updateRestaurant(data: any, id: number) {
    return this._http.put<any>("http://localhost:3000/posts" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  deleteRestaurant(id: number) {
    return this._http.delete<any>("http://localhost:3000/posts"+id).pipe(map((res: any) => {
      return res;
    }))
  }
}
