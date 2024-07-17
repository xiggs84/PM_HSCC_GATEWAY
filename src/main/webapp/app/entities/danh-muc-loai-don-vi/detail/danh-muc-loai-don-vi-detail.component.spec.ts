import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiDonViDetailComponent } from './danh-muc-loai-don-vi-detail.component';

describe('DanhMucLoaiDonVi Management Detail Component', () => {
  let comp: DanhMucLoaiDonViDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiDonViDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiDonViDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucLoaiDonViDetailComponent,
              resolve: { danhMucLoaiDonVi: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiDonViDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiDonViDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiDonVi on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiDonViDetailComponent);

      // THEN
      expect(instance.danhMucLoaiDonVi()).toEqual(expect.objectContaining({ id: 123 }));
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
