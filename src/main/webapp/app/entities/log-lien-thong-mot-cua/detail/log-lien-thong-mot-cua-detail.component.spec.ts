import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogLienThongMotCuaDetailComponent } from './log-lien-thong-mot-cua-detail.component';

describe('LogLienThongMotCua Management Detail Component', () => {
  let comp: LogLienThongMotCuaDetailComponent;
  let fixture: ComponentFixture<LogLienThongMotCuaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogLienThongMotCuaDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogLienThongMotCuaDetailComponent,
              resolve: { logLienThongMotCua: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogLienThongMotCuaDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogLienThongMotCuaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logLienThongMotCua on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogLienThongMotCuaDetailComponent);

      // THEN
      expect(instance.logLienThongMotCua()).toEqual(expect.objectContaining({ id: 123 }));
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
