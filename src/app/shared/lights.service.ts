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

  getLight( light: any ) {
    return this.http.get(`/api/lights/${light.id}`)
      .map(res => res.json());
  }

  turnOnLight( light: any ) {
    return this.http.get(`/api/lights/${light.id}/on`)
      .map(res => res.json());
  }

  turnOffLight( light: any ) {
    return this.http.get(`/api/lights/${light.id}/off`)
      .map(res => res.json());
  }

  setBri( light: any, bri: number ) {
    return this.http.get(`/api/lights/${light.id}/bri/${bri}`)
      .map(res => res.json());
  }

}
