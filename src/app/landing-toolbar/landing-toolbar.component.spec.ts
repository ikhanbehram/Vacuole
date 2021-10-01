import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingToolbarComponent } from './landing-toolbar.component';

describe('LandingToolbarComponent', () => {
  let component: LandingToolbarComponent;
  let fixture: ComponentFixture<LandingToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
