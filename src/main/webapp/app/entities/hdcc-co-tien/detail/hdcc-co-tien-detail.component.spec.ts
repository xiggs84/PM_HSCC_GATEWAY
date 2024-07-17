import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { HdccCoTienDetailComponent } from './hdcc-co-tien-detail.component';

describe('HdccCoTien Management Detail Component', () => {
  let comp: HdccCoTienDetailComponent;
  let fixture: ComponentFixture<HdccCoTienDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdccCoTienDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: HdccCoTienDetailComponent,
              resolve: { hdccCoTien: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(HdccCoTienDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdccCoTienDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load hdccCoTien on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', HdccCoTienDetailComponent);

      // THEN
      expect(instance.hdccCoTien()).toEqual(expect.objectContaining({ id: 123 }));
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
