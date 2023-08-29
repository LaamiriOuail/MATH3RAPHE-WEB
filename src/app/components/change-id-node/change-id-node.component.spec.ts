import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIdNodeComponent } from './change-id-node.component';

describe('ChangeIdNodeComponent', () => {
  let component: ChangeIdNodeComponent;
  let fixture: ComponentFixture<ChangeIdNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeIdNodeComponent]
    });
    fixture = TestBed.createComponent(ChangeIdNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
