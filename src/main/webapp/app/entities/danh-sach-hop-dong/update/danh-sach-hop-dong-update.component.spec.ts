import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IHopDongCongChung } from 'app/entities/hop-dong-cong-chung/hop-dong-cong-chung.model';
import { HopDongCongChungService } from 'app/entities/hop-dong-cong-chung/service/hop-dong-cong-chung.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';
import { DanhSachHopDongFormService } from './danh-sach-hop-dong-form.service';

import { DanhSachHopDongUpdateComponent } from './danh-sach-hop-dong-update.component';

describe('DanhSachHopDong Management Update Component', () => {
  let comp: DanhSachHopDongUpdateComponent;
  let fixture: ComponentFixture<DanhSachHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhSachHopDongFormService: DanhSachHopDongFormService;
  let danhSachHopDongService: DanhSachHopDongService;
  let hopDongCongChungService: HopDongCongChungService;
  let soCongChungService: SoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachHopDongUpdateComponent],
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
      .overrideTemplate(DanhSachHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhSachHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhSachHopDongFormService = TestBed.inject(DanhSachHopDongFormService);
    danhSachHopDongService = TestBed.inject(DanhSachHopDongService);
    hopDongCongChungService = TestBed.inject(HopDongCongChungService);
    soCongChungService = TestBed.inject(SoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call HopDongCongChung query and add missing value', () => {
      const danhSachHopDong: IDanhSachHopDong = { id: 456 };
      const idHopDong: IHopDongCongChung = { id: 14513 };
      danhSachHopDong.idHopDong = idHopDong;

      const hopDongCongChungCollection: IHopDongCongChung[] = [{ id: 12446 }];
      jest.spyOn(hopDongCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: hopDongCongChungCollection })));
      const additionalHopDongCongChungs = [idHopDong];
      const expectedCollection: IHopDongCongChung[] = [...additionalHopDongCongChungs, ...hopDongCongChungCollection];
      jest.spyOn(hopDongCongChungService, 'addHopDongCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      expect(hopDongCongChungService.query).toHaveBeenCalled();
      expect(hopDongCongChungService.addHopDongCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        hopDongCongChungCollection,
        ...additionalHopDongCongChungs.map(expect.objectContaining),
      );
      expect(comp.hopDongCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SoCongChung query and add missing value', () => {
      const danhSachHopDong: IDanhSachHopDong = { id: 456 };
      const idSoCongChung: ISoCongChung = { id: 27776 };
      danhSachHopDong.idSoCongChung = idSoCongChung;

      const soCongChungCollection: ISoCongChung[] = [{ id: 20165 }];
      jest.spyOn(soCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: soCongChungCollection })));
      const additionalSoCongChungs = [idSoCongChung];
      const expectedCollection: ISoCongChung[] = [...additionalSoCongChungs, ...soCongChungCollection];
      jest.spyOn(soCongChungService, 'addSoCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      expect(soCongChungService.query).toHaveBeenCalled();
      expect(soCongChungService.addSoCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        soCongChungCollection,
        ...additionalSoCongChungs.map(expect.objectContaining),
      );
      expect(comp.soCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhSachHopDong: IDanhSachHopDong = { id: 456 };
      const idHopDong: IHopDongCongChung = { id: 23222 };
      danhSachHopDong.idHopDong = idHopDong;
      const idSoCongChung: ISoCongChung = { id: 7507 };
      danhSachHopDong.idSoCongChung = idSoCongChung;

      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      expect(comp.hopDongCongChungsSharedCollection).toContain(idHopDong);
      expect(comp.soCongChungsSharedCollection).toContain(idSoCongChung);
      expect(comp.danhSachHopDong).toEqual(danhSachHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { id: 123 };
      jest.spyOn(danhSachHopDongFormService, 'getDanhSachHopDong').mockReturnValue(danhSachHopDong);
      jest.spyOn(danhSachHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhSachHopDongFormService.getDanhSachHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhSachHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(danhSachHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { id: 123 };
      jest.spyOn(danhSachHopDongFormService, 'getDanhSachHopDong').mockReturnValue({ id: null });
      jest.spyOn(danhSachHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhSachHopDongFormService.getDanhSachHopDong).toHaveBeenCalled();
      expect(danhSachHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { id: 123 };
      jest.spyOn(danhSachHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhSachHopDongService.update).toHaveBeenCalled();
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
