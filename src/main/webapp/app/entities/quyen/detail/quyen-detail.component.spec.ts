import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuyenDetailComponent } from './quyen-detail.component';

describe('Quyen Management Detail Component', () => {
  let comp: QuyenDetailComponent;
  let fixture: ComponentFixture<QuyenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuyenDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: QuyenDetailComponent,
              resolve: { quyen: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(QuyenDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyenDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quyen on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', QuyenDetailComponent);

      // THEN
      expect(instance.quyen()).toEqual(expect.objectContaining({ id: 123 }));
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
