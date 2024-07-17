import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaiSanDgcDetailComponent } from './tai-san-dgc-detail.component';

describe('TaiSanDgc Management Detail Component', () => {
  let comp: TaiSanDgcDetailComponent;
  let fixture: ComponentFixture<TaiSanDgcDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaiSanDgcDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaiSanDgcDetailComponent,
              resolve: { taiSanDgc: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaiSanDgcDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiSanDgcDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taiSanDgc on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaiSanDgcDetailComponent);

      // THEN
      expect(instance.taiSanDgc()).toEqual(expect.objectContaining({ id: 123 }));
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
