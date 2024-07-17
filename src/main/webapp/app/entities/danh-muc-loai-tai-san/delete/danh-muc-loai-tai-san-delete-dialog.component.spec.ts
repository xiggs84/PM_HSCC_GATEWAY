jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucLoaiTaiSanService } from '../service/danh-muc-loai-tai-san.service';

import { DanhMucLoaiTaiSanDeleteDialogComponent } from './danh-muc-loai-tai-san-delete-dialog.component';

describe('DanhMucLoaiTaiSan Management Delete Component', () => {
  let comp: DanhMucLoaiTaiSanDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucLoaiTaiSanDeleteDialogComponent>;
  let service: DanhMucLoaiTaiSanService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiTaiSanDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucLoaiTaiSanDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucLoaiTaiSanDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucLoaiTaiSanService);
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
