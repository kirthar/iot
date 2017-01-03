import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LightsService {

  constructor(private http: Http) { }

  getAllLights() {
    return this.http.get('/api/lights')
        .map(res => res.json());
  }

  turnOnLight( light: any ) {
    console.log('SERVICE ON', light);
    return this.http.get('/api/on/' + light.id)
      .map(res => console.log('LIGHT TURNED ON'));
  }

  turnOffLight( light: any ) {
    return this.http.get('/api/off/' + light.id)
      .map(res => console.log('OFF TURNED LIGHT'));
  }

}
