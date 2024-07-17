import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { DanhSachTaiSanService } from '../service/danh-sach-tai-san.service';
import { IDanhSachTaiSan } from '../danh-sach-tai-san.model';
import { DanhSachTaiSanFormService } from './danh-sach-tai-san-form.service';

import { DanhSachTaiSanUpdateComponent } from './danh-sach-tai-san-update.component';

describe('DanhSachTaiSan Management Update Component', () => {
  let comp: DanhSachTaiSanUpdateComponent;
  let fixture: ComponentFixture<DanhSachTaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhSachTaiSanFormService: DanhSachTaiSanFormService;
  let danhSachTaiSanService: DanhSachTaiSanService;
  let danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachTaiSanUpdateComponent],
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
      .overrideTemplate(DanhSachTaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhSachTaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhSachTaiSanFormService = TestBed.inject(DanhSachTaiSanFormService);
    danhSachTaiSanService = TestBed.inject(DanhSachTaiSanService);
    danhMucLoaiTaiSanService = TestBed.inject(DanhMucLoaiTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiTaiSan query and add missing value', () => {
      const danhSachTaiSan: IDanhSachTaiSan = { id: 456 };
      const idLoaiTs: IDanhMucLoaiTaiSan = { id: 3159 };
      danhSachTaiSan.idLoaiTs = idLoaiTs;

      const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [{ id: 30308 }];
      jest.spyOn(danhMucLoaiTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiTaiSanCollection })));
      const additionalDanhMucLoaiTaiSans = [idLoaiTs];
      const expectedCollection: IDanhMucLoaiTaiSan[] = [...additionalDanhMucLoaiTaiSans, ...danhMucLoaiTaiSanCollection];
      jest.spyOn(danhMucLoaiTaiSanService, 'addDanhMucLoaiTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhSachTaiSan });
      comp.ngOnInit();

      expect(danhMucLoaiTaiSanService.query).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiTaiSanCollection,
        ...additionalDanhMucLoaiTaiSans.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhSachTaiSan: IDanhSachTaiSan = { id: 456 };
      const idLoaiTs: IDanhMucLoaiTaiSan = { id: 1741 };
      danhSachTaiSan.idLoaiTs = idLoaiTs;

      activatedRoute.data = of({ danhSachTaiSan });
      comp.ngOnInit();

      expect(comp.danhMucLoaiTaiSansSharedCollection).toContain(idLoaiTs);
      expect(comp.danhSachTaiSan).toEqual(danhSachTaiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachTaiSan>>();
      const danhSachTaiSan = { id: 123 };
      jest.spyOn(danhSachTaiSanFormService, 'getDanhSachTaiSan').mockReturnValue(danhSachTaiSan);
      jest.spyOn(danhSachTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachTaiSan }));
      saveSubject.complete();

      // THEN
      expect(danhSachTaiSanFormService.getDanhSachTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhSachTaiSanService.update).toHaveBeenCalledWith(expect.objectContaining(danhSachTaiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachTaiSan>>();
      const danhSachTaiSan = { id: 123 };
      jest.spyOn(danhSachTaiSanFormService, 'getDanhSachTaiSan').mockReturnValue({ id: null });
      jest.spyOn(danhSachTaiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachTaiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachTaiSan }));
      saveSubject.complete();

      // THEN
      expect(danhSachTaiSanFormService.getDanhSachTaiSan).toHaveBeenCalled();
      expect(danhSachTaiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachTaiSan>>();
      const danhSachTaiSan = { id: 123 };
      jest.spyOn(danhSachTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhSachTaiSanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucLoaiTaiSan', () => {
      it('Should forward to danhMucLoaiTaiSanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucLoaiTaiSanService, 'compareDanhMucLoaiTaiSan');
        comp.compareDanhMucLoaiTaiSan(entity, entity2);
        expect(danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
