import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayMethodComponent } from './array-method.component';

describe('ArrayMethodComponent', () => {
  let component: ArrayMethodComponent;
  let fixture: ComponentFixture<ArrayMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
