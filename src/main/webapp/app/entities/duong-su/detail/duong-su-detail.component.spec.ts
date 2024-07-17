import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DuongSuDetailComponent } from './duong-su-detail.component';

describe('DuongSu Management Detail Component', () => {
  let comp: DuongSuDetailComponent;
  let fixture: ComponentFixture<DuongSuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuongSuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DuongSuDetailComponent,
              resolve: { duongSu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DuongSuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuongSuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load duongSu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DuongSuDetailComponent);

      // THEN
      expect(instance.duongSu()).toEqual(expect.objectContaining({ id: 123 }));
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
