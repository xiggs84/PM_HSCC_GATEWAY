import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CauHinhThongTinDuongSuService } from '../service/cau-hinh-thong-tin-duong-su.service';
import { ICauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';
import { CauHinhThongTinDuongSuFormService } from './cau-hinh-thong-tin-duong-su-form.service';

import { CauHinhThongTinDuongSuUpdateComponent } from './cau-hinh-thong-tin-duong-su-update.component';

describe('CauHinhThongTinDuongSu Management Update Component', () => {
  let comp: CauHinhThongTinDuongSuUpdateComponent;
  let fixture: ComponentFixture<CauHinhThongTinDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cauHinhThongTinDuongSuFormService: CauHinhThongTinDuongSuFormService;
  let cauHinhThongTinDuongSuService: CauHinhThongTinDuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhThongTinDuongSuUpdateComponent],
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
      .overrideTemplate(CauHinhThongTinDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CauHinhThongTinDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cauHinhThongTinDuongSuFormService = TestBed.inject(CauHinhThongTinDuongSuFormService);
    cauHinhThongTinDuongSuService = TestBed.inject(CauHinhThongTinDuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu = { id: 456 };

      activatedRoute.data = of({ cauHinhThongTinDuongSu });
      comp.ngOnInit();

      expect(comp.cauHinhThongTinDuongSu).toEqual(cauHinhThongTinDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhThongTinDuongSu>>();
      const cauHinhThongTinDuongSu = { id: 123 };
      jest.spyOn(cauHinhThongTinDuongSuFormService, 'getCauHinhThongTinDuongSu').mockReturnValue(cauHinhThongTinDuongSu);
      jest.spyOn(cauHinhThongTinDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhThongTinDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhThongTinDuongSu }));
      saveSubject.complete();

      // THEN
      expect(cauHinhThongTinDuongSuFormService.getCauHinhThongTinDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cauHinhThongTinDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(cauHinhThongTinDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhThongTinDuongSu>>();
      const cauHinhThongTinDuongSu = { id: 123 };
      jest.spyOn(cauHinhThongTinDuongSuFormService, 'getCauHinhThongTinDuongSu').mockReturnValue({ id: null });
      jest.spyOn(cauHinhThongTinDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhThongTinDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhThongTinDuongSu }));
      saveSubject.complete();

      // THEN
      expect(cauHinhThongTinDuongSuFormService.getCauHinhThongTinDuongSu).toHaveBeenCalled();
      expect(cauHinhThongTinDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhThongTinDuongSu>>();
      const cauHinhThongTinDuongSu = { id: 123 };
      jest.spyOn(cauHinhThongTinDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhThongTinDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cauHinhThongTinDuongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
