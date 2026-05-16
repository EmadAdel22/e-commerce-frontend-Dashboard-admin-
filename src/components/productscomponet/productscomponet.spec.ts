import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productscomponet } from './productscomponet';

describe('Productscomponet', () => {
  let component: Productscomponet;
  let fixture: ComponentFixture<Productscomponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productscomponet],
    }).compileComponents();

    fixture = TestBed.createComponent(Productscomponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
