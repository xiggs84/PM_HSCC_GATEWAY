import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DmNoiCapGpdkxDetailComponent } from './dm-noi-cap-gpdkx-detail.component';

describe('DmNoiCapGpdkx Management Detail Component', () => {
  let comp: DmNoiCapGpdkxDetailComponent;
  let fixture: ComponentFixture<DmNoiCapGpdkxDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmNoiCapGpdkxDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DmNoiCapGpdkxDetailComponent,
              resolve: { dmNoiCapGpdkx: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DmNoiCapGpdkxDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmNoiCapGpdkxDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dmNoiCapGpdkx on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DmNoiCapGpdkxDetailComponent);

      // THEN
      expect(instance.dmNoiCapGpdkx()).toEqual(expect.objectContaining({ id: 123 }));
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
