import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucTinh } from 'app/entities/danh-muc-tinh/danh-muc-tinh.model';
import { DanhMucTinhService } from 'app/entities/danh-muc-tinh/service/danh-muc-tinh.service';
import { IDanhMucHuyen } from 'app/entities/danh-muc-huyen/danh-muc-huyen.model';
import { DanhMucHuyenService } from 'app/entities/danh-muc-huyen/service/danh-muc-huyen.service';
import { IDanhMucXa } from 'app/entities/danh-muc-xa/danh-muc-xa.model';
import { DanhMucXaService } from 'app/entities/danh-muc-xa/service/danh-muc-xa.service';
import { IDanhMucLoaiDonVi } from 'app/entities/danh-muc-loai-don-vi/danh-muc-loai-don-vi.model';
import { DanhMucLoaiDonViService } from 'app/entities/danh-muc-loai-don-vi/service/danh-muc-loai-don-vi.service';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';
import { DanhMucDonViFormService } from './danh-muc-don-vi-form.service';

import { DanhMucDonViUpdateComponent } from './danh-muc-don-vi-update.component';

describe('DanhMucDonVi Management Update Component', () => {
  let comp: DanhMucDonViUpdateComponent;
  let fixture: ComponentFixture<DanhMucDonViUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucDonViFormService: DanhMucDonViFormService;
  let danhMucDonViService: DanhMucDonViService;
  let danhMucTinhService: DanhMucTinhService;
  let danhMucHuyenService: DanhMucHuyenService;
  let danhMucXaService: DanhMucXaService;
  let danhMucLoaiDonViService: DanhMucLoaiDonViService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucDonViUpdateComponent],
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
      .overrideTemplate(DanhMucDonViUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucDonViUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucDonViFormService = TestBed.inject(DanhMucDonViFormService);
    danhMucDonViService = TestBed.inject(DanhMucDonViService);
    danhMucTinhService = TestBed.inject(DanhMucTinhService);
    danhMucHuyenService = TestBed.inject(DanhMucHuyenService);
    danhMucXaService = TestBed.inject(DanhMucXaService);
    danhMucLoaiDonViService = TestBed.inject(DanhMucLoaiDonViService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucTinh query and add missing value', () => {
      const danhMucDonVi: IDanhMucDonVi = { id: 456 };
      const idTinh: IDanhMucTinh = { id: 31455 };
      danhMucDonVi.idTinh = idTinh;

      const danhMucTinhCollection: IDanhMucTinh[] = [{ id: 11178 }];
      jest.spyOn(danhMucTinhService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucTinhCollection })));
      const additionalDanhMucTinhs = [idTinh];
      const expectedCollection: IDanhMucTinh[] = [...additionalDanhMucTinhs, ...danhMucTinhCollection];
      jest.spyOn(danhMucTinhService, 'addDanhMucTinhToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(danhMucTinhService.query).toHaveBeenCalled();
      expect(danhMucTinhService.addDanhMucTinhToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucTinhCollection,
        ...additionalDanhMucTinhs.map(expect.objectContaining),
      );
      expect(comp.danhMucTinhsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucHuyen query and add missing value', () => {
      const danhMucDonVi: IDanhMucDonVi = { id: 456 };
      const idHuyen: IDanhMucHuyen = { id: 32626 };
      danhMucDonVi.idHuyen = idHuyen;

      const danhMucHuyenCollection: IDanhMucHuyen[] = [{ id: 9828 }];
      jest.spyOn(danhMucHuyenService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucHuyenCollection })));
      const additionalDanhMucHuyens = [idHuyen];
      const expectedCollection: IDanhMucHuyen[] = [...additionalDanhMucHuyens, ...danhMucHuyenCollection];
      jest.spyOn(danhMucHuyenService, 'addDanhMucHuyenToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(danhMucHuyenService.query).toHaveBeenCalled();
      expect(danhMucHuyenService.addDanhMucHuyenToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucHuyenCollection,
        ...additionalDanhMucHuyens.map(expect.objectContaining),
      );
      expect(comp.danhMucHuyensSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucXa query and add missing value', () => {
      const danhMucDonVi: IDanhMucDonVi = { id: 456 };
      const idPhuongXa: IDanhMucXa = { id: 11607 };
      danhMucDonVi.idPhuongXa = idPhuongXa;

      const danhMucXaCollection: IDanhMucXa[] = [{ id: 16583 }];
      jest.spyOn(danhMucXaService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucXaCollection })));
      const additionalDanhMucXas = [idPhuongXa];
      const expectedCollection: IDanhMucXa[] = [...additionalDanhMucXas, ...danhMucXaCollection];
      jest.spyOn(danhMucXaService, 'addDanhMucXaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(danhMucXaService.query).toHaveBeenCalled();
      expect(danhMucXaService.addDanhMucXaToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucXaCollection,
        ...additionalDanhMucXas.map(expect.objectContaining),
      );
      expect(comp.danhMucXasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucLoaiDonVi query and add missing value', () => {
      const danhMucDonVi: IDanhMucDonVi = { id: 456 };
      const idLoaiDv: IDanhMucLoaiDonVi = { id: 31662 };
      danhMucDonVi.idLoaiDv = idLoaiDv;

      const danhMucLoaiDonViCollection: IDanhMucLoaiDonVi[] = [{ id: 22475 }];
      jest.spyOn(danhMucLoaiDonViService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiDonViCollection })));
      const additionalDanhMucLoaiDonVis = [idLoaiDv];
      const expectedCollection: IDanhMucLoaiDonVi[] = [...additionalDanhMucLoaiDonVis, ...danhMucLoaiDonViCollection];
      jest.spyOn(danhMucLoaiDonViService, 'addDanhMucLoaiDonViToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(danhMucLoaiDonViService.query).toHaveBeenCalled();
      expect(danhMucLoaiDonViService.addDanhMucLoaiDonViToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiDonViCollection,
        ...additionalDanhMucLoaiDonVis.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiDonVisSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhMucDonVi: IDanhMucDonVi = { id: 456 };
      const idTinh: IDanhMucTinh = { id: 27492 };
      danhMucDonVi.idTinh = idTinh;
      const idHuyen: IDanhMucHuyen = { id: 28454 };
      danhMucDonVi.idHuyen = idHuyen;
      const idPhuongXa: IDanhMucXa = { id: 1048 };
      danhMucDonVi.idPhuongXa = idPhuongXa;
      const idLoaiDv: IDanhMucLoaiDonVi = { id: 7326 };
      danhMucDonVi.idLoaiDv = idLoaiDv;

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(comp.danhMucTinhsSharedCollection).toContain(idTinh);
      expect(comp.danhMucHuyensSharedCollection).toContain(idHuyen);
      expect(comp.danhMucXasSharedCollection).toContain(idPhuongXa);
      expect(comp.danhMucLoaiDonVisSharedCollection).toContain(idLoaiDv);
      expect(comp.danhMucDonVi).toEqual(danhMucDonVi);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { id: 123 };
      jest.spyOn(danhMucDonViFormService, 'getDanhMucDonVi').mockReturnValue(danhMucDonVi);
      jest.spyOn(danhMucDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucDonViFormService.getDanhMucDonVi).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucDonViService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucDonVi));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { id: 123 };
      jest.spyOn(danhMucDonViFormService, 'getDanhMucDonVi').mockReturnValue({ id: null });
      jest.spyOn(danhMucDonViService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucDonViFormService.getDanhMucDonVi).toHaveBeenCalled();
      expect(danhMucDonViService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { id: 123 };
      jest.spyOn(danhMucDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucDonViService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucTinh', () => {
      it('Should forward to danhMucTinhService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucTinhService, 'compareDanhMucTinh');
        comp.compareDanhMucTinh(entity, entity2);
        expect(danhMucTinhService.compareDanhMucTinh).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDanhMucHuyen', () => {
      it('Should forward to danhMucHuyenService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucHuyenService, 'compareDanhMucHuyen');
        comp.compareDanhMucHuyen(entity, entity2);
        expect(danhMucHuyenService.compareDanhMucHuyen).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDanhMucXa', () => {
      it('Should forward to danhMucXaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucXaService, 'compareDanhMucXa');
        comp.compareDanhMucXa(entity, entity2);
        expect(danhMucXaService.compareDanhMucXa).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDanhMucLoaiDonVi', () => {
      it('Should forward to danhMucLoaiDonViService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucLoaiDonViService, 'compareDanhMucLoaiDonVi');
        comp.compareDanhMucLoaiDonVi(entity, entity2);
        expect(danhMucLoaiDonViService.compareDanhMucLoaiDonVi).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
