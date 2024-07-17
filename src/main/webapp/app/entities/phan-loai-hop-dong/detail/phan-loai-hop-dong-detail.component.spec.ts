import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { PhanLoaiHopDongDetailComponent } from './phan-loai-hop-dong-detail.component';

describe('PhanLoaiHopDong Management Detail Component', () => {
  let comp: PhanLoaiHopDongDetailComponent;
  let fixture: ComponentFixture<PhanLoaiHopDongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhanLoaiHopDongDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: PhanLoaiHopDongDetailComponent,
              resolve: { phanLoaiHopDong: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(PhanLoaiHopDongDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanLoaiHopDongDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load phanLoaiHopDong on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', PhanLoaiHopDongDetailComponent);

      // THEN
      expect(instance.phanLoaiHopDong()).toEqual(expect.objectContaining({ id: 123 }));
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
