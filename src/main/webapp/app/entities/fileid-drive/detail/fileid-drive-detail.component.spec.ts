import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { FileidDriveDetailComponent } from './fileid-drive-detail.component';

describe('FileidDrive Management Detail Component', () => {
  let comp: FileidDriveDetailComponent;
  let fixture: ComponentFixture<FileidDriveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileidDriveDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: FileidDriveDetailComponent,
              resolve: { fileidDrive: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FileidDriveDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileidDriveDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load fileidDrive on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FileidDriveDetailComponent);

      // THEN
      expect(instance.fileidDrive()).toEqual(expect.objectContaining({ id: 123 }));
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
