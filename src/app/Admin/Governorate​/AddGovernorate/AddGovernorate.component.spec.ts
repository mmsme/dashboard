/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddGovernorateComponent } from './AddGovernorate.component';

describe('AddGovernorateComponent', () => {
  let component: AddGovernorateComponent;
  let fixture: ComponentFixture<AddGovernorateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGovernorateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGovernorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
