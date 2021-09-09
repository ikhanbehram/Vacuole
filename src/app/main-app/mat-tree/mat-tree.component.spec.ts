import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTreeComponent } from './mat-tree.component';

describe('MatTreeComponent', () => {
  let component: MatTreeComponent;
  let fixture: ComponentFixture<MatTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
