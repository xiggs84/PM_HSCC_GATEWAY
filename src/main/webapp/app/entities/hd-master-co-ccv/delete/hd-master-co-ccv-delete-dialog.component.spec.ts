jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HdMasterCoCcvService } from '../service/hd-master-co-ccv.service';

import { HdMasterCoCcvDeleteDialogComponent } from './hd-master-co-ccv-delete-dialog.component';

describe('HdMasterCoCcv Management Delete Component', () => {
  let comp: HdMasterCoCcvDeleteDialogComponent;
  let fixture: ComponentFixture<HdMasterCoCcvDeleteDialogComponent>;
  let service: HdMasterCoCcvService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HdMasterCoCcvDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(HdMasterCoCcvDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HdMasterCoCcvDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HdMasterCoCcvService);
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
