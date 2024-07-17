import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhSachDuongSuService } from '../service/danh-sach-duong-su.service';
import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';
import { DanhSachDuongSuFormService } from './danh-sach-duong-su-form.service';

import { DanhSachDuongSuUpdateComponent } from './danh-sach-duong-su-update.component';

describe('DanhSachDuongSu Management Update Component', () => {
  let comp: DanhSachDuongSuUpdateComponent;
  let fixture: ComponentFixture<DanhSachDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhSachDuongSuFormService: DanhSachDuongSuFormService;
  let danhSachDuongSuService: DanhSachDuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachDuongSuUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DanhSachDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhSachDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhSachDuongSuFormService = TestBed.inject(DanhSachDuongSuFormService);
    danhSachDuongSuService = TestBed.inject(DanhSachDuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhSachDuongSu: IDanhSachDuongSu = { id: 456 };

      activatedRoute.data = of({ danhSachDuongSu });
      comp.ngOnInit();

      expect(comp.danhSachDuongSu).toEqual(danhSachDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachDuongSu>>();
      const danhSachDuongSu = { id: 123 };
      jest.spyOn(danhSachDuongSuFormService, 'getDanhSachDuongSu').mockReturnValue(danhSachDuongSu);
      jest.spyOn(danhSachDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachDuongSu }));
      saveSubject.complete();

      // THEN
      expect(danhSachDuongSuFormService.getDanhSachDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhSachDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(danhSachDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachDuongSu>>();
      const danhSachDuongSu = { id: 123 };
      jest.spyOn(danhSachDuongSuFormService, 'getDanhSachDuongSu').mockReturnValue({ id: null });
      jest.spyOn(danhSachDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachDuongSu }));
      saveSubject.complete();

      // THEN
      expect(danhSachDuongSuFormService.getDanhSachDuongSu).toHaveBeenCalled();
      expect(danhSachDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachDuongSu>>();
      const danhSachDuongSu = { id: 123 };
      jest.spyOn(danhSachDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhSachDuongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
