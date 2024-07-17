jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaisanSaiQsddDgcService } from '../service/taisan-sai-qsdd-dgc.service';

import { TaisanSaiQsddDgcDeleteDialogComponent } from './taisan-sai-qsdd-dgc-delete-dialog.component';

describe('TaisanSaiQsddDgc Management Delete Component', () => {
  let comp: TaisanSaiQsddDgcDeleteDialogComponent;
  let fixture: ComponentFixture<TaisanSaiQsddDgcDeleteDialogComponent>;
  let service: TaisanSaiQsddDgcService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaisanSaiQsddDgcDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(TaisanSaiQsddDgcDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaisanSaiQsddDgcDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaisanSaiQsddDgcService);
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
