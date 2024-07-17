import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaiSanDatNhaDetailComponent } from './tai-san-dat-nha-detail.component';

describe('TaiSanDatNha Management Detail Component', () => {
  let comp: TaiSanDatNhaDetailComponent;
  let fixture: ComponentFixture<TaiSanDatNhaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaiSanDatNhaDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaiSanDatNhaDetailComponent,
              resolve: { taiSanDatNha: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaiSanDatNhaDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiSanDatNhaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taiSanDatNha on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaiSanDatNhaDetailComponent);

      // THEN
      expect(instance.taiSanDatNha()).toEqual(expect.objectContaining({ id: 123 }));
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
