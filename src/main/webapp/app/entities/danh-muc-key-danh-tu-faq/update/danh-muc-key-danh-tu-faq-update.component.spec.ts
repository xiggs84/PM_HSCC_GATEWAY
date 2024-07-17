import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucKeyDanhTuFaqService } from '../service/danh-muc-key-danh-tu-faq.service';
import { IDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';
import { DanhMucKeyDanhTuFaqFormService } from './danh-muc-key-danh-tu-faq-form.service';

import { DanhMucKeyDanhTuFaqUpdateComponent } from './danh-muc-key-danh-tu-faq-update.component';

describe('DanhMucKeyDanhTuFaq Management Update Component', () => {
  let comp: DanhMucKeyDanhTuFaqUpdateComponent;
  let fixture: ComponentFixture<DanhMucKeyDanhTuFaqUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucKeyDanhTuFaqFormService: DanhMucKeyDanhTuFaqFormService;
  let danhMucKeyDanhTuFaqService: DanhMucKeyDanhTuFaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucKeyDanhTuFaqUpdateComponent],
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
      .overrideTemplate(DanhMucKeyDanhTuFaqUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucKeyDanhTuFaqUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucKeyDanhTuFaqFormService = TestBed.inject(DanhMucKeyDanhTuFaqFormService);
    danhMucKeyDanhTuFaqService = TestBed.inject(DanhMucKeyDanhTuFaqService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq = { id: 456 };

      activatedRoute.data = of({ danhMucKeyDanhTuFaq });
      comp.ngOnInit();

      expect(comp.danhMucKeyDanhTuFaq).toEqual(danhMucKeyDanhTuFaq);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucKeyDanhTuFaq>>();
      const danhMucKeyDanhTuFaq = { id: 123 };
      jest.spyOn(danhMucKeyDanhTuFaqFormService, 'getDanhMucKeyDanhTuFaq').mockReturnValue(danhMucKeyDanhTuFaq);
      jest.spyOn(danhMucKeyDanhTuFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucKeyDanhTuFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucKeyDanhTuFaq }));
      saveSubject.complete();

      // THEN
      expect(danhMucKeyDanhTuFaqFormService.getDanhMucKeyDanhTuFaq).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucKeyDanhTuFaqService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucKeyDanhTuFaq));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucKeyDanhTuFaq>>();
      const danhMucKeyDanhTuFaq = { id: 123 };
      jest.spyOn(danhMucKeyDanhTuFaqFormService, 'getDanhMucKeyDanhTuFaq').mockReturnValue({ id: null });
      jest.spyOn(danhMucKeyDanhTuFaqService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucKeyDanhTuFaq: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucKeyDanhTuFaq }));
      saveSubject.complete();

      // THEN
      expect(danhMucKeyDanhTuFaqFormService.getDanhMucKeyDanhTuFaq).toHaveBeenCalled();
      expect(danhMucKeyDanhTuFaqService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucKeyDanhTuFaq>>();
      const danhMucKeyDanhTuFaq = { id: 123 };
      jest.spyOn(danhMucKeyDanhTuFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucKeyDanhTuFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucKeyDanhTuFaqService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
