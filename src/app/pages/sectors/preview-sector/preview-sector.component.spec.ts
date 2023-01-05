import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSectorComponent } from './preview-sector.component';

describe('PreviewSectorComponent', () => {
  let component: PreviewSectorComponent;
  let fixture: ComponentFixture<PreviewSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
