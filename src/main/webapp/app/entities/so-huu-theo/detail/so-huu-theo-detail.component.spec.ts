import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SoHuuTheoDetailComponent } from './so-huu-theo-detail.component';

describe('SoHuuTheo Management Detail Component', () => {
  let comp: SoHuuTheoDetailComponent;
  let fixture: ComponentFixture<SoHuuTheoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoHuuTheoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SoHuuTheoDetailComponent,
              resolve: { soHuuTheo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SoHuuTheoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoHuuTheoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soHuuTheo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SoHuuTheoDetailComponent);

      // THEN
      expect(instance.soHuuTheo()).toEqual(expect.objectContaining({ id: 123 }));
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
