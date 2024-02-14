import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMainTableComponent } from './products-main-table.component';

describe('ProductsMainTableComponent', () => {
  let component: ProductsMainTableComponent;
  let fixture: ComponentFixture<ProductsMainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsMainTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
