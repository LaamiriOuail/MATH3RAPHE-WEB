import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapheFromEdgesListComponent } from './graphe-from-edges-list.component';

describe('GrapheFromEdgesListComponent', () => {
  let component: GrapheFromEdgesListComponent;
  let fixture: ComponentFixture<GrapheFromEdgesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrapheFromEdgesListComponent]
    });
    fixture = TestBed.createComponent(GrapheFromEdgesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
