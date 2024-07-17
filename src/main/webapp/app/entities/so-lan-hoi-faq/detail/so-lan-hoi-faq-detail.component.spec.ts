import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SoLanHoiFaqDetailComponent } from './so-lan-hoi-faq-detail.component';

describe('SoLanHoiFaq Management Detail Component', () => {
  let comp: SoLanHoiFaqDetailComponent;
  let fixture: ComponentFixture<SoLanHoiFaqDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoLanHoiFaqDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SoLanHoiFaqDetailComponent,
              resolve: { soLanHoiFaq: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SoLanHoiFaqDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoLanHoiFaqDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soLanHoiFaq on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SoLanHoiFaqDetailComponent);

      // THEN
      expect(instance.soLanHoiFaq()).toEqual(expect.objectContaining({ id: 123 }));
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
