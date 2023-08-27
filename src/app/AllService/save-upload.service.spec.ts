import { TestBed } from '@angular/core/testing';

import { SaveUploadService } from './save-upload.service';

describe('SaveUploadService', () => {
  let service: SaveUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
