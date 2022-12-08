import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProductsComponent } from './preview-products.component';

describe('PreviewProductsComponent', () => {
  let component: PreviewProductsComponent;
  let fixture: ComponentFixture<PreviewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
