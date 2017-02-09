import { Component, Pipe, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LightsService } from '../shared/lights.service';
import { Light } from '../light/light.model';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {
  // instantiate lights to an empty array
  lights: Array<Light> = [];

  constructor(private lightsService: LightsService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.lightsService.getAllLights().subscribe(data => {
      this.lights = data.lights;
    });
  }

}
