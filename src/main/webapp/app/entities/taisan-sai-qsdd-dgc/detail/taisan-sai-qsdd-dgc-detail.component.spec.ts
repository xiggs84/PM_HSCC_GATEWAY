import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaisanSaiQsddDgcDetailComponent } from './taisan-sai-qsdd-dgc-detail.component';

describe('TaisanSaiQsddDgc Management Detail Component', () => {
  let comp: TaisanSaiQsddDgcDetailComponent;
  let fixture: ComponentFixture<TaisanSaiQsddDgcDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaisanSaiQsddDgcDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaisanSaiQsddDgcDetailComponent,
              resolve: { taisanSaiQsddDgc: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaisanSaiQsddDgcDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisanSaiQsddDgcDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taisanSaiQsddDgc on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaisanSaiQsddDgcDetailComponent);

      // THEN
      expect(instance.taisanSaiQsddDgc()).toEqual(expect.objectContaining({ id: 123 }));
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
