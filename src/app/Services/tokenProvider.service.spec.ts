/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenProviderService } from './tokenProvider.service';

describe('Service: TokenProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenProviderService]
    });
  });

  it('should ...', inject([TokenProviderService], (service: TokenProviderService) => {
    expect(service).toBeTruthy();
  }));
});
