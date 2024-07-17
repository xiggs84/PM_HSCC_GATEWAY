import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { MigrationsDetailComponent } from './migrations-detail.component';

describe('Migrations Management Detail Component', () => {
  let comp: MigrationsDetailComponent;
  let fixture: ComponentFixture<MigrationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigrationsDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: MigrationsDetailComponent,
              resolve: { migrations: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MigrationsDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load migrations on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MigrationsDetailComponent);

      // THEN
      expect(instance.migrations()).toEqual(expect.objectContaining({ id: 123 }));
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
