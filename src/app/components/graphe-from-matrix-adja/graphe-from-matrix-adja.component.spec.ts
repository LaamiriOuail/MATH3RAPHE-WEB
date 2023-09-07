import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapheFromMatrixAdjaComponent } from './graphe-from-matrix-adja.component';

describe('GrapheFromMatrixAdjaComponent', () => {
  let component: GrapheFromMatrixAdjaComponent;
  let fixture: ComponentFixture<GrapheFromMatrixAdjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrapheFromMatrixAdjaComponent]
    });
    fixture = TestBed.createComponent(GrapheFromMatrixAdjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
