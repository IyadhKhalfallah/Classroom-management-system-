import { TestBed } from '@angular/core/testing';

import { WebCamServiceService } from './web-cam-service.service';

describe('WebCamServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebCamServiceService = TestBed.get(WebCamServiceService);
    expect(service).toBeTruthy();
  });
});
