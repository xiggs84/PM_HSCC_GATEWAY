import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogThaoTacDetailComponent } from './log-thao-tac-detail.component';

describe('LogThaoTac Management Detail Component', () => {
  let comp: LogThaoTacDetailComponent;
  let fixture: ComponentFixture<LogThaoTacDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogThaoTacDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogThaoTacDetailComponent,
              resolve: { logThaoTac: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogThaoTacDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogThaoTacDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logThaoTac on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogThaoTacDetailComponent);

      // THEN
      expect(instance.logThaoTac()).toEqual(expect.objectContaining({ id: 123 }));
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
