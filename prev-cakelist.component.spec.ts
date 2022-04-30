import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevCakelistComponent } from './prev-cakelist.component';

describe('PrevCakelistComponent', () => {
  let component: PrevCakelistComponent;
  let fixture: ComponentFixture<PrevCakelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevCakelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevCakelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
