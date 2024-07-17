import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiHopDongDetailComponent } from './danh-muc-loai-hop-dong-detail.component';

describe('DanhMucLoaiHopDong Management Detail Component', () => {
  let comp: DanhMucLoaiHopDongDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiHopDongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiHopDongDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucLoaiHopDongDetailComponent,
              resolve: { danhMucLoaiHopDong: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiHopDongDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiHopDongDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiHopDong on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiHopDongDetailComponent);

      // THEN
      expect(instance.danhMucLoaiHopDong()).toEqual(expect.objectContaining({ id: 123 }));
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
