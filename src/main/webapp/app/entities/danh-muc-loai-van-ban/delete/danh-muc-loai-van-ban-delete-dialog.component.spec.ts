jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucLoaiVanBanService } from '../service/danh-muc-loai-van-ban.service';

import { DanhMucLoaiVanBanDeleteDialogComponent } from './danh-muc-loai-van-ban-delete-dialog.component';

describe('DanhMucLoaiVanBan Management Delete Component', () => {
  let comp: DanhMucLoaiVanBanDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucLoaiVanBanDeleteDialogComponent>;
  let service: DanhMucLoaiVanBanService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiVanBanDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucLoaiVanBanDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucLoaiVanBanDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucLoaiVanBanService);
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
