import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ChiTietNganChanDetailComponent } from './chi-tiet-ngan-chan-detail.component';

describe('ChiTietNganChan Management Detail Component', () => {
  let comp: ChiTietNganChanDetailComponent;
  let fixture: ComponentFixture<ChiTietNganChanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietNganChanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ChiTietNganChanDetailComponent,
              resolve: { chiTietNganChan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ChiTietNganChanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietNganChanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load chiTietNganChan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ChiTietNganChanDetailComponent);

      // THEN
      expect(instance.chiTietNganChan()).toEqual(expect.objectContaining({ id: 123 }));
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
