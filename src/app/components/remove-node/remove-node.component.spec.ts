import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNodeComponent } from './remove-node.component';

describe('RemoveNodeComponent', () => {
  let component: RemoveNodeComponent;
  let fixture: ComponentFixture<RemoveNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveNodeComponent]
    });
    fixture = TestBed.createComponent(RemoveNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
