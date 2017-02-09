import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {Light} from "./light.model";
import {LightsService} from "../shared/lights.service";

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent {

  @Input() light: Light;
  constructor(private lightsService: LightsService, private sanitizer: DomSanitizer) { }

  lightColor() {
    if (this.light.state.rgb !== undefined) {
      return this.sanitizer.bypassSecurityTrustStyle("background-color: #" + rgbToHex(this.light.state.rgb[0], this.light.state.rgb[1], this.light.state.rgb[2], 1));
    }
    else if(this.light.state.colormode === 'ct') {
      let rgb = colorTemperature2rgb(this.light.state.ct);
      return this.sanitizer.bypassSecurityTrustStyle("background-color: #" + rgbToHex(rgb.red, rgb.green, rgb.blue, 1));
    }
    else if (this.light.state.xy !== undefined) {
      return this.sanitizer.bypassSecurityTrustStyle("background-color: #" + xyBriToRgb(this.light.state.xy[0], this.light.state.xy[1], this.light.state.bri));
    }
    return;
  }

  turnOnLight(){
    this.lightsService.turnOnLight(this.light).subscribe(data => {
        this.light.state = data['state'];
    });
  };

  turnOffLight() {
    this.lightsService.turnOffLight(this.light).subscribe(data => {
        this.light.state = data['state'];
    });
  };

  setBri(bri) {
    console.log(bri);
    this.lightsService.setBri(this.light, bri).subscribe(data => {
      this.light.state = data['state'];
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

function colorTemperature2rgb (kelvin) {

  var temperature = kelvin / 100.0;
  var red, green, blue;

  if (temperature < 66.0) {
    red = 255;
  } else {
    // a + b x + c Log[x] /.
    // {a -> 351.97690566805693`,
    // b -> 0.114206453784165`,
    // c -> -40.25366309332127
    //x -> (kelvin/100) - 55}
    red = temperature - 55.0;
    red = 351.97690566805693+ 0.114206453784165 * red - 40.25366309332127 * Math.log(red);
    if (red < 0) red = 0;
    if (red > 255) red = 255;
  }

  /* Calculate green */

  if (temperature < 66.0) {

    // a + b x + c Log[x] /.
    // {a -> -155.25485562709179`,
    // b -> -0.44596950469579133`,
    // c -> 104.49216199393888`,
    // x -> (kelvin/100) - 2}
    green = temperature - 2;
    green = -155.25485562709179 - 0.44596950469579133 * green + 104.49216199393888 * Math.log(green);
    if (green < 0) green = 0;
    if (green > 255) green = 255;

  } else {

    // a + b x + c Log[x] /.
    // {a -> 325.4494125711974`,
    // b -> 0.07943456536662342`,
    // c -> -28.0852963507957`,
    // x -> (kelvin/100) - 50}
    green = temperature - 50.0;
    green = 325.4494125711974 + 0.07943456536662342 * green - 28.0852963507957 * Math.log(green);
    if (green < 0) green = 0;
    if (green > 255) green = 255;

  }

  /* Calculate blue */

  if (temperature >= 66.0) {
    blue = 255;
  } else {

    if (temperature <= 20.0) {
      blue = 0;
    } else {

      // a + b x + c Log[x] /.
      // {a -> -254.76935184120902`,
      // b -> 0.8274096064007395`,
      // c -> 115.67994401066147`,
      // x -> kelvin/100 - 10}
      blue = temperature - 10;
      blue = -254.76935184120902 + 0.8274096064007395 * blue + 115.67994401066147 * Math.log(blue);
      if (blue < 0) blue = 0;
      if (blue > 255) blue = 255;
    }
  }

  return {red: Math.round(red), blue: Math.round(blue), green: Math.round(green)};
}

