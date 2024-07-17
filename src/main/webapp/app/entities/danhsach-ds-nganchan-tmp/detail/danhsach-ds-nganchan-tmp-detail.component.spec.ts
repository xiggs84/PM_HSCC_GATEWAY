import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhsachDsNganchanTmpDetailComponent } from './danhsach-ds-nganchan-tmp-detail.component';

describe('DanhsachDsNganchanTmp Management Detail Component', () => {
  let comp: DanhsachDsNganchanTmpDetailComponent;
  let fixture: ComponentFixture<DanhsachDsNganchanTmpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhsachDsNganchanTmpDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhsachDsNganchanTmpDetailComponent,
              resolve: { danhsachDsNganchanTmp: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhsachDsNganchanTmpDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachDsNganchanTmpDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhsachDsNganchanTmp on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhsachDsNganchanTmpDetailComponent);

      // THEN
      expect(instance.danhsachDsNganchanTmp()).toEqual(expect.objectContaining({ id: 123 }));
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
