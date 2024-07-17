import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from 'app/entities/tinh-trang-tai-san/service/tinh-trang-tai-san.service';
import { ITaiSan } from '../tai-san.model';
import { TaiSanService } from '../service/tai-san.service';
import { TaiSanFormService } from './tai-san-form.service';

import { TaiSanUpdateComponent } from './tai-san-update.component';

describe('TaiSan Management Update Component', () => {
  let comp: TaiSanUpdateComponent;
  let fixture: ComponentFixture<TaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanFormService: TaiSanFormService;
  let taiSanService: TaiSanService;
  let danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService;
  let tinhTrangTaiSanService: TinhTrangTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanUpdateComponent],
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
      .overrideTemplate(TaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanFormService = TestBed.inject(TaiSanFormService);
    taiSanService = TestBed.inject(TaiSanService);
    danhMucLoaiTaiSanService = TestBed.inject(DanhMucLoaiTaiSanService);
    tinhTrangTaiSanService = TestBed.inject(TinhTrangTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TaiSan query and add missing value', () => {
      const taiSan: ITaiSan = { id: 456 };
      const idTsGocs: ITaiSan[] = [{ id: 8300 }];
      taiSan.idTsGocs = idTsGocs;
      const taiSans: ITaiSan[] = [{ id: 30378 }];
      taiSan.taiSans = taiSans;

      const taiSanCollection: ITaiSan[] = [{ id: 9197 }];
      jest.spyOn(taiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: taiSanCollection })));
      const additionalTaiSans = [...idTsGocs, ...taiSans];
      const expectedCollection: ITaiSan[] = [...additionalTaiSans, ...taiSanCollection];
      jest.spyOn(taiSanService, 'addTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(taiSanService.query).toHaveBeenCalled();
      expect(taiSanService.addTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        taiSanCollection,
        ...additionalTaiSans.map(expect.objectContaining),
      );
      expect(comp.taiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucLoaiTaiSan query and add missing value', () => {
      const taiSan: ITaiSan = { id: 456 };
      const idLoaiTs: IDanhMucLoaiTaiSan = { id: 16057 };
      taiSan.idLoaiTs = idLoaiTs;

      const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [{ id: 31947 }];
      jest.spyOn(danhMucLoaiTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiTaiSanCollection })));
      const additionalDanhMucLoaiTaiSans = [idLoaiTs];
      const expectedCollection: IDanhMucLoaiTaiSan[] = [...additionalDanhMucLoaiTaiSans, ...danhMucLoaiTaiSanCollection];
      jest.spyOn(danhMucLoaiTaiSanService, 'addDanhMucLoaiTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(danhMucLoaiTaiSanService.query).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiTaiSanCollection,
        ...additionalDanhMucLoaiTaiSans.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TinhTrangTaiSan query and add missing value', () => {
      const taiSan: ITaiSan = { id: 456 };
      const idTinhTrang: ITinhTrangTaiSan = { id: 30211 };
      taiSan.idTinhTrang = idTinhTrang;

      const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [{ id: 20882 }];
      jest.spyOn(tinhTrangTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: tinhTrangTaiSanCollection })));
      const additionalTinhTrangTaiSans = [idTinhTrang];
      const expectedCollection: ITinhTrangTaiSan[] = [...additionalTinhTrangTaiSans, ...tinhTrangTaiSanCollection];
      jest.spyOn(tinhTrangTaiSanService, 'addTinhTrangTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(tinhTrangTaiSanService.query).toHaveBeenCalled();
      expect(tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        tinhTrangTaiSanCollection,
        ...additionalTinhTrangTaiSans.map(expect.objectContaining),
      );
      expect(comp.tinhTrangTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taiSan: ITaiSan = { id: 456 };
      const idTsGoc: ITaiSan = { id: 26247 };
      taiSan.idTsGocs = [idTsGoc];
      const taiSan: ITaiSan = { id: 31848 };
      taiSan.taiSans = [taiSan];
      const idLoaiTs: IDanhMucLoaiTaiSan = { id: 25988 };
      taiSan.idLoaiTs = idLoaiTs;
      const idTinhTrang: ITinhTrangTaiSan = { id: 30323 };
      taiSan.idTinhTrang = idTinhTrang;

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(comp.taiSansSharedCollection).toContain(idTsGoc);
      expect(comp.taiSansSharedCollection).toContain(taiSan);
      expect(comp.danhMucLoaiTaiSansSharedCollection).toContain(idLoaiTs);
      expect(comp.tinhTrangTaiSansSharedCollection).toContain(idTinhTrang);
      expect(comp.taiSan).toEqual(taiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { id: 123 };
      jest.spyOn(taiSanFormService, 'getTaiSan').mockReturnValue(taiSan);
      jest.spyOn(taiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSan }));
      saveSubject.complete();

      // THEN
      expect(taiSanFormService.getTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanService.update).toHaveBeenCalledWith(expect.objectContaining(taiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { id: 123 };
      jest.spyOn(taiSanFormService, 'getTaiSan').mockReturnValue({ id: null });
      jest.spyOn(taiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSan }));
      saveSubject.complete();

      // THEN
      expect(taiSanFormService.getTaiSan).toHaveBeenCalled();
      expect(taiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { id: 123 };
      jest.spyOn(taiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTaiSan', () => {
      it('Should forward to taiSanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(taiSanService, 'compareTaiSan');
        comp.compareTaiSan(entity, entity2);
        expect(taiSanService.compareTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDanhMucLoaiTaiSan', () => {
      it('Should forward to danhMucLoaiTaiSanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucLoaiTaiSanService, 'compareDanhMucLoaiTaiSan');
        comp.compareDanhMucLoaiTaiSan(entity, entity2);
        expect(danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTinhTrangTaiSan', () => {
      it('Should forward to tinhTrangTaiSanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tinhTrangTaiSanService, 'compareTinhTrangTaiSan');
        comp.compareTinhTrangTaiSan(entity, entity2);
        expect(tinhTrangTaiSanService.compareTinhTrangTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
