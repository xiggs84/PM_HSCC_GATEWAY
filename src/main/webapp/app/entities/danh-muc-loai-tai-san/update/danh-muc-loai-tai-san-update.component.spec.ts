import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucLoaiTaiSanService } from '../service/danh-muc-loai-tai-san.service';
import { IDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanFormService } from './danh-muc-loai-tai-san-form.service';

import { DanhMucLoaiTaiSanUpdateComponent } from './danh-muc-loai-tai-san-update.component';

describe('DanhMucLoaiTaiSan Management Update Component', () => {
  let comp: DanhMucLoaiTaiSanUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiTaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiTaiSanFormService: DanhMucLoaiTaiSanFormService;
  let danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiTaiSanUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiTaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiTaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiTaiSanFormService = TestBed.inject(DanhMucLoaiTaiSanFormService);
    danhMucLoaiTaiSanService = TestBed.inject(DanhMucLoaiTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { id: 456 };

      activatedRoute.data = of({ danhMucLoaiTaiSan });
      comp.ngOnInit();

      expect(comp.danhMucLoaiTaiSan).toEqual(danhMucLoaiTaiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiTaiSan>>();
      const danhMucLoaiTaiSan = { id: 123 };
      jest.spyOn(danhMucLoaiTaiSanFormService, 'getDanhMucLoaiTaiSan').mockReturnValue(danhMucLoaiTaiSan);
      jest.spyOn(danhMucLoaiTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiTaiSan }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiTaiSanFormService.getDanhMucLoaiTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiTaiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiTaiSan>>();
      const danhMucLoaiTaiSan = { id: 123 };
      jest.spyOn(danhMucLoaiTaiSanFormService, 'getDanhMucLoaiTaiSan').mockReturnValue({ id: null });
      jest.spyOn(danhMucLoaiTaiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiTaiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiTaiSan }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiTaiSanFormService.getDanhMucLoaiTaiSan).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiTaiSan>>();
      const danhMucLoaiTaiSan = { id: 123 };
      jest.spyOn(danhMucLoaiTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiTaiSanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
