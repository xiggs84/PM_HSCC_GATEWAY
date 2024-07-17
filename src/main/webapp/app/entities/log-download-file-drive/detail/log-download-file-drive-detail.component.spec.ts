import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogDownloadFileDriveDetailComponent } from './log-download-file-drive-detail.component';

describe('LogDownloadFileDrive Management Detail Component', () => {
  let comp: LogDownloadFileDriveDetailComponent;
  let fixture: ComponentFixture<LogDownloadFileDriveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogDownloadFileDriveDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogDownloadFileDriveDetailComponent,
              resolve: { logDownloadFileDrive: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogDownloadFileDriveDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDownloadFileDriveDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logDownloadFileDrive on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogDownloadFileDriveDetailComponent);

      // THEN
      expect(instance.logDownloadFileDrive()).toEqual(expect.objectContaining({ id: 123 }));
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
