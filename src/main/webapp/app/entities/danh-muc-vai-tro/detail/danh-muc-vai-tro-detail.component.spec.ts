import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucVaiTroDetailComponent } from './danh-muc-vai-tro-detail.component';

describe('DanhMucVaiTro Management Detail Component', () => {
  let comp: DanhMucVaiTroDetailComponent;
  let fixture: ComponentFixture<DanhMucVaiTroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucVaiTroDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucVaiTroDetailComponent,
              resolve: { danhMucVaiTro: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucVaiTroDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucVaiTroDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucVaiTro on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucVaiTroDetailComponent);

      // THEN
      expect(instance.danhMucVaiTro()).toEqual(expect.objectContaining({ id: 123 }));
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
