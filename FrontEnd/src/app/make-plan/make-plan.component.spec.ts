import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePlanComponent } from './make-plan.component';

describe('MakePlanComponent', () => {
  let component: MakePlanComponent;
  let fixture: ComponentFixture<MakePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
