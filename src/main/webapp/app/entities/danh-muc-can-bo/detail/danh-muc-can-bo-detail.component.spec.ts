import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucCanBoDetailComponent } from './danh-muc-can-bo-detail.component';

describe('DanhMucCanBo Management Detail Component', () => {
  let comp: DanhMucCanBoDetailComponent;
  let fixture: ComponentFixture<DanhMucCanBoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucCanBoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucCanBoDetailComponent,
              resolve: { danhMucCanBo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucCanBoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucCanBoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucCanBo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucCanBoDetailComponent);

      // THEN
      expect(instance.danhMucCanBo()).toEqual(expect.objectContaining({ id: 123 }));
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
