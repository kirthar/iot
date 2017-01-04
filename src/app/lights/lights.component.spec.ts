/* tslint:disable:no-unused-variable */
import { spy, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LightsComponent } from './lights.component';
import {LightsService} from "../shared/lights.service";
import {MockLightsService} from "../shared/mocklights.service";
import {Light} from "./light.model";

describe('LightsComponent', () => {
  let component: LightsComponent;
  let fixture: ComponentFixture<LightsComponent>;
  let lightsService: LightsService;
  const testLights: Array<Light> = [
    {
      id: 1,
      name: 'Light 1',
      state: {
        hue: 1,
        sat: 1,
        bri: 1,
        xy: [1, 10]
      }
    },
    {
      id: 2,
      name: 'Light 2',
      state: {
        hue: 2,
        sat: 2,
        bri: 2,
        xy: [2, 20]
      }
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightsComponent ],
      providers:    [ LightsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    lightsService = fixture.debugElement.injector.get(LightsService);

    // Setup spy on the `getQuote` method
    spy = spyOn(lightsService, 'getAllLights')
      .and.returnValue(Promise.resolve(testLights));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
