import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogSearchDsTsDetailComponent } from './log-search-ds-ts-detail.component';

describe('LogSearchDsTs Management Detail Component', () => {
  let comp: LogSearchDsTsDetailComponent;
  let fixture: ComponentFixture<LogSearchDsTsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSearchDsTsDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogSearchDsTsDetailComponent,
              resolve: { logSearchDsTs: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogSearchDsTsDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSearchDsTsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logSearchDsTs on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogSearchDsTsDetailComponent);

      // THEN
      expect(instance.logSearchDsTs()).toEqual(expect.objectContaining({ id: 123 }));
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
