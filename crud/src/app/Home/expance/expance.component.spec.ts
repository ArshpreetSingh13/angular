import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpanceComponent } from './expance.component';

describe('ExpanceComponent', () => {
  let component: ExpanceComponent;
  let fixture: ComponentFixture<ExpanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
