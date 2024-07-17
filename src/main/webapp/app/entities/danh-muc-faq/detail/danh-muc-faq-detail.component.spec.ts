import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucFaqDetailComponent } from './danh-muc-faq-detail.component';

describe('DanhMucFaq Management Detail Component', () => {
  let comp: DanhMucFaqDetailComponent;
  let fixture: ComponentFixture<DanhMucFaqDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucFaqDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucFaqDetailComponent,
              resolve: { danhMucFaq: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucFaqDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucFaqDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucFaq on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucFaqDetailComponent);

      // THEN
      expect(instance.danhMucFaq()).toEqual(expect.objectContaining({ id: 123 }));
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
