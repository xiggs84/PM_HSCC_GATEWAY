import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucNoiCapQshDetailComponent } from './danh-muc-noi-cap-qsh-detail.component';

describe('DanhMucNoiCapQsh Management Detail Component', () => {
  let comp: DanhMucNoiCapQshDetailComponent;
  let fixture: ComponentFixture<DanhMucNoiCapQshDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucNoiCapQshDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucNoiCapQshDetailComponent,
              resolve: { danhMucNoiCapQsh: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucNoiCapQshDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucNoiCapQshDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucNoiCapQsh on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucNoiCapQshDetailComponent);

      // THEN
      expect(instance.danhMucNoiCapQsh()).toEqual(expect.objectContaining({ id: 123 }));
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
