jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LichSuGiaoDichService } from '../service/lich-su-giao-dich.service';

import { LichSuGiaoDichDeleteDialogComponent } from './lich-su-giao-dich-delete-dialog.component';

describe('LichSuGiaoDich Management Delete Component', () => {
  let comp: LichSuGiaoDichDeleteDialogComponent;
  let fixture: ComponentFixture<LichSuGiaoDichDeleteDialogComponent>;
  let service: LichSuGiaoDichService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LichSuGiaoDichDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(LichSuGiaoDichDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LichSuGiaoDichDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LichSuGiaoDichService);
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
