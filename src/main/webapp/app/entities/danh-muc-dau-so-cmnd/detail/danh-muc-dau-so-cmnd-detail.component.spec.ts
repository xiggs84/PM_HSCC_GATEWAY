import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucDauSoCmndDetailComponent } from './danh-muc-dau-so-cmnd-detail.component';

describe('DanhMucDauSoCmnd Management Detail Component', () => {
  let comp: DanhMucDauSoCmndDetailComponent;
  let fixture: ComponentFixture<DanhMucDauSoCmndDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucDauSoCmndDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucDauSoCmndDetailComponent,
              resolve: { danhMucDauSoCmnd: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucDauSoCmndDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucDauSoCmndDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucDauSoCmnd on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucDauSoCmndDetailComponent);

      // THEN
      expect(instance.danhMucDauSoCmnd()).toEqual(expect.objectContaining({ id: 123 }));
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
