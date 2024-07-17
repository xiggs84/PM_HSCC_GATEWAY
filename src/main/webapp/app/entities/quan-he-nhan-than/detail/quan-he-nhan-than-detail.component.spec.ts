import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuanHeNhanThanDetailComponent } from './quan-he-nhan-than-detail.component';

describe('QuanHeNhanThan Management Detail Component', () => {
  let comp: QuanHeNhanThanDetailComponent;
  let fixture: ComponentFixture<QuanHeNhanThanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanHeNhanThanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: QuanHeNhanThanDetailComponent,
              resolve: { quanHeNhanThan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(QuanHeNhanThanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanHeNhanThanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quanHeNhanThan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', QuanHeNhanThanDetailComponent);

      // THEN
      expect(instance.quanHeNhanThan()).toEqual(expect.objectContaining({ id: 123 }));
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
