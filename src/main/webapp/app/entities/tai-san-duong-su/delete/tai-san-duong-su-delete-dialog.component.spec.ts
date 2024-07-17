jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaiSanDuongSuService } from '../service/tai-san-duong-su.service';

import { TaiSanDuongSuDeleteDialogComponent } from './tai-san-duong-su-delete-dialog.component';

describe('TaiSanDuongSu Management Delete Component', () => {
  let comp: TaiSanDuongSuDeleteDialogComponent;
  let fixture: ComponentFixture<TaiSanDuongSuDeleteDialogComponent>;
  let service: TaiSanDuongSuService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDuongSuDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(TaiSanDuongSuDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaiSanDuongSuDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaiSanDuongSuService);
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
