jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucKeyDongTuFaqService } from '../service/danh-muc-key-dong-tu-faq.service';

import { DanhMucKeyDongTuFaqDeleteDialogComponent } from './danh-muc-key-dong-tu-faq-delete-dialog.component';

describe('DanhMucKeyDongTuFaq Management Delete Component', () => {
  let comp: DanhMucKeyDongTuFaqDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucKeyDongTuFaqDeleteDialogComponent>;
  let service: DanhMucKeyDongTuFaqService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucKeyDongTuFaqDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucKeyDongTuFaqDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucKeyDongTuFaqDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucKeyDongTuFaqService);
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
