import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationNodeComponent } from './enumeration-node.component';

describe('EnumerationNodeComponent', () => {
  let component: EnumerationNodeComponent;
  let fixture: ComponentFixture<EnumerationNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnumerationNodeComponent]
    });
    fixture = TestBed.createComponent(EnumerationNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
