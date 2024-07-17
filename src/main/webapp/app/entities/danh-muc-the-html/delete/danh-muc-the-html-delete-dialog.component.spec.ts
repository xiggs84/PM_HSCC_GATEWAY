jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucTheHtmlService } from '../service/danh-muc-the-html.service';

import { DanhMucTheHtmlDeleteDialogComponent } from './danh-muc-the-html-delete-dialog.component';

describe('DanhMucTheHtml Management Delete Component', () => {
  let comp: DanhMucTheHtmlDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucTheHtmlDeleteDialogComponent>;
  let service: DanhMucTheHtmlService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucTheHtmlDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucTheHtmlDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucTheHtmlDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucTheHtmlService);
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
