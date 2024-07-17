import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CauHinhHopDongDetailComponent } from './cau-hinh-hop-dong-detail.component';

describe('CauHinhHopDong Management Detail Component', () => {
  let comp: CauHinhHopDongDetailComponent;
  let fixture: ComponentFixture<CauHinhHopDongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauHinhHopDongDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CauHinhHopDongDetailComponent,
              resolve: { cauHinhHopDong: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CauHinhHopDongDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhHopDongDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cauHinhHopDong on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CauHinhHopDongDetailComponent);

      // THEN
      expect(instance.cauHinhHopDong()).toEqual(expect.objectContaining({ id: 123 }));
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
