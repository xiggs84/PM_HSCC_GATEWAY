jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucTinhTrangHonNhanService } from '../service/danh-muc-tinh-trang-hon-nhan.service';

import { DanhMucTinhTrangHonNhanDeleteDialogComponent } from './danh-muc-tinh-trang-hon-nhan-delete-dialog.component';

describe('DanhMucTinhTrangHonNhan Management Delete Component', () => {
  let comp: DanhMucTinhTrangHonNhanDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucTinhTrangHonNhanDeleteDialogComponent>;
  let service: DanhMucTinhTrangHonNhanService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucTinhTrangHonNhanDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucTinhTrangHonNhanDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucTinhTrangHonNhanDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucTinhTrangHonNhanService);
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
