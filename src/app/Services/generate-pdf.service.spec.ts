import { TestBed } from '@angular/core/testing';

import { GeneratePDFService } from './generate-pdf.service';

describe('GeneratePDFService', () => {
  let service: GeneratePDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratePDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
