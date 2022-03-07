import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalamanPaymentComponent } from './halaman-payment.component';

describe('HalamanPaymentComponent', () => {
  let component: HalamanPaymentComponent;
  let fixture: ComponentFixture<HalamanPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalamanPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalamanPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
