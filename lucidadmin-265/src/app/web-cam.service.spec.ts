import { TestBed } from '@angular/core/testing';

import { WebCamService } from './web-cam.service';

describe('WebCamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebCamService = TestBed.get(WebCamService);
    expect(service).toBeTruthy();
  });
});
