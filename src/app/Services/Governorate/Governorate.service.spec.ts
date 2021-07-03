/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GovernorateService } from './Governorate.service';

describe('Service: Governorate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GovernorateService]
    });
  });

  it('should ...', inject([GovernorateService], (service: GovernorateService) => {
    expect(service).toBeTruthy();
  }));
});
