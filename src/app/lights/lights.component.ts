import { Component, Pipe, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LightsService } from '../lights.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {
  // instantiate lights to an empty array
     lights: any = [];

  constructor(private lightsService: LightsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.lightsService.getAllLights().subscribe(data => {
      this.lights = data.lights ;
    });
  }

  lightHslColor(light: any) {
    if (light.state.xy !== undefined) {
      return this.sanitizer.bypassSecurityTrustStyle("background-color: #" + xyBriToRgb(light.state.xy[0], light.state.xy[1], light.state.bri));
    }
    return;
  }

  turnOnLight(light: any){
    console.log("TURN ON", light);
    this.lightsService.turnOnLight(light).subscribe(data => {
      console.log(data);
    });
  }

  turnOffLight(light: any) {
    console.log("OFF TURN");
    this.lightsService.turnOffLight(light).subscribe(data => {
      console.log(data);
    });
  }
}

function rgbToHex(red, green, blue, alpha) {
  const isPercent = (red + (alpha || '')).toString().includes('%');

  if (typeof red === 'string') {
    const res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
    // TODO: use destructuring when targeting Node.js 6
    red = res[0];
    green = res[1];
    blue = res[2];
    alpha = res[3];
  } else if (alpha !== undefined) {
    alpha = parseFloat(alpha);
  }

  if (typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    red > 255 ||
    green > 255 ||
    blue > 255) {
    throw new TypeError('Expected three numbers below 256');
  }

  if (typeof alpha === 'number') {
    if (!isPercent && alpha >= 0 && alpha <= 1) {
      alpha = Math.round(255 * alpha);
    } else if (isPercent && alpha >= 0 && alpha <= 100) {
      alpha = Math.round(255 * alpha / 100);
    } else {
      throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
    }
    alpha = (alpha | 1 << 8).toString(16).slice(1);
  } else {
    alpha = '';
  }

  return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
}

function xyBriToRgb(x, y, bri){
  var z = 1.0 - x - y;
  var Y = bri / 255.0; // Brightness of lamp
  var X = (Y / y) * x;
  var Z = (Y / y) * z;
  var r = X * 1.612 - Y * 0.203 - Z * 0.302;
  var g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  var b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
  g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
  b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
  var maxValue = Math.max(r,g,b);
  r /= maxValue;
  g /= maxValue;
  b /= maxValue;
  r = r * 255;   if (r < 0) { r = 255 };
  g = g * 255;   if (g < 0) { g = 255 };
  b = b * 255;   if (b < 0) { b = 255 };

  return rgbToHex(r, g, b, undefined);
}



