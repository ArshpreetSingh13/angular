import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Porfolio } from './porfolio';

describe('Porfolio', () => {
  let component: Porfolio;
  let fixture: ComponentFixture<Porfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Porfolio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Porfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
