import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiDuongSuDetailComponent } from './danh-muc-loai-duong-su-detail.component';

describe('DanhMucLoaiDuongSu Management Detail Component', () => {
  let comp: DanhMucLoaiDuongSuDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiDuongSuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiDuongSuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucLoaiDuongSuDetailComponent,
              resolve: { danhMucLoaiDuongSu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiDuongSuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiDuongSuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiDuongSu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiDuongSuDetailComponent);

      // THEN
      expect(instance.danhMucLoaiDuongSu()).toEqual(expect.objectContaining({ id: 123 }));
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
