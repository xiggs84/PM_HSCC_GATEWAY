jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DuongSuTrungCmndService } from '../service/duong-su-trung-cmnd.service';

import { DuongSuTrungCmndDeleteDialogComponent } from './duong-su-trung-cmnd-delete-dialog.component';

describe('DuongSuTrungCmnd Management Delete Component', () => {
  let comp: DuongSuTrungCmndDeleteDialogComponent;
  let fixture: ComponentFixture<DuongSuTrungCmndDeleteDialogComponent>;
  let service: DuongSuTrungCmndService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DuongSuTrungCmndDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DuongSuTrungCmndDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DuongSuTrungCmndDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DuongSuTrungCmndService);
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
