jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucFileUploadKysoService } from '../service/danh-muc-file-upload-kyso.service';

import { DanhMucFileUploadKysoDeleteDialogComponent } from './danh-muc-file-upload-kyso-delete-dialog.component';

describe('DanhMucFileUploadKyso Management Delete Component', () => {
  let comp: DanhMucFileUploadKysoDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucFileUploadKysoDeleteDialogComponent>;
  let service: DanhMucFileUploadKysoService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucFileUploadKysoDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucFileUploadKysoDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucFileUploadKysoDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucFileUploadKysoService);
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
