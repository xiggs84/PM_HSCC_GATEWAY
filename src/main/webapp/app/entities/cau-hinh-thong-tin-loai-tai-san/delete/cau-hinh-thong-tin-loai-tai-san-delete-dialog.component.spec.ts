jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CauHinhThongTinLoaiTaiSanService } from '../service/cau-hinh-thong-tin-loai-tai-san.service';

import { CauHinhThongTinLoaiTaiSanDeleteDialogComponent } from './cau-hinh-thong-tin-loai-tai-san-delete-dialog.component';

describe('CauHinhThongTinLoaiTaiSan Management Delete Component', () => {
  let comp: CauHinhThongTinLoaiTaiSanDeleteDialogComponent;
  let fixture: ComponentFixture<CauHinhThongTinLoaiTaiSanDeleteDialogComponent>;
  let service: CauHinhThongTinLoaiTaiSanService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhThongTinLoaiTaiSanDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(CauHinhThongTinLoaiTaiSanDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CauHinhThongTinLoaiTaiSanDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CauHinhThongTinLoaiTaiSanService);
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
