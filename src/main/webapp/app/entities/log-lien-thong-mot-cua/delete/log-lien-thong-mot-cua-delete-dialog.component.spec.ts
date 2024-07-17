jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LogLienThongMotCuaService } from '../service/log-lien-thong-mot-cua.service';

import { LogLienThongMotCuaDeleteDialogComponent } from './log-lien-thong-mot-cua-delete-dialog.component';

describe('LogLienThongMotCua Management Delete Component', () => {
  let comp: LogLienThongMotCuaDeleteDialogComponent;
  let fixture: ComponentFixture<LogLienThongMotCuaDeleteDialogComponent>;
  let service: LogLienThongMotCuaService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogLienThongMotCuaDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(LogLienThongMotCuaDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LogLienThongMotCuaDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LogLienThongMotCuaService);
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
