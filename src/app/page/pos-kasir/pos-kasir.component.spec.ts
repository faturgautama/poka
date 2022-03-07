import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosKasirComponent } from './pos-kasir.component';

describe('PosKasirComponent', () => {
  let component: PosKasirComponent;
  let fixture: ComponentFixture<PosKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosKasirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
