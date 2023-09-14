import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenboxComponent } from './screenbox.component';

describe('ScreenboxComponent', () => {
  let component: ScreenboxComponent;
  let fixture: ComponentFixture<ScreenboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenboxComponent]
    });
    fixture = TestBed.createComponent(ScreenboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
