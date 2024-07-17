import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiGiayToDetailComponent } from './danh-muc-loai-giay-to-detail.component';

describe('DanhMucLoaiGiayTo Management Detail Component', () => {
  let comp: DanhMucLoaiGiayToDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiGiayToDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiGiayToDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucLoaiGiayToDetailComponent,
              resolve: { danhMucLoaiGiayTo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiGiayToDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiGiayToDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiGiayTo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiGiayToDetailComponent);

      // THEN
      expect(instance.danhMucLoaiGiayTo()).toEqual(expect.objectContaining({ id: 123 }));
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
