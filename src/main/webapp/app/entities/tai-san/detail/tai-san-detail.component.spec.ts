import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaiSanDetailComponent } from './tai-san-detail.component';

describe('TaiSan Management Detail Component', () => {
  let comp: TaiSanDetailComponent;
  let fixture: ComponentFixture<TaiSanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaiSanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaiSanDetailComponent,
              resolve: { taiSan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaiSanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiSanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taiSan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaiSanDetailComponent);

      // THEN
      expect(instance.taiSan()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
