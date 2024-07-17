import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucTinhTrangHonNhan } from 'app/entities/danh-muc-tinh-trang-hon-nhan/danh-muc-tinh-trang-hon-nhan.model';
import { DanhMucTinhTrangHonNhanService } from 'app/entities/danh-muc-tinh-trang-hon-nhan/service/danh-muc-tinh-trang-hon-nhan.service';
import { IDanhMucLoaiDuongSu } from 'app/entities/danh-muc-loai-duong-su/danh-muc-loai-duong-su.model';
import { DanhMucLoaiDuongSuService } from 'app/entities/danh-muc-loai-duong-su/service/danh-muc-loai-duong-su.service';
import { IDuongSu } from '../duong-su.model';
import { DuongSuService } from '../service/duong-su.service';
import { DuongSuFormService } from './duong-su-form.service';

import { DuongSuUpdateComponent } from './duong-su-update.component';

describe('DuongSu Management Update Component', () => {
  let comp: DuongSuUpdateComponent;
  let fixture: ComponentFixture<DuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let duongSuFormService: DuongSuFormService;
  let duongSuService: DuongSuService;
  let danhMucTinhTrangHonNhanService: DanhMucTinhTrangHonNhanService;
  let danhMucLoaiDuongSuService: DanhMucLoaiDuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DuongSuUpdateComponent],
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
      .overrideTemplate(DuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    duongSuFormService = TestBed.inject(DuongSuFormService);
    duongSuService = TestBed.inject(DuongSuService);
    danhMucTinhTrangHonNhanService = TestBed.inject(DanhMucTinhTrangHonNhanService);
    danhMucLoaiDuongSuService = TestBed.inject(DanhMucLoaiDuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call idTinhTrang query and add missing value', () => {
      const duongSu: IDuongSu = { id: 456 };
      const idTinhTrang: IDanhMucTinhTrangHonNhan = { id: 26691 };
      duongSu.idTinhTrang = idTinhTrang;

      const idTinhTrangCollection: IDanhMucTinhTrangHonNhan[] = [{ id: 30613 }];
      jest.spyOn(danhMucTinhTrangHonNhanService, 'query').mockReturnValue(of(new HttpResponse({ body: idTinhTrangCollection })));
      const expectedCollection: IDanhMucTinhTrangHonNhan[] = [idTinhTrang, ...idTinhTrangCollection];
      jest.spyOn(danhMucTinhTrangHonNhanService, 'addDanhMucTinhTrangHonNhanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      expect(danhMucTinhTrangHonNhanService.query).toHaveBeenCalled();
      expect(danhMucTinhTrangHonNhanService.addDanhMucTinhTrangHonNhanToCollectionIfMissing).toHaveBeenCalledWith(
        idTinhTrangCollection,
        idTinhTrang,
      );
      expect(comp.idTinhTrangsCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucLoaiDuongSu query and add missing value', () => {
      const duongSu: IDuongSu = { id: 456 };
      const idLoaiDs: IDanhMucLoaiDuongSu = { id: 31954 };
      duongSu.idLoaiDs = idLoaiDs;

      const danhMucLoaiDuongSuCollection: IDanhMucLoaiDuongSu[] = [{ id: 28063 }];
      jest.spyOn(danhMucLoaiDuongSuService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiDuongSuCollection })));
      const additionalDanhMucLoaiDuongSus = [idLoaiDs];
      const expectedCollection: IDanhMucLoaiDuongSu[] = [...additionalDanhMucLoaiDuongSus, ...danhMucLoaiDuongSuCollection];
      jest.spyOn(danhMucLoaiDuongSuService, 'addDanhMucLoaiDuongSuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      expect(danhMucLoaiDuongSuService.query).toHaveBeenCalled();
      expect(danhMucLoaiDuongSuService.addDanhMucLoaiDuongSuToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiDuongSuCollection,
        ...additionalDanhMucLoaiDuongSus.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiDuongSusSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const duongSu: IDuongSu = { id: 456 };
      const idTinhTrang: IDanhMucTinhTrangHonNhan = { id: 11605 };
      duongSu.idTinhTrang = idTinhTrang;
      const idLoaiDs: IDanhMucLoaiDuongSu = { id: 20916 };
      duongSu.idLoaiDs = idLoaiDs;

      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      expect(comp.idTinhTrangsCollection).toContain(idTinhTrang);
      expect(comp.danhMucLoaiDuongSusSharedCollection).toContain(idLoaiDs);
      expect(comp.duongSu).toEqual(duongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { id: 123 };
      jest.spyOn(duongSuFormService, 'getDuongSu').mockReturnValue(duongSu);
      jest.spyOn(duongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSu }));
      saveSubject.complete();

      // THEN
      expect(duongSuFormService.getDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(duongSuService.update).toHaveBeenCalledWith(expect.objectContaining(duongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { id: 123 };
      jest.spyOn(duongSuFormService, 'getDuongSu').mockReturnValue({ id: null });
      jest.spyOn(duongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSu }));
      saveSubject.complete();

      // THEN
      expect(duongSuFormService.getDuongSu).toHaveBeenCalled();
      expect(duongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { id: 123 };
      jest.spyOn(duongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(duongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucTinhTrangHonNhan', () => {
      it('Should forward to danhMucTinhTrangHonNhanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucTinhTrangHonNhanService, 'compareDanhMucTinhTrangHonNhan');
        comp.compareDanhMucTinhTrangHonNhan(entity, entity2);
        expect(danhMucTinhTrangHonNhanService.compareDanhMucTinhTrangHonNhan).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDanhMucLoaiDuongSu', () => {
      it('Should forward to danhMucLoaiDuongSuService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucLoaiDuongSuService, 'compareDanhMucLoaiDuongSu');
        comp.compareDanhMucLoaiDuongSu(entity, entity2);
        expect(danhMucLoaiDuongSuService.compareDanhMucLoaiDuongSu).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
