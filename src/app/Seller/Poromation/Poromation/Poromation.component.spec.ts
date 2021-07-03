/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PoromationComponent } from './Poromation.component';

describe('PoromationComponent', () => {
  let component: PoromationComponent;
  let fixture: ComponentFixture<PoromationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoromationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoromationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
