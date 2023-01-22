/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PathTableComponent } from './path-table.component';

describe('PathTableComponent', () => {
  let component: PathTableComponent;
  let fixture: ComponentFixture<PathTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
