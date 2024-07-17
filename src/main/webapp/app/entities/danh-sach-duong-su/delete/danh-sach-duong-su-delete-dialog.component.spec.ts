jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhSachDuongSuService } from '../service/danh-sach-duong-su.service';

import { DanhSachDuongSuDeleteDialogComponent } from './danh-sach-duong-su-delete-dialog.component';

describe('DanhSachDuongSu Management Delete Component', () => {
  let comp: DanhSachDuongSuDeleteDialogComponent;
  let fixture: ComponentFixture<DanhSachDuongSuDeleteDialogComponent>;
  let service: DanhSachDuongSuService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachDuongSuDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhSachDuongSuDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhSachDuongSuDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhSachDuongSuService);
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
