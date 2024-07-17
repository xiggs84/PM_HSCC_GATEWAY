import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { SoHuuTheoService } from '../service/so-huu-theo.service';
import { ISoHuuTheo } from '../so-huu-theo.model';
import { SoHuuTheoFormService } from './so-huu-theo-form.service';

import { SoHuuTheoUpdateComponent } from './so-huu-theo-update.component';

describe('SoHuuTheo Management Update Component', () => {
  let comp: SoHuuTheoUpdateComponent;
  let fixture: ComponentFixture<SoHuuTheoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soHuuTheoFormService: SoHuuTheoFormService;
  let soHuuTheoService: SoHuuTheoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SoHuuTheoUpdateComponent],
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
      .overrideTemplate(SoHuuTheoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoHuuTheoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soHuuTheoFormService = TestBed.inject(SoHuuTheoFormService);
    soHuuTheoService = TestBed.inject(SoHuuTheoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const soHuuTheo: ISoHuuTheo = { id: 456 };

      activatedRoute.data = of({ soHuuTheo });
      comp.ngOnInit();

      expect(comp.soHuuTheo).toEqual(soHuuTheo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoHuuTheo>>();
      const soHuuTheo = { id: 123 };
      jest.spyOn(soHuuTheoFormService, 'getSoHuuTheo').mockReturnValue(soHuuTheo);
      jest.spyOn(soHuuTheoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soHuuTheo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soHuuTheo }));
      saveSubject.complete();

      // THEN
      expect(soHuuTheoFormService.getSoHuuTheo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(soHuuTheoService.update).toHaveBeenCalledWith(expect.objectContaining(soHuuTheo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoHuuTheo>>();
      const soHuuTheo = { id: 123 };
      jest.spyOn(soHuuTheoFormService, 'getSoHuuTheo').mockReturnValue({ id: null });
      jest.spyOn(soHuuTheoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soHuuTheo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soHuuTheo }));
      saveSubject.complete();

      // THEN
      expect(soHuuTheoFormService.getSoHuuTheo).toHaveBeenCalled();
      expect(soHuuTheoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoHuuTheo>>();
      const soHuuTheo = { id: 123 };
      jest.spyOn(soHuuTheoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soHuuTheo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soHuuTheoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
