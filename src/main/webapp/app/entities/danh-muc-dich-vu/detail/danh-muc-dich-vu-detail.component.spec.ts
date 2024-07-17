import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucDichVuDetailComponent } from './danh-muc-dich-vu-detail.component';

describe('DanhMucDichVu Management Detail Component', () => {
  let comp: DanhMucDichVuDetailComponent;
  let fixture: ComponentFixture<DanhMucDichVuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucDichVuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucDichVuDetailComponent,
              resolve: { danhMucDichVu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucDichVuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucDichVuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucDichVu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucDichVuDetailComponent);

      // THEN
      expect(instance.danhMucDichVu()).toEqual(expect.objectContaining({ id: 123 }));
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
