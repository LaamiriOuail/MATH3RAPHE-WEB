import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSizeScreenComponent } from './change-size-screen.component';

describe('ChangeSizeScreenComponent', () => {
  let component: ChangeSizeScreenComponent;
  let fixture: ComponentFixture<ChangeSizeScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeSizeScreenComponent]
    });
    fixture = TestBed.createComponent(ChangeSizeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
