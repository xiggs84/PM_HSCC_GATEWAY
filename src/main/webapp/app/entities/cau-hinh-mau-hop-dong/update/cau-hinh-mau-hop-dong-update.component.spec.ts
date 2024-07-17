import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { IPhanLoaiHopDong } from 'app/entities/phan-loai-hop-dong/phan-loai-hop-dong.model';
import { PhanLoaiHopDongService } from 'app/entities/phan-loai-hop-dong/service/phan-loai-hop-dong.service';
import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';
import { CauHinhMauHopDongFormService } from './cau-hinh-mau-hop-dong-form.service';

import { CauHinhMauHopDongUpdateComponent } from './cau-hinh-mau-hop-dong-update.component';

describe('CauHinhMauHopDong Management Update Component', () => {
  let comp: CauHinhMauHopDongUpdateComponent;
  let fixture: ComponentFixture<CauHinhMauHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cauHinhMauHopDongFormService: CauHinhMauHopDongFormService;
  let cauHinhMauHopDongService: CauHinhMauHopDongService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;
  let phanLoaiHopDongService: PhanLoaiHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhMauHopDongUpdateComponent],
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
      .overrideTemplate(CauHinhMauHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CauHinhMauHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cauHinhMauHopDongFormService = TestBed.inject(CauHinhMauHopDongFormService);
    cauHinhMauHopDongService = TestBed.inject(CauHinhMauHopDongService);
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);
    phanLoaiHopDongService = TestBed.inject(PhanLoaiHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiHopDong query and add missing value', () => {
      const cauHinhMauHopDong: ICauHinhMauHopDong = { id: 456 };
      const idLoaiHD: IDanhMucLoaiHopDong = { id: 9183 };
      cauHinhMauHopDong.idLoaiHD = idLoaiHD;

      const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [{ id: 20457 }];
      jest.spyOn(danhMucLoaiHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiHopDongCollection })));
      const additionalDanhMucLoaiHopDongs = [idLoaiHD];
      const expectedCollection: IDanhMucLoaiHopDong[] = [...additionalDanhMucLoaiHopDongs, ...danhMucLoaiHopDongCollection];
      jest.spyOn(danhMucLoaiHopDongService, 'addDanhMucLoaiHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      expect(danhMucLoaiHopDongService.query).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiHopDongCollection,
        ...additionalDanhMucLoaiHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PhanLoaiHopDong query and add missing value', () => {
      const cauHinhMauHopDong: ICauHinhMauHopDong = { id: 456 };
      const idPhanLoaiHD: IPhanLoaiHopDong = { id: 22386 };
      cauHinhMauHopDong.idPhanLoaiHD = idPhanLoaiHD;

      const phanLoaiHopDongCollection: IPhanLoaiHopDong[] = [{ id: 14060 }];
      jest.spyOn(phanLoaiHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: phanLoaiHopDongCollection })));
      const additionalPhanLoaiHopDongs = [idPhanLoaiHD];
      const expectedCollection: IPhanLoaiHopDong[] = [...additionalPhanLoaiHopDongs, ...phanLoaiHopDongCollection];
      jest.spyOn(phanLoaiHopDongService, 'addPhanLoaiHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      expect(phanLoaiHopDongService.query).toHaveBeenCalled();
      expect(phanLoaiHopDongService.addPhanLoaiHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        phanLoaiHopDongCollection,
        ...additionalPhanLoaiHopDongs.map(expect.objectContaining),
      );
      expect(comp.phanLoaiHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cauHinhMauHopDong: ICauHinhMauHopDong = { id: 456 };
      const idLoaiHD: IDanhMucLoaiHopDong = { id: 8112 };
      cauHinhMauHopDong.idLoaiHD = idLoaiHD;
      const idPhanLoaiHD: IPhanLoaiHopDong = { id: 10144 };
      cauHinhMauHopDong.idPhanLoaiHD = idPhanLoaiHD;

      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      expect(comp.danhMucLoaiHopDongsSharedCollection).toContain(idLoaiHD);
      expect(comp.phanLoaiHopDongsSharedCollection).toContain(idPhanLoaiHD);
      expect(comp.cauHinhMauHopDong).toEqual(cauHinhMauHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauHopDong>>();
      const cauHinhMauHopDong = { id: 123 };
      jest.spyOn(cauHinhMauHopDongFormService, 'getCauHinhMauHopDong').mockReturnValue(cauHinhMauHopDong);
      jest.spyOn(cauHinhMauHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhMauHopDong }));
      saveSubject.complete();

      // THEN
      expect(cauHinhMauHopDongFormService.getCauHinhMauHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cauHinhMauHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(cauHinhMauHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauHopDong>>();
      const cauHinhMauHopDong = { id: 123 };
      jest.spyOn(cauHinhMauHopDongFormService, 'getCauHinhMauHopDong').mockReturnValue({ id: null });
      jest.spyOn(cauHinhMauHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhMauHopDong }));
      saveSubject.complete();

      // THEN
      expect(cauHinhMauHopDongFormService.getCauHinhMauHopDong).toHaveBeenCalled();
      expect(cauHinhMauHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauHopDong>>();
      const cauHinhMauHopDong = { id: 123 };
      jest.spyOn(cauHinhMauHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cauHinhMauHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucLoaiHopDong', () => {
      it('Should forward to danhMucLoaiHopDongService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucLoaiHopDongService, 'compareDanhMucLoaiHopDong');
        comp.compareDanhMucLoaiHopDong(entity, entity2);
        expect(danhMucLoaiHopDongService.compareDanhMucLoaiHopDong).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePhanLoaiHopDong', () => {
      it('Should forward to phanLoaiHopDongService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(phanLoaiHopDongService, 'comparePhanLoaiHopDong');
        comp.comparePhanLoaiHopDong(entity, entity2);
        expect(phanLoaiHopDongService.comparePhanLoaiHopDong).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
