import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaisannhadatidDetailComponent } from './taisannhadatid-detail.component';

describe('Taisannhadatid Management Detail Component', () => {
  let comp: TaisannhadatidDetailComponent;
  let fixture: ComponentFixture<TaisannhadatidDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaisannhadatidDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaisannhadatidDetailComponent,
              resolve: { taisannhadatid: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaisannhadatidDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisannhadatidDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taisannhadatid on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaisannhadatidDetailComponent);

      // THEN
      expect(instance.taisannhadatid()).toEqual(expect.objectContaining({ id: 123 }));
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
