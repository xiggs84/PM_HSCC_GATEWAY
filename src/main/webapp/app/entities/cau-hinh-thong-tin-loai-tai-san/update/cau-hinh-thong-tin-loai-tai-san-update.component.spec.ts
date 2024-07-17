import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CauHinhThongTinLoaiTaiSanService } from '../service/cau-hinh-thong-tin-loai-tai-san.service';
import { ICauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';
import { CauHinhThongTinLoaiTaiSanFormService } from './cau-hinh-thong-tin-loai-tai-san-form.service';

import { CauHinhThongTinLoaiTaiSanUpdateComponent } from './cau-hinh-thong-tin-loai-tai-san-update.component';

describe('CauHinhThongTinLoaiTaiSan Management Update Component', () => {
  let comp: CauHinhThongTinLoaiTaiSanUpdateComponent;
  let fixture: ComponentFixture<CauHinhThongTinLoaiTaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cauHinhThongTinLoaiTaiSanFormService: CauHinhThongTinLoaiTaiSanFormService;
  let cauHinhThongTinLoaiTaiSanService: CauHinhThongTinLoaiTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhThongTinLoaiTaiSanUpdateComponent],
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
      .overrideTemplate(CauHinhThongTinLoaiTaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CauHinhThongTinLoaiTaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cauHinhThongTinLoaiTaiSanFormService = TestBed.inject(CauHinhThongTinLoaiTaiSanFormService);
    cauHinhThongTinLoaiTaiSanService = TestBed.inject(CauHinhThongTinLoaiTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan = { id: 456 };

      activatedRoute.data = of({ cauHinhThongTinLoaiTaiSan });
      comp.ngOnInit();

      expect(comp.cauHinhThongTinLoaiTaiSan).toEqual(cauHinhThongTinLoaiTaiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhThongTinLoaiTaiSan>>();
      const cauHinhThongTinLoaiTaiSan = { id: 123 };
      jest.spyOn(cauHinhThongTinLoaiTaiSanFormService, 'getCauHinhThongTinLoaiTaiSan').mockReturnValue(cauHinhThongTinLoaiTaiSan);
      jest.spyOn(cauHinhThongTinLoaiTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhThongTinLoaiTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhThongTinLoaiTaiSan }));
      saveSubject.complete();

      // THEN
      expect(cauHinhThongTinLoaiTaiSanFormService.getCauHinhThongTinLoaiTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cauHinhThongTinLoaiTaiSanService.update).toHaveBeenCalledWith(expect.objectContaining(cauHinhThongTinLoaiTaiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhThongTinLoaiTaiSan>>();
      const cauHinhThongTinLoaiTaiSan = { id: 123 };
      jest.spyOn(cauHinhThongTinLoaiTaiSanFormService, 'getCauHinhThongTinLoaiTaiSan').mockReturnValue({ id: null });
      jest.spyOn(cauHinhThongTinLoaiTaiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhThongTinLoaiTaiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhThongTinLoaiTaiSan }));
      saveSubject.complete();

      // THEN
      expect(cauHinhThongTinLoaiTaiSanFormService.getCauHinhThongTinLoaiTaiSan).toHaveBeenCalled();
      expect(cauHinhThongTinLoaiTaiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhThongTinLoaiTaiSan>>();
      const cauHinhThongTinLoaiTaiSan = { id: 123 };
      jest.spyOn(cauHinhThongTinLoaiTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhThongTinLoaiTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cauHinhThongTinLoaiTaiSanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
