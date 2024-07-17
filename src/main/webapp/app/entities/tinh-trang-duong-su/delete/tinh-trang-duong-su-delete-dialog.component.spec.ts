jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TinhTrangDuongSuService } from '../service/tinh-trang-duong-su.service';

import { TinhTrangDuongSuDeleteDialogComponent } from './tinh-trang-duong-su-delete-dialog.component';

describe('TinhTrangDuongSu Management Delete Component', () => {
  let comp: TinhTrangDuongSuDeleteDialogComponent;
  let fixture: ComponentFixture<TinhTrangDuongSuDeleteDialogComponent>;
  let service: TinhTrangDuongSuService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TinhTrangDuongSuDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(TinhTrangDuongSuDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TinhTrangDuongSuDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TinhTrangDuongSuService);
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
