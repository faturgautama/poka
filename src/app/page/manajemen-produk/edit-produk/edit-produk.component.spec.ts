import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdukComponent } from './edit-produk.component';

describe('EditProdukComponent', () => {
  let component: EditProdukComponent;
  let fixture: ComponentFixture<EditProdukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProdukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
