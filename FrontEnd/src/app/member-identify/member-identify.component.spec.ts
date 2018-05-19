import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberIdentifyComponent } from './member-identify.component';

describe('MemberIdentifyComponent', () => {
  let component: MemberIdentifyComponent;
  let fixture: ComponentFixture<MemberIdentifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberIdentifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberIdentifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
