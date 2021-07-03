/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PromotionService } from './Promotion.service';

describe('Service: Promotion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotionService]
    });
  });

  it('should ...', inject([PromotionService], (service: PromotionService) => {
    expect(service).toBeTruthy();
  }));
});
