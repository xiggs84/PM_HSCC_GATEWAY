jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LogDownloadFileDriveService } from '../service/log-download-file-drive.service';

import { LogDownloadFileDriveDeleteDialogComponent } from './log-download-file-drive-delete-dialog.component';

describe('LogDownloadFileDrive Management Delete Component', () => {
  let comp: LogDownloadFileDriveDeleteDialogComponent;
  let fixture: ComponentFixture<LogDownloadFileDriveDeleteDialogComponent>;
  let service: LogDownloadFileDriveService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogDownloadFileDriveDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(LogDownloadFileDriveDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LogDownloadFileDriveDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LogDownloadFileDriveService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
