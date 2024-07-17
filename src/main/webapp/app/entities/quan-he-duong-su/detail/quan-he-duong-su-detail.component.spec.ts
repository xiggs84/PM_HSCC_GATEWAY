import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuanHeDuongSuDetailComponent } from './quan-he-duong-su-detail.component';

describe('QuanHeDuongSu Management Detail Component', () => {
  let comp: QuanHeDuongSuDetailComponent;
  let fixture: ComponentFixture<QuanHeDuongSuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanHeDuongSuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: QuanHeDuongSuDetailComponent,
              resolve: { quanHeDuongSu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(QuanHeDuongSuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanHeDuongSuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quanHeDuongSu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', QuanHeDuongSuDetailComponent);

      // THEN
      expect(instance.quanHeDuongSu()).toEqual(expect.objectContaining({ id: 123 }));
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
