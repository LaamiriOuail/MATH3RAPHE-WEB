import { TestBed } from '@angular/core/testing';

import { GrapheService } from './graphe.service';

describe('GrapheService', () => {
  let service: GrapheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrapheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
