import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { MenuDetailComponent } from './menu-detail.component';

describe('Menu Management Detail Component', () => {
  let comp: MenuDetailComponent;
  let fixture: ComponentFixture<MenuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: MenuDetailComponent,
              resolve: { menu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MenuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load menu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MenuDetailComponent);

      // THEN
      expect(instance.menu()).toEqual(expect.objectContaining({ id: 123 }));
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
