jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucNgonNguService } from '../service/danh-muc-ngon-ngu.service';

import { DanhMucNgonNguDeleteDialogComponent } from './danh-muc-ngon-ngu-delete-dialog.component';

describe('DanhMucNgonNgu Management Delete Component', () => {
  let comp: DanhMucNgonNguDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucNgonNguDeleteDialogComponent>;
  let service: DanhMucNgonNguService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucNgonNguDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucNgonNguDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucNgonNguDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucNgonNguService);
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
