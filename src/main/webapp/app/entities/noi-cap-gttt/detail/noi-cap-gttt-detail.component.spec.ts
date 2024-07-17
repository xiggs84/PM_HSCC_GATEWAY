import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { NoiCapGtttDetailComponent } from './noi-cap-gttt-detail.component';

describe('NoiCapGttt Management Detail Component', () => {
  let comp: NoiCapGtttDetailComponent;
  let fixture: ComponentFixture<NoiCapGtttDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoiCapGtttDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: NoiCapGtttDetailComponent,
              resolve: { noiCapGttt: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(NoiCapGtttDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoiCapGtttDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load noiCapGttt on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', NoiCapGtttDetailComponent);

      // THEN
      expect(instance.noiCapGttt()).toEqual(expect.objectContaining({ id: 123 }));
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
