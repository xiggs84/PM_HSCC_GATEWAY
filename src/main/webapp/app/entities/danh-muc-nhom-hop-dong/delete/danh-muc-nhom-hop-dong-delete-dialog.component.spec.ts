jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucNhomHopDongService } from '../service/danh-muc-nhom-hop-dong.service';

import { DanhMucNhomHopDongDeleteDialogComponent } from './danh-muc-nhom-hop-dong-delete-dialog.component';

describe('DanhMucNhomHopDong Management Delete Component', () => {
  let comp: DanhMucNhomHopDongDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucNhomHopDongDeleteDialogComponent>;
  let service: DanhMucNhomHopDongService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucNhomHopDongDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucNhomHopDongDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucNhomHopDongDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucNhomHopDongService);
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
