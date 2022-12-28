import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAllstartupsComponent } from './preview-allstartups.component';

describe('PreviewAllstartupsComponent', () => {
  let component: PreviewAllstartupsComponent;
  let fixture: ComponentFixture<PreviewAllstartupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAllstartupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewAllstartupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
