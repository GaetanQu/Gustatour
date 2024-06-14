import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {
  private readonly apiKey: string = "4913b636a19f2e96105dcc5b98888b03";
  apiUrl: string = "https://api.imgbb.com/1/upload"

  constructor(
    private http: HttpClient
  ) {}

  public uploadImage(image: any, name: string) {
    const formData = new FormData();

    formData.append("image", image);

    return this.http.post('/image/upload', formData, { params: {key: this.apiKey, name: name}}).pipe(take(1)).subscribe();
  }
}
