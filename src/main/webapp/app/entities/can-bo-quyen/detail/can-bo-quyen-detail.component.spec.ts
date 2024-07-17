import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CanBoQuyenDetailComponent } from './can-bo-quyen-detail.component';

describe('CanBoQuyen Management Detail Component', () => {
  let comp: CanBoQuyenDetailComponent;
  let fixture: ComponentFixture<CanBoQuyenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanBoQuyenDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CanBoQuyenDetailComponent,
              resolve: { canBoQuyen: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CanBoQuyenDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanBoQuyenDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load canBoQuyen on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CanBoQuyenDetailComponent);

      // THEN
      expect(instance.canBoQuyen()).toEqual(expect.objectContaining({ id: 123 }));
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
