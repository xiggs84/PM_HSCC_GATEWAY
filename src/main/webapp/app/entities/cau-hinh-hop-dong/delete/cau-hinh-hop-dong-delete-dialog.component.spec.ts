jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CauHinhHopDongService } from '../service/cau-hinh-hop-dong.service';

import { CauHinhHopDongDeleteDialogComponent } from './cau-hinh-hop-dong-delete-dialog.component';

describe('CauHinhHopDong Management Delete Component', () => {
  let comp: CauHinhHopDongDeleteDialogComponent;
  let fixture: ComponentFixture<CauHinhHopDongDeleteDialogComponent>;
  let service: CauHinhHopDongService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhHopDongDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(CauHinhHopDongDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CauHinhHopDongDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CauHinhHopDongService);
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
