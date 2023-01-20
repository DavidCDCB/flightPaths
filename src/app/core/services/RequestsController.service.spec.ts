/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestsControllerService } from './RequestsController.service';

describe('Service: RequestsController', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestsControllerService]
    });
  });

  it('should ...', inject([RequestsControllerService], (service: RequestsControllerService) => {
    expect(service).toBeTruthy();
  }));
});
