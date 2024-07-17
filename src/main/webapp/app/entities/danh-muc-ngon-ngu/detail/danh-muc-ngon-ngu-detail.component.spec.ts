import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucNgonNguDetailComponent } from './danh-muc-ngon-ngu-detail.component';

describe('DanhMucNgonNgu Management Detail Component', () => {
  let comp: DanhMucNgonNguDetailComponent;
  let fixture: ComponentFixture<DanhMucNgonNguDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucNgonNguDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucNgonNguDetailComponent,
              resolve: { danhMucNgonNgu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucNgonNguDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucNgonNguDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucNgonNgu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucNgonNguDetailComponent);

      // THEN
      expect(instance.danhMucNgonNgu()).toEqual(expect.objectContaining({ id: 123 }));
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
