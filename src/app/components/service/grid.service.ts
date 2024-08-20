import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>("https://www.ag-grid.com/example-assets/olympic-winners.json");
  }
}
