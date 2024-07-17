import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogDangNhapDetailComponent } from './log-dang-nhap-detail.component';

describe('LogDangNhap Management Detail Component', () => {
  let comp: LogDangNhapDetailComponent;
  let fixture: ComponentFixture<LogDangNhapDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogDangNhapDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogDangNhapDetailComponent,
              resolve: { logDangNhap: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogDangNhapDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDangNhapDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logDangNhap on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogDangNhapDetailComponent);

      // THEN
      expect(instance.logDangNhap()).toEqual(expect.objectContaining({ id: 123 }));
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
