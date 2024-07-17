import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucKeyDongTuFaqService } from '../service/danh-muc-key-dong-tu-faq.service';
import { IDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';
import { DanhMucKeyDongTuFaqFormService } from './danh-muc-key-dong-tu-faq-form.service';

import { DanhMucKeyDongTuFaqUpdateComponent } from './danh-muc-key-dong-tu-faq-update.component';

describe('DanhMucKeyDongTuFaq Management Update Component', () => {
  let comp: DanhMucKeyDongTuFaqUpdateComponent;
  let fixture: ComponentFixture<DanhMucKeyDongTuFaqUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucKeyDongTuFaqFormService: DanhMucKeyDongTuFaqFormService;
  let danhMucKeyDongTuFaqService: DanhMucKeyDongTuFaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucKeyDongTuFaqUpdateComponent],
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
      .overrideTemplate(DanhMucKeyDongTuFaqUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucKeyDongTuFaqUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucKeyDongTuFaqFormService = TestBed.inject(DanhMucKeyDongTuFaqFormService);
    danhMucKeyDongTuFaqService = TestBed.inject(DanhMucKeyDongTuFaqService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq = { id: 456 };

      activatedRoute.data = of({ danhMucKeyDongTuFaq });
      comp.ngOnInit();

      expect(comp.danhMucKeyDongTuFaq).toEqual(danhMucKeyDongTuFaq);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucKeyDongTuFaq>>();
      const danhMucKeyDongTuFaq = { id: 123 };
      jest.spyOn(danhMucKeyDongTuFaqFormService, 'getDanhMucKeyDongTuFaq').mockReturnValue(danhMucKeyDongTuFaq);
      jest.spyOn(danhMucKeyDongTuFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucKeyDongTuFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucKeyDongTuFaq }));
      saveSubject.complete();

      // THEN
      expect(danhMucKeyDongTuFaqFormService.getDanhMucKeyDongTuFaq).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucKeyDongTuFaqService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucKeyDongTuFaq));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucKeyDongTuFaq>>();
      const danhMucKeyDongTuFaq = { id: 123 };
      jest.spyOn(danhMucKeyDongTuFaqFormService, 'getDanhMucKeyDongTuFaq').mockReturnValue({ id: null });
      jest.spyOn(danhMucKeyDongTuFaqService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucKeyDongTuFaq: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucKeyDongTuFaq }));
      saveSubject.complete();

      // THEN
      expect(danhMucKeyDongTuFaqFormService.getDanhMucKeyDongTuFaq).toHaveBeenCalled();
      expect(danhMucKeyDongTuFaqService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucKeyDongTuFaq>>();
      const danhMucKeyDongTuFaq = { id: 123 };
      jest.spyOn(danhMucKeyDongTuFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucKeyDongTuFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucKeyDongTuFaqService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
