import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DuongSuTrungCmndDetailComponent } from './duong-su-trung-cmnd-detail.component';

describe('DuongSuTrungCmnd Management Detail Component', () => {
  let comp: DuongSuTrungCmndDetailComponent;
  let fixture: ComponentFixture<DuongSuTrungCmndDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuongSuTrungCmndDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DuongSuTrungCmndDetailComponent,
              resolve: { duongSuTrungCmnd: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DuongSuTrungCmndDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuongSuTrungCmndDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load duongSuTrungCmnd on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DuongSuTrungCmndDetailComponent);

      // THEN
      expect(instance.duongSuTrungCmnd()).toEqual(expect.objectContaining({ id: 123 }));
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
