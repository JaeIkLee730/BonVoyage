import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeWishComponent } from './make-wish.component';

describe('MakeWishComponent', () => {
  let component: MakeWishComponent;
  let fixture: ComponentFixture<MakeWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
