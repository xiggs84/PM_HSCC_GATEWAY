import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucTuVietTatDetailComponent } from './danh-muc-tu-viet-tat-detail.component';

describe('DanhMucTuVietTat Management Detail Component', () => {
  let comp: DanhMucTuVietTatDetailComponent;
  let fixture: ComponentFixture<DanhMucTuVietTatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucTuVietTatDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucTuVietTatDetailComponent,
              resolve: { danhMucTuVietTat: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucTuVietTatDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucTuVietTatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucTuVietTat on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucTuVietTatDetailComponent);

      // THEN
      expect(instance.danhMucTuVietTat()).toEqual(expect.objectContaining({ id: 123 }));
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
