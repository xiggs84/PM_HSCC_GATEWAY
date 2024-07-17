jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucLoaiGiayToService } from '../service/danh-muc-loai-giay-to.service';

import { DanhMucLoaiGiayToDeleteDialogComponent } from './danh-muc-loai-giay-to-delete-dialog.component';

describe('DanhMucLoaiGiayTo Management Delete Component', () => {
  let comp: DanhMucLoaiGiayToDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucLoaiGiayToDeleteDialogComponent>;
  let service: DanhMucLoaiGiayToService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiGiayToDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucLoaiGiayToDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucLoaiGiayToDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucLoaiGiayToService);
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
