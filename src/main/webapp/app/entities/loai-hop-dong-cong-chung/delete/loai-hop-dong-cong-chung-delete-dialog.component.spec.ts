jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LoaiHopDongCongChungService } from '../service/loai-hop-dong-cong-chung.service';

import { LoaiHopDongCongChungDeleteDialogComponent } from './loai-hop-dong-cong-chung-delete-dialog.component';

describe('LoaiHopDongCongChung Management Delete Component', () => {
  let comp: LoaiHopDongCongChungDeleteDialogComponent;
  let fixture: ComponentFixture<LoaiHopDongCongChungDeleteDialogComponent>;
  let service: LoaiHopDongCongChungService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoaiHopDongCongChungDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(LoaiHopDongCongChungDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LoaiHopDongCongChungDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LoaiHopDongCongChungService);
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
