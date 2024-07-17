import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { SoLanHoiFaqService } from '../service/so-lan-hoi-faq.service';
import { ISoLanHoiFaq } from '../so-lan-hoi-faq.model';
import { SoLanHoiFaqFormService } from './so-lan-hoi-faq-form.service';

import { SoLanHoiFaqUpdateComponent } from './so-lan-hoi-faq-update.component';

describe('SoLanHoiFaq Management Update Component', () => {
  let comp: SoLanHoiFaqUpdateComponent;
  let fixture: ComponentFixture<SoLanHoiFaqUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soLanHoiFaqFormService: SoLanHoiFaqFormService;
  let soLanHoiFaqService: SoLanHoiFaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SoLanHoiFaqUpdateComponent],
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
      .overrideTemplate(SoLanHoiFaqUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoLanHoiFaqUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soLanHoiFaqFormService = TestBed.inject(SoLanHoiFaqFormService);
    soLanHoiFaqService = TestBed.inject(SoLanHoiFaqService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const soLanHoiFaq: ISoLanHoiFaq = { id: 456 };

      activatedRoute.data = of({ soLanHoiFaq });
      comp.ngOnInit();

      expect(comp.soLanHoiFaq).toEqual(soLanHoiFaq);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoLanHoiFaq>>();
      const soLanHoiFaq = { id: 123 };
      jest.spyOn(soLanHoiFaqFormService, 'getSoLanHoiFaq').mockReturnValue(soLanHoiFaq);
      jest.spyOn(soLanHoiFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soLanHoiFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soLanHoiFaq }));
      saveSubject.complete();

      // THEN
      expect(soLanHoiFaqFormService.getSoLanHoiFaq).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(soLanHoiFaqService.update).toHaveBeenCalledWith(expect.objectContaining(soLanHoiFaq));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoLanHoiFaq>>();
      const soLanHoiFaq = { id: 123 };
      jest.spyOn(soLanHoiFaqFormService, 'getSoLanHoiFaq').mockReturnValue({ id: null });
      jest.spyOn(soLanHoiFaqService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soLanHoiFaq: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soLanHoiFaq }));
      saveSubject.complete();

      // THEN
      expect(soLanHoiFaqFormService.getSoLanHoiFaq).toHaveBeenCalled();
      expect(soLanHoiFaqService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoLanHoiFaq>>();
      const soLanHoiFaq = { id: 123 };
      jest.spyOn(soLanHoiFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soLanHoiFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soLanHoiFaqService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
