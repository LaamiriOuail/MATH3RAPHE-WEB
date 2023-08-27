import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightedEdgeComponent } from './add-weighted-edge.component';

describe('AddWeightedEdgeComponent', () => {
  let component: AddWeightedEdgeComponent;
  let fixture: ComponentFixture<AddWeightedEdgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWeightedEdgeComponent]
    });
    fixture = TestBed.createComponent(AddWeightedEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
