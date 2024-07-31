import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://127.0.0.1:8000/api/restaurants/';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRestaurantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createRestaurant(restaurantData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, restaurantData);
  }

  updateRestaurant(id: number, restaurantData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, restaurantData);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
