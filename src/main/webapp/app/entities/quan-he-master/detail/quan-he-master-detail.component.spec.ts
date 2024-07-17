import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuanHeMasterDetailComponent } from './quan-he-master-detail.component';

describe('QuanHeMaster Management Detail Component', () => {
  let comp: QuanHeMasterDetailComponent;
  let fixture: ComponentFixture<QuanHeMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanHeMasterDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: QuanHeMasterDetailComponent,
              resolve: { quanHeMaster: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(QuanHeMasterDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanHeMasterDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quanHeMaster on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', QuanHeMasterDetailComponent);

      // THEN
      expect(instance.quanHeMaster()).toEqual(expect.objectContaining({ id: 123 }));
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
