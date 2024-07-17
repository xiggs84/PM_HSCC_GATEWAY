import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucQuocGiaDetailComponent } from './danh-muc-quoc-gia-detail.component';

describe('DanhMucQuocGia Management Detail Component', () => {
  let comp: DanhMucQuocGiaDetailComponent;
  let fixture: ComponentFixture<DanhMucQuocGiaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucQuocGiaDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucQuocGiaDetailComponent,
              resolve: { danhMucQuocGia: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucQuocGiaDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucQuocGiaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucQuocGia on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucQuocGiaDetailComponent);

      // THEN
      expect(instance.danhMucQuocGia()).toEqual(expect.objectContaining({ id: 123 }));
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
