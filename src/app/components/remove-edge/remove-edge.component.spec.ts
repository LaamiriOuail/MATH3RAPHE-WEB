import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveEdgeComponent } from './remove-edge.component';

describe('RemoveEdgeComponent', () => {
  let component: RemoveEdgeComponent;
  let fixture: ComponentFixture<RemoveEdgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveEdgeComponent]
    });
    fixture = TestBed.createComponent(RemoveEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
