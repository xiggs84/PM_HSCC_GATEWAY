import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LichSuGiaoDichDetailComponent } from './lich-su-giao-dich-detail.component';

describe('LichSuGiaoDich Management Detail Component', () => {
  let comp: LichSuGiaoDichDetailComponent;
  let fixture: ComponentFixture<LichSuGiaoDichDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LichSuGiaoDichDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LichSuGiaoDichDetailComponent,
              resolve: { lichSuGiaoDich: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LichSuGiaoDichDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LichSuGiaoDichDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load lichSuGiaoDich on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LichSuGiaoDichDetailComponent);

      // THEN
      expect(instance.lichSuGiaoDich()).toEqual(expect.objectContaining({ id: 123 }));
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
