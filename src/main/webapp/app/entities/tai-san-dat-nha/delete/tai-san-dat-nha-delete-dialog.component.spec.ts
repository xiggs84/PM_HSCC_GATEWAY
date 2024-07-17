jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';

import { TaiSanDatNhaDeleteDialogComponent } from './tai-san-dat-nha-delete-dialog.component';

describe('TaiSanDatNha Management Delete Component', () => {
  let comp: TaiSanDatNhaDeleteDialogComponent;
  let fixture: ComponentFixture<TaiSanDatNhaDeleteDialogComponent>;
  let service: TaiSanDatNhaService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDatNhaDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(TaiSanDatNhaDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaiSanDatNhaDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaiSanDatNhaService);
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
