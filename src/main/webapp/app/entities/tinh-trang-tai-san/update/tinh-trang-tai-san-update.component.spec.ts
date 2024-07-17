import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TinhTrangTaiSanService } from '../service/tinh-trang-tai-san.service';
import { ITinhTrangTaiSan } from '../tinh-trang-tai-san.model';
import { TinhTrangTaiSanFormService } from './tinh-trang-tai-san-form.service';

import { TinhTrangTaiSanUpdateComponent } from './tinh-trang-tai-san-update.component';

describe('TinhTrangTaiSan Management Update Component', () => {
  let comp: TinhTrangTaiSanUpdateComponent;
  let fixture: ComponentFixture<TinhTrangTaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tinhTrangTaiSanFormService: TinhTrangTaiSanFormService;
  let tinhTrangTaiSanService: TinhTrangTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TinhTrangTaiSanUpdateComponent],
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
      .overrideTemplate(TinhTrangTaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TinhTrangTaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tinhTrangTaiSanFormService = TestBed.inject(TinhTrangTaiSanFormService);
    tinhTrangTaiSanService = TestBed.inject(TinhTrangTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tinhTrangTaiSan: ITinhTrangTaiSan = { id: 456 };

      activatedRoute.data = of({ tinhTrangTaiSan });
      comp.ngOnInit();

      expect(comp.tinhTrangTaiSan).toEqual(tinhTrangTaiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITinhTrangTaiSan>>();
      const tinhTrangTaiSan = { id: 123 };
      jest.spyOn(tinhTrangTaiSanFormService, 'getTinhTrangTaiSan').mockReturnValue(tinhTrangTaiSan);
      jest.spyOn(tinhTrangTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tinhTrangTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tinhTrangTaiSan }));
      saveSubject.complete();

      // THEN
      expect(tinhTrangTaiSanFormService.getTinhTrangTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tinhTrangTaiSanService.update).toHaveBeenCalledWith(expect.objectContaining(tinhTrangTaiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITinhTrangTaiSan>>();
      const tinhTrangTaiSan = { id: 123 };
      jest.spyOn(tinhTrangTaiSanFormService, 'getTinhTrangTaiSan').mockReturnValue({ id: null });
      jest.spyOn(tinhTrangTaiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tinhTrangTaiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tinhTrangTaiSan }));
      saveSubject.complete();

      // THEN
      expect(tinhTrangTaiSanFormService.getTinhTrangTaiSan).toHaveBeenCalled();
      expect(tinhTrangTaiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITinhTrangTaiSan>>();
      const tinhTrangTaiSan = { id: 123 };
      jest.spyOn(tinhTrangTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tinhTrangTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tinhTrangTaiSanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
