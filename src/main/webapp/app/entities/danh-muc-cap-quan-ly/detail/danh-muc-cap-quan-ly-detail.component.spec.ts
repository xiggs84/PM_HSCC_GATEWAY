import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucCapQuanLyDetailComponent } from './danh-muc-cap-quan-ly-detail.component';

describe('DanhMucCapQuanLy Management Detail Component', () => {
  let comp: DanhMucCapQuanLyDetailComponent;
  let fixture: ComponentFixture<DanhMucCapQuanLyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucCapQuanLyDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucCapQuanLyDetailComponent,
              resolve: { danhMucCapQuanLy: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucCapQuanLyDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucCapQuanLyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucCapQuanLy on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucCapQuanLyDetailComponent);

      // THEN
      expect(instance.danhMucCapQuanLy()).toEqual(expect.objectContaining({ id: 123 }));
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
