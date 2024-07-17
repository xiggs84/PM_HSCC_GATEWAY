import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucTheHtmlDetailComponent } from './danh-muc-the-html-detail.component';

describe('DanhMucTheHtml Management Detail Component', () => {
  let comp: DanhMucTheHtmlDetailComponent;
  let fixture: ComponentFixture<DanhMucTheHtmlDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucTheHtmlDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucTheHtmlDetailComponent,
              resolve: { danhMucTheHtml: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucTheHtmlDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucTheHtmlDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucTheHtml on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucTheHtmlDetailComponent);

      // THEN
      expect(instance.danhMucTheHtml()).toEqual(expect.objectContaining({ id: 123 }));
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
