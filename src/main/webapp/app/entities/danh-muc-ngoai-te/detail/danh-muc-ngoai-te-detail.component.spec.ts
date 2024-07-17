import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucNgoaiTeDetailComponent } from './danh-muc-ngoai-te-detail.component';

describe('DanhMucNgoaiTe Management Detail Component', () => {
  let comp: DanhMucNgoaiTeDetailComponent;
  let fixture: ComponentFixture<DanhMucNgoaiTeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucNgoaiTeDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucNgoaiTeDetailComponent,
              resolve: { danhMucNgoaiTe: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucNgoaiTeDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucNgoaiTeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucNgoaiTe on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucNgoaiTeDetailComponent);

      // THEN
      expect(instance.danhMucNgoaiTe()).toEqual(expect.objectContaining({ id: 123 }));
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
