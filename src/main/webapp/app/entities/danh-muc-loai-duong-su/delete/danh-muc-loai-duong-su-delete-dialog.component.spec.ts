jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucLoaiDuongSuService } from '../service/danh-muc-loai-duong-su.service';

import { DanhMucLoaiDuongSuDeleteDialogComponent } from './danh-muc-loai-duong-su-delete-dialog.component';

describe('DanhMucLoaiDuongSu Management Delete Component', () => {
  let comp: DanhMucLoaiDuongSuDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucLoaiDuongSuDeleteDialogComponent>;
  let service: DanhMucLoaiDuongSuService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiDuongSuDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucLoaiDuongSuDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucLoaiDuongSuDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucLoaiDuongSuService);
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
