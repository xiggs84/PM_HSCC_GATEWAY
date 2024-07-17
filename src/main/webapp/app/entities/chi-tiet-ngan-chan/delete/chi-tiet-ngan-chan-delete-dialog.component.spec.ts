jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ChiTietNganChanService } from '../service/chi-tiet-ngan-chan.service';

import { ChiTietNganChanDeleteDialogComponent } from './chi-tiet-ngan-chan-delete-dialog.component';

describe('ChiTietNganChan Management Delete Component', () => {
  let comp: ChiTietNganChanDeleteDialogComponent;
  let fixture: ComponentFixture<ChiTietNganChanDeleteDialogComponent>;
  let service: ChiTietNganChanService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChiTietNganChanDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(ChiTietNganChanDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChiTietNganChanDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ChiTietNganChanService);
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
