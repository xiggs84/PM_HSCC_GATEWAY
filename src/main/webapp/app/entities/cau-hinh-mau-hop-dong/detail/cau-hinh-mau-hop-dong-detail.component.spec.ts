import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CauHinhMauHopDongDetailComponent } from './cau-hinh-mau-hop-dong-detail.component';

describe('CauHinhMauHopDong Management Detail Component', () => {
  let comp: CauHinhMauHopDongDetailComponent;
  let fixture: ComponentFixture<CauHinhMauHopDongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauHinhMauHopDongDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CauHinhMauHopDongDetailComponent,
              resolve: { cauHinhMauHopDong: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CauHinhMauHopDongDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhMauHopDongDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cauHinhMauHopDong on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CauHinhMauHopDongDetailComponent);

      // THEN
      expect(instance.cauHinhMauHopDong()).toEqual(expect.objectContaining({ id: 123 }));
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
