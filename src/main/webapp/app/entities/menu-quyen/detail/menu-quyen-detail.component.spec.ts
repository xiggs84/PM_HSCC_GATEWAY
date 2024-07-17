import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { MenuQuyenDetailComponent } from './menu-quyen-detail.component';

describe('MenuQuyen Management Detail Component', () => {
  let comp: MenuQuyenDetailComponent;
  let fixture: ComponentFixture<MenuQuyenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuQuyenDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: MenuQuyenDetailComponent,
              resolve: { menuQuyen: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MenuQuyenDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuQuyenDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load menuQuyen on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MenuQuyenDetailComponent);

      // THEN
      expect(instance.menuQuyen()).toEqual(expect.objectContaining({ id: 123 }));
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
