/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import {Http, BaseRequestOptions} from '@angular/http';
import { LightsService } from './lights.service';
import { Light } from '../light/light.model';
import { MockLightsService } from './mocklights.service';
import { MockBackend } from "@angular/http/testing";

describe('LightsService', () => {
  // const testLights: Array<Light> = [
  //   {
  //     id: 1,
  //     name: 'Light 1',
  //     state: {
  //       hue: 1,
  //       sat: 1,
  //       bri: 1,
  //       xy: [1, 10]
  //     }
  //   },
  //   {
  //     id: 2,
  //     name: 'Light 2',
  //     state: {
  //       hue: 2,
  //       sat: 2,
  //       bri: 2,
  //       xy: [2, 20]
  //     }
  //   }
  // ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        LightsService
      ]
    });
  });

  it('should ...', inject([LightsService], (service: LightsService) => {
    expect(service).toBeTruthy();
  }));
});
