import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaisanSaiDgcDetailComponent } from './taisan-sai-dgc-detail.component';

describe('TaisanSaiDgc Management Detail Component', () => {
  let comp: TaisanSaiDgcDetailComponent;
  let fixture: ComponentFixture<TaisanSaiDgcDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaisanSaiDgcDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaisanSaiDgcDetailComponent,
              resolve: { taisanSaiDgc: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaisanSaiDgcDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisanSaiDgcDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taisanSaiDgc on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaisanSaiDgcDetailComponent);

      // THEN
      expect(instance.taisanSaiDgc()).toEqual(expect.objectContaining({ id: 123 }));
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
