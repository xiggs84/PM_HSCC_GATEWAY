import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucHuyenDetailComponent } from './danh-muc-huyen-detail.component';

describe('DanhMucHuyen Management Detail Component', () => {
  let comp: DanhMucHuyenDetailComponent;
  let fixture: ComponentFixture<DanhMucHuyenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucHuyenDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucHuyenDetailComponent,
              resolve: { danhMucHuyen: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucHuyenDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucHuyenDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucHuyen on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucHuyenDetailComponent);

      // THEN
      expect(instance.danhMucHuyen()).toEqual(expect.objectContaining({ id: 123 }));
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
