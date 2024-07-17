jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucTuVietTatService } from '../service/danh-muc-tu-viet-tat.service';

import { DanhMucTuVietTatDeleteDialogComponent } from './danh-muc-tu-viet-tat-delete-dialog.component';

describe('DanhMucTuVietTat Management Delete Component', () => {
  let comp: DanhMucTuVietTatDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucTuVietTatDeleteDialogComponent>;
  let service: DanhMucTuVietTatService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucTuVietTatDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucTuVietTatDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucTuVietTatDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucTuVietTatService);
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
