/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PriceViewComponent } from './price-view.component';

describe('PriceViewComponent', () => {
  let component: PriceViewComponent;
  let fixture: ComponentFixture<PriceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
