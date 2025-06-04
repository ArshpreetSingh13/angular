import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelecomComponent } from './welecom.component';

describe('WelecomComponent', () => {
  let component: WelecomComponent;
  let fixture: ComponentFixture<WelecomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelecomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
