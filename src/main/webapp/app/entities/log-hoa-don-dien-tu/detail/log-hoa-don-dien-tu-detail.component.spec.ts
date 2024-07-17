import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogHoaDonDienTuDetailComponent } from './log-hoa-don-dien-tu-detail.component';

describe('LogHoaDonDienTu Management Detail Component', () => {
  let comp: LogHoaDonDienTuDetailComponent;
  let fixture: ComponentFixture<LogHoaDonDienTuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogHoaDonDienTuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogHoaDonDienTuDetailComponent,
              resolve: { logHoaDonDienTu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogHoaDonDienTuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogHoaDonDienTuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logHoaDonDienTu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogHoaDonDienTuDetailComponent);

      // THEN
      expect(instance.logHoaDonDienTu()).toEqual(expect.objectContaining({ id: 123 }));
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
