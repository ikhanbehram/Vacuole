import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismsCardsComponent } from './organisms-cards.component';

describe('OrganismsCardsComponent', () => {
  let component: OrganismsCardsComponent;
  let fixture: ComponentFixture<OrganismsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismsCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
