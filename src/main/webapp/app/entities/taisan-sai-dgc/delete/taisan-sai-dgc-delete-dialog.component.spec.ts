jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaisanSaiDgcService } from '../service/taisan-sai-dgc.service';

import { TaisanSaiDgcDeleteDialogComponent } from './taisan-sai-dgc-delete-dialog.component';

describe('TaisanSaiDgc Management Delete Component', () => {
  let comp: TaisanSaiDgcDeleteDialogComponent;
  let fixture: ComponentFixture<TaisanSaiDgcDeleteDialogComponent>;
  let service: TaisanSaiDgcService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaisanSaiDgcDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(TaisanSaiDgcDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaisanSaiDgcDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaisanSaiDgcService);
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
