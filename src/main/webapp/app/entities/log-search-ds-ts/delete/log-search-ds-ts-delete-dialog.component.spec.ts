jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LogSearchDsTsService } from '../service/log-search-ds-ts.service';

import { LogSearchDsTsDeleteDialogComponent } from './log-search-ds-ts-delete-dialog.component';

describe('LogSearchDsTs Management Delete Component', () => {
  let comp: LogSearchDsTsDeleteDialogComponent;
  let fixture: ComponentFixture<LogSearchDsTsDeleteDialogComponent>;
  let service: LogSearchDsTsService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogSearchDsTsDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(LogSearchDsTsDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LogSearchDsTsDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LogSearchDsTsService);
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
