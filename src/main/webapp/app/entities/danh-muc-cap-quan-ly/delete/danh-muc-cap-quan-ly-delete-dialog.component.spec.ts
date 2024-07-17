jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucCapQuanLyService } from '../service/danh-muc-cap-quan-ly.service';

import { DanhMucCapQuanLyDeleteDialogComponent } from './danh-muc-cap-quan-ly-delete-dialog.component';

describe('DanhMucCapQuanLy Management Delete Component', () => {
  let comp: DanhMucCapQuanLyDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucCapQuanLyDeleteDialogComponent>;
  let service: DanhMucCapQuanLyService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucCapQuanLyDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucCapQuanLyDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucCapQuanLyDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucCapQuanLyService);
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
