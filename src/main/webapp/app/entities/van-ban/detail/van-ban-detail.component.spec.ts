import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { VanBanDetailComponent } from './van-ban-detail.component';

describe('VanBan Management Detail Component', () => {
  let comp: VanBanDetailComponent;
  let fixture: ComponentFixture<VanBanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanBanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: VanBanDetailComponent,
              resolve: { vanBan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(VanBanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VanBanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load vanBan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', VanBanDetailComponent);

      // THEN
      expect(instance.vanBan()).toEqual(expect.objectContaining({ id: 123 }));
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
