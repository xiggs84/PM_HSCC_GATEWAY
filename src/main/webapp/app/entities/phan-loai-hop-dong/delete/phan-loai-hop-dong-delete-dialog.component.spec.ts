jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PhanLoaiHopDongService } from '../service/phan-loai-hop-dong.service';

import { PhanLoaiHopDongDeleteDialogComponent } from './phan-loai-hop-dong-delete-dialog.component';

describe('PhanLoaiHopDong Management Delete Component', () => {
  let comp: PhanLoaiHopDongDeleteDialogComponent;
  let fixture: ComponentFixture<PhanLoaiHopDongDeleteDialogComponent>;
  let service: PhanLoaiHopDongService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhanLoaiHopDongDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(PhanLoaiHopDongDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PhanLoaiHopDongDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PhanLoaiHopDongService);
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
