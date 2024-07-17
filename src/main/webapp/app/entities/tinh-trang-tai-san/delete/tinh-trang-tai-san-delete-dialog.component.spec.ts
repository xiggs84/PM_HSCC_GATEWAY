jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TinhTrangTaiSanService } from '../service/tinh-trang-tai-san.service';

import { TinhTrangTaiSanDeleteDialogComponent } from './tinh-trang-tai-san-delete-dialog.component';

describe('TinhTrangTaiSan Management Delete Component', () => {
  let comp: TinhTrangTaiSanDeleteDialogComponent;
  let fixture: ComponentFixture<TinhTrangTaiSanDeleteDialogComponent>;
  let service: TinhTrangTaiSanService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TinhTrangTaiSanDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(TinhTrangTaiSanDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TinhTrangTaiSanDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TinhTrangTaiSanService);
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
