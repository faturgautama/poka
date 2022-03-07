import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuatProdukComponent } from './buat-produk.component';

describe('BuatProdukComponent', () => {
  let component: BuatProdukComponent;
  let fixture: ComponentFixture<BuatProdukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuatProdukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuatProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
