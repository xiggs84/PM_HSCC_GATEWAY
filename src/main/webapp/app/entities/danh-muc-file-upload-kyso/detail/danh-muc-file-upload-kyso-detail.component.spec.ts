import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucFileUploadKysoDetailComponent } from './danh-muc-file-upload-kyso-detail.component';

describe('DanhMucFileUploadKyso Management Detail Component', () => {
  let comp: DanhMucFileUploadKysoDetailComponent;
  let fixture: ComponentFixture<DanhMucFileUploadKysoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucFileUploadKysoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucFileUploadKysoDetailComponent,
              resolve: { danhMucFileUploadKyso: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucFileUploadKysoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucFileUploadKysoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucFileUploadKyso on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucFileUploadKysoDetailComponent);

      // THEN
      expect(instance.danhMucFileUploadKyso()).toEqual(expect.objectContaining({ id: 123 }));
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
