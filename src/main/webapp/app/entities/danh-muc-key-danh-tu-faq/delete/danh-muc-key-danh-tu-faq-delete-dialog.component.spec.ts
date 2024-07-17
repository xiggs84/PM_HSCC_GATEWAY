jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucKeyDanhTuFaqService } from '../service/danh-muc-key-danh-tu-faq.service';

import { DanhMucKeyDanhTuFaqDeleteDialogComponent } from './danh-muc-key-danh-tu-faq-delete-dialog.component';

describe('DanhMucKeyDanhTuFaq Management Delete Component', () => {
  let comp: DanhMucKeyDanhTuFaqDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucKeyDanhTuFaqDeleteDialogComponent>;
  let service: DanhMucKeyDanhTuFaqService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucKeyDanhTuFaqDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucKeyDanhTuFaqDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucKeyDanhTuFaqDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucKeyDanhTuFaqService);
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
