import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyDataPageComponent } from './dummy-data-page.component';

describe('DummyDataPageComponent', () => {
  let component: DummyDataPageComponent;
  let fixture: ComponentFixture<DummyDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyDataPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
