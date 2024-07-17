jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucLoaiDonViService } from '../service/danh-muc-loai-don-vi.service';

import { DanhMucLoaiDonViDeleteDialogComponent } from './danh-muc-loai-don-vi-delete-dialog.component';

describe('DanhMucLoaiDonVi Management Delete Component', () => {
  let comp: DanhMucLoaiDonViDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucLoaiDonViDeleteDialogComponent>;
  let service: DanhMucLoaiDonViService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiDonViDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucLoaiDonViDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucLoaiDonViDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucLoaiDonViService);
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
