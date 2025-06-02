import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GenaiService {


  constructor(private https: HttpClient) { }


  apiKey ="AIzaSyBZim5rpMLocgerxwFXMoDS0GE0HXMzbsw"
  url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

  generateContent(prompt: string) {


    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    
    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    return this.https.post<any>(this.url, body, { headers });  }

 
  
}


