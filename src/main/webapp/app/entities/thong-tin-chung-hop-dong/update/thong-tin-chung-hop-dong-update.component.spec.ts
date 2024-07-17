import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IHopDongCongChung } from 'app/entities/hop-dong-cong-chung/hop-dong-cong-chung.model';
import { HopDongCongChungService } from 'app/entities/hop-dong-cong-chung/service/hop-dong-cong-chung.service';
import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import { ThongTinChungHopDongService } from '../service/thong-tin-chung-hop-dong.service';
import { ThongTinChungHopDongFormService } from './thong-tin-chung-hop-dong-form.service';

import { ThongTinChungHopDongUpdateComponent } from './thong-tin-chung-hop-dong-update.component';

describe('ThongTinChungHopDong Management Update Component', () => {
  let comp: ThongTinChungHopDongUpdateComponent;
  let fixture: ComponentFixture<ThongTinChungHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thongTinChungHopDongFormService: ThongTinChungHopDongFormService;
  let thongTinChungHopDongService: ThongTinChungHopDongService;
  let hopDongCongChungService: HopDongCongChungService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;
  let soCongChungService: SoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThongTinChungHopDongUpdateComponent],
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
      .overrideTemplate(ThongTinChungHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThongTinChungHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thongTinChungHopDongFormService = TestBed.inject(ThongTinChungHopDongFormService);
    thongTinChungHopDongService = TestBed.inject(ThongTinChungHopDongService);
    hopDongCongChungService = TestBed.inject(HopDongCongChungService);
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);
    soCongChungService = TestBed.inject(SoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call HopDongCongChung query and add missing value', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };
      const idHopDong: IHopDongCongChung = { id: 2687 };
      thongTinChungHopDong.idHopDong = idHopDong;

      const hopDongCongChungCollection: IHopDongCongChung[] = [{ id: 8507 }];
      jest.spyOn(hopDongCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: hopDongCongChungCollection })));
      const additionalHopDongCongChungs = [idHopDong];
      const expectedCollection: IHopDongCongChung[] = [...additionalHopDongCongChungs, ...hopDongCongChungCollection];
      jest.spyOn(hopDongCongChungService, 'addHopDongCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(hopDongCongChungService.query).toHaveBeenCalled();
      expect(hopDongCongChungService.addHopDongCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        hopDongCongChungCollection,
        ...additionalHopDongCongChungs.map(expect.objectContaining),
      );
      expect(comp.hopDongCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucLoaiHopDong query and add missing value', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };
      const idLoaiHD: IDanhMucLoaiHopDong = { id: 25348 };
      thongTinChungHopDong.idLoaiHD = idLoaiHD;

      const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [{ id: 564 }];
      jest.spyOn(danhMucLoaiHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiHopDongCollection })));
      const additionalDanhMucLoaiHopDongs = [idLoaiHD];
      const expectedCollection: IDanhMucLoaiHopDong[] = [...additionalDanhMucLoaiHopDongs, ...danhMucLoaiHopDongCollection];
      jest.spyOn(danhMucLoaiHopDongService, 'addDanhMucLoaiHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(danhMucLoaiHopDongService.query).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiHopDongCollection,
        ...additionalDanhMucLoaiHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SoCongChung query and add missing value', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };
      const idSoCongChung: ISoCongChung = { id: 10578 };
      thongTinChungHopDong.idSoCongChung = idSoCongChung;

      const soCongChungCollection: ISoCongChung[] = [{ id: 28777 }];
      jest.spyOn(soCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: soCongChungCollection })));
      const additionalSoCongChungs = [idSoCongChung];
      const expectedCollection: ISoCongChung[] = [...additionalSoCongChungs, ...soCongChungCollection];
      jest.spyOn(soCongChungService, 'addSoCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(soCongChungService.query).toHaveBeenCalled();
      expect(soCongChungService.addSoCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        soCongChungCollection,
        ...additionalSoCongChungs.map(expect.objectContaining),
      );
      expect(comp.soCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };
      const idHopDong: IHopDongCongChung = { id: 28368 };
      thongTinChungHopDong.idHopDong = idHopDong;
      const idLoaiHD: IDanhMucLoaiHopDong = { id: 4553 };
      thongTinChungHopDong.idLoaiHD = idLoaiHD;
      const idSoCongChung: ISoCongChung = { id: 3955 };
      thongTinChungHopDong.idSoCongChung = idSoCongChung;

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(comp.hopDongCongChungsSharedCollection).toContain(idHopDong);
      expect(comp.danhMucLoaiHopDongsSharedCollection).toContain(idLoaiHD);
      expect(comp.soCongChungsSharedCollection).toContain(idSoCongChung);
      expect(comp.thongTinChungHopDong).toEqual(thongTinChungHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinChungHopDong>>();
      const thongTinChungHopDong = { id: 123 };
      jest.spyOn(thongTinChungHopDongFormService, 'getThongTinChungHopDong').mockReturnValue(thongTinChungHopDong);
      jest.spyOn(thongTinChungHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinChungHopDong }));
      saveSubject.complete();

      // THEN
      expect(thongTinChungHopDongFormService.getThongTinChungHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(thongTinChungHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(thongTinChungHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinChungHopDong>>();
      const thongTinChungHopDong = { id: 123 };
      jest.spyOn(thongTinChungHopDongFormService, 'getThongTinChungHopDong').mockReturnValue({ id: null });
      jest.spyOn(thongTinChungHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinChungHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinChungHopDong }));
      saveSubject.complete();

      // THEN
      expect(thongTinChungHopDongFormService.getThongTinChungHopDong).toHaveBeenCalled();
      expect(thongTinChungHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinChungHopDong>>();
      const thongTinChungHopDong = { id: 123 };
      jest.spyOn(thongTinChungHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thongTinChungHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareHopDongCongChung', () => {
      it('Should forward to hopDongCongChungService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(hopDongCongChungService, 'compareHopDongCongChung');
        comp.compareHopDongCongChung(entity, entity2);
        expect(hopDongCongChungService.compareHopDongCongChung).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDanhMucLoaiHopDong', () => {
      it('Should forward to danhMucLoaiHopDongService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucLoaiHopDongService, 'compareDanhMucLoaiHopDong');
        comp.compareDanhMucLoaiHopDong(entity, entity2);
        expect(danhMucLoaiHopDongService.compareDanhMucLoaiHopDong).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSoCongChung', () => {
      it('Should forward to soCongChungService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(soCongChungService, 'compareSoCongChung');
        comp.compareSoCongChung(entity, entity2);
        expect(soCongChungService.compareSoCongChung).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
