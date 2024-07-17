import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TinhTrangDuongSuDetailComponent } from './tinh-trang-duong-su-detail.component';

describe('TinhTrangDuongSu Management Detail Component', () => {
  let comp: TinhTrangDuongSuDetailComponent;
  let fixture: ComponentFixture<TinhTrangDuongSuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinhTrangDuongSuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TinhTrangDuongSuDetailComponent,
              resolve: { tinhTrangDuongSu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TinhTrangDuongSuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhTrangDuongSuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tinhTrangDuongSu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TinhTrangDuongSuDetailComponent);

      // THEN
      expect(instance.tinhTrangDuongSu()).toEqual(expect.objectContaining({ id: 123 }));
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
