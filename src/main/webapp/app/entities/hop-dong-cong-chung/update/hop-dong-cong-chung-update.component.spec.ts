import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { IHopDongCongChung } from '../hop-dong-cong-chung.model';
import { HopDongCongChungService } from '../service/hop-dong-cong-chung.service';
import { HopDongCongChungFormService } from './hop-dong-cong-chung-form.service';

import { HopDongCongChungUpdateComponent } from './hop-dong-cong-chung-update.component';

describe('HopDongCongChung Management Update Component', () => {
  let comp: HopDongCongChungUpdateComponent;
  let fixture: ComponentFixture<HopDongCongChungUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hopDongCongChungFormService: HopDongCongChungFormService;
  let hopDongCongChungService: HopDongCongChungService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;
  let soCongChungService: SoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HopDongCongChungUpdateComponent],
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
      .overrideTemplate(HopDongCongChungUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HopDongCongChungUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hopDongCongChungFormService = TestBed.inject(HopDongCongChungFormService);
    hopDongCongChungService = TestBed.inject(HopDongCongChungService);
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);
    soCongChungService = TestBed.inject(SoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiHopDong query and add missing value', () => {
      const hopDongCongChung: IHopDongCongChung = { id: 456 };
      const idLoaiHD: IDanhMucLoaiHopDong = { id: 11945 };
      hopDongCongChung.idLoaiHD = idLoaiHD;

      const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [{ id: 25166 }];
      jest.spyOn(danhMucLoaiHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiHopDongCollection })));
      const additionalDanhMucLoaiHopDongs = [idLoaiHD];
      const expectedCollection: IDanhMucLoaiHopDong[] = [...additionalDanhMucLoaiHopDongs, ...danhMucLoaiHopDongCollection];
      jest.spyOn(danhMucLoaiHopDongService, 'addDanhMucLoaiHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      expect(danhMucLoaiHopDongService.query).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiHopDongCollection,
        ...additionalDanhMucLoaiHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SoCongChung query and add missing value', () => {
      const hopDongCongChung: IHopDongCongChung = { id: 456 };
      const idSoCongChung: ISoCongChung = { id: 22943 };
      hopDongCongChung.idSoCongChung = idSoCongChung;

      const soCongChungCollection: ISoCongChung[] = [{ id: 11113 }];
      jest.spyOn(soCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: soCongChungCollection })));
      const additionalSoCongChungs = [idSoCongChung];
      const expectedCollection: ISoCongChung[] = [...additionalSoCongChungs, ...soCongChungCollection];
      jest.spyOn(soCongChungService, 'addSoCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      expect(soCongChungService.query).toHaveBeenCalled();
      expect(soCongChungService.addSoCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        soCongChungCollection,
        ...additionalSoCongChungs.map(expect.objectContaining),
      );
      expect(comp.soCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const hopDongCongChung: IHopDongCongChung = { id: 456 };
      const idLoaiHD: IDanhMucLoaiHopDong = { id: 1526 };
      hopDongCongChung.idLoaiHD = idLoaiHD;
      const idSoCongChung: ISoCongChung = { id: 14902 };
      hopDongCongChung.idSoCongChung = idSoCongChung;

      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      expect(comp.danhMucLoaiHopDongsSharedCollection).toContain(idLoaiHD);
      expect(comp.soCongChungsSharedCollection).toContain(idSoCongChung);
      expect(comp.hopDongCongChung).toEqual(hopDongCongChung);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHopDongCongChung>>();
      const hopDongCongChung = { id: 123 };
      jest.spyOn(hopDongCongChungFormService, 'getHopDongCongChung').mockReturnValue(hopDongCongChung);
      jest.spyOn(hopDongCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hopDongCongChung }));
      saveSubject.complete();

      // THEN
      expect(hopDongCongChungFormService.getHopDongCongChung).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(hopDongCongChungService.update).toHaveBeenCalledWith(expect.objectContaining(hopDongCongChung));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHopDongCongChung>>();
      const hopDongCongChung = { id: 123 };
      jest.spyOn(hopDongCongChungFormService, 'getHopDongCongChung').mockReturnValue({ id: null });
      jest.spyOn(hopDongCongChungService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hopDongCongChung: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hopDongCongChung }));
      saveSubject.complete();

      // THEN
      expect(hopDongCongChungFormService.getHopDongCongChung).toHaveBeenCalled();
      expect(hopDongCongChungService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHopDongCongChung>>();
      const hopDongCongChung = { id: 123 };
      jest.spyOn(hopDongCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hopDongCongChungService.update).toHaveBeenCalled();
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
