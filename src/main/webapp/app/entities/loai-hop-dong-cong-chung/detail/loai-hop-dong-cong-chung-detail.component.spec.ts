import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoaiHopDongCongChungDetailComponent } from './loai-hop-dong-cong-chung-detail.component';

describe('LoaiHopDongCongChung Management Detail Component', () => {
  let comp: LoaiHopDongCongChungDetailComponent;
  let fixture: ComponentFixture<LoaiHopDongCongChungDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaiHopDongCongChungDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LoaiHopDongCongChungDetailComponent,
              resolve: { loaiHopDongCongChung: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LoaiHopDongCongChungDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiHopDongCongChungDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load loaiHopDongCongChung on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LoaiHopDongCongChungDetailComponent);

      // THEN
      expect(instance.loaiHopDongCongChung()).toEqual(expect.objectContaining({ id: 123 }));
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
