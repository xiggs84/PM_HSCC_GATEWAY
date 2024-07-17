import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucNhomHopDongDetailComponent } from './danh-muc-nhom-hop-dong-detail.component';

describe('DanhMucNhomHopDong Management Detail Component', () => {
  let comp: DanhMucNhomHopDongDetailComponent;
  let fixture: ComponentFixture<DanhMucNhomHopDongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucNhomHopDongDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucNhomHopDongDetailComponent,
              resolve: { danhMucNhomHopDong: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucNhomHopDongDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucNhomHopDongDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucNhomHopDong on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucNhomHopDongDetailComponent);

      // THEN
      expect(instance.danhMucNhomHopDong()).toEqual(expect.objectContaining({ id: 123 }));
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
