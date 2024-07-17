jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucNoiCapQshService } from '../service/danh-muc-noi-cap-qsh.service';

import { DanhMucNoiCapQshDeleteDialogComponent } from './danh-muc-noi-cap-qsh-delete-dialog.component';

describe('DanhMucNoiCapQsh Management Delete Component', () => {
  let comp: DanhMucNoiCapQshDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucNoiCapQshDeleteDialogComponent>;
  let service: DanhMucNoiCapQshService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucNoiCapQshDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucNoiCapQshDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucNoiCapQshDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucNoiCapQshService);
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
