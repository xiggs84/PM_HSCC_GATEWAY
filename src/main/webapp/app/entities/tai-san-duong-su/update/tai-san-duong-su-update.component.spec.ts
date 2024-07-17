import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { TaiSanDuongSuService } from '../service/tai-san-duong-su.service';
import { ITaiSanDuongSu } from '../tai-san-duong-su.model';
import { TaiSanDuongSuFormService } from './tai-san-duong-su-form.service';

import { TaiSanDuongSuUpdateComponent } from './tai-san-duong-su-update.component';

describe('TaiSanDuongSu Management Update Component', () => {
  let comp: TaiSanDuongSuUpdateComponent;
  let fixture: ComponentFixture<TaiSanDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanDuongSuFormService: TaiSanDuongSuFormService;
  let taiSanDuongSuService: TaiSanDuongSuService;
  let taiSanService: TaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDuongSuUpdateComponent],
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
      .overrideTemplate(TaiSanDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanDuongSuFormService = TestBed.inject(TaiSanDuongSuFormService);
    taiSanDuongSuService = TestBed.inject(TaiSanDuongSuService);
    taiSanService = TestBed.inject(TaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call idTaiSan query and add missing value', () => {
      const taiSanDuongSu: ITaiSanDuongSu = { id: 456 };
      const idTaiSan: ITaiSan = { id: 1280 };
      taiSanDuongSu.idTaiSan = idTaiSan;

      const idTaiSanCollection: ITaiSan[] = [{ id: 5152 }];
      jest.spyOn(taiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: idTaiSanCollection })));
      const expectedCollection: ITaiSan[] = [idTaiSan, ...idTaiSanCollection];
      jest.spyOn(taiSanService, 'addTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      expect(taiSanService.query).toHaveBeenCalled();
      expect(taiSanService.addTaiSanToCollectionIfMissing).toHaveBeenCalledWith(idTaiSanCollection, idTaiSan);
      expect(comp.idTaiSansCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taiSanDuongSu: ITaiSanDuongSu = { id: 456 };
      const idTaiSan: ITaiSan = { id: 20913 };
      taiSanDuongSu.idTaiSan = idTaiSan;

      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      expect(comp.idTaiSansCollection).toContain(idTaiSan);
      expect(comp.taiSanDuongSu).toEqual(taiSanDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDuongSu>>();
      const taiSanDuongSu = { id: 123 };
      jest.spyOn(taiSanDuongSuFormService, 'getTaiSanDuongSu').mockReturnValue(taiSanDuongSu);
      jest.spyOn(taiSanDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDuongSu }));
      saveSubject.complete();

      // THEN
      expect(taiSanDuongSuFormService.getTaiSanDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(taiSanDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDuongSu>>();
      const taiSanDuongSu = { id: 123 };
      jest.spyOn(taiSanDuongSuFormService, 'getTaiSanDuongSu').mockReturnValue({ id: null });
      jest.spyOn(taiSanDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDuongSu }));
      saveSubject.complete();

      // THEN
      expect(taiSanDuongSuFormService.getTaiSanDuongSu).toHaveBeenCalled();
      expect(taiSanDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDuongSu>>();
      const taiSanDuongSu = { id: 123 };
      jest.spyOn(taiSanDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanDuongSuService.update).toHaveBeenCalled();
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
  });
});
