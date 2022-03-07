import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenPenjualanComponent } from './manajemen-penjualan.component';

describe('ManajemenPenjualanComponent', () => {
  let component: ManajemenPenjualanComponent;
  let fixture: ComponentFixture<ManajemenPenjualanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManajemenPenjualanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
