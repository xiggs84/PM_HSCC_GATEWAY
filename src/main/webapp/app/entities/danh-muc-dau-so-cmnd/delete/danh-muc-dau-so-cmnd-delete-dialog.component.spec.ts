jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucDauSoCmndService } from '../service/danh-muc-dau-so-cmnd.service';

import { DanhMucDauSoCmndDeleteDialogComponent } from './danh-muc-dau-so-cmnd-delete-dialog.component';

describe('DanhMucDauSoCmnd Management Delete Component', () => {
  let comp: DanhMucDauSoCmndDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucDauSoCmndDeleteDialogComponent>;
  let service: DanhMucDauSoCmndService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucDauSoCmndDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucDauSoCmndDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucDauSoCmndDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucDauSoCmndService);
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
