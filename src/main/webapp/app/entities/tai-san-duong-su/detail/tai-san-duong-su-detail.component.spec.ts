import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaiSanDuongSuDetailComponent } from './tai-san-duong-su-detail.component';

describe('TaiSanDuongSu Management Detail Component', () => {
  let comp: TaiSanDuongSuDetailComponent;
  let fixture: ComponentFixture<TaiSanDuongSuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaiSanDuongSuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaiSanDuongSuDetailComponent,
              resolve: { taiSanDuongSu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaiSanDuongSuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiSanDuongSuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taiSanDuongSu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaiSanDuongSuDetailComponent);

      // THEN
      expect(instance.taiSanDuongSu()).toEqual(expect.objectContaining({ id: 123 }));
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
