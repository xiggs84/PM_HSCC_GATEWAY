import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ThongTinChungHopDongDetailComponent } from './thong-tin-chung-hop-dong-detail.component';

describe('ThongTinChungHopDong Management Detail Component', () => {
  let comp: ThongTinChungHopDongDetailComponent;
  let fixture: ComponentFixture<ThongTinChungHopDongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongTinChungHopDongDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ThongTinChungHopDongDetailComponent,
              resolve: { thongTinChungHopDong: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ThongTinChungHopDongDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinChungHopDongDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load thongTinChungHopDong on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ThongTinChungHopDongDetailComponent);

      // THEN
      expect(instance.thongTinChungHopDong()).toEqual(expect.objectContaining({ id: 123 }));
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
