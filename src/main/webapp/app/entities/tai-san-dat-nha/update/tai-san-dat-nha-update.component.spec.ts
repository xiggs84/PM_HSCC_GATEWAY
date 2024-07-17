import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';
import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { TaiSanDatNhaFormService } from './tai-san-dat-nha-form.service';

import { TaiSanDatNhaUpdateComponent } from './tai-san-dat-nha-update.component';

describe('TaiSanDatNha Management Update Component', () => {
  let comp: TaiSanDatNhaUpdateComponent;
  let fixture: ComponentFixture<TaiSanDatNhaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanDatNhaFormService: TaiSanDatNhaFormService;
  let taiSanDatNhaService: TaiSanDatNhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDatNhaUpdateComponent],
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
      .overrideTemplate(TaiSanDatNhaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanDatNhaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanDatNhaFormService = TestBed.inject(TaiSanDatNhaFormService);
    taiSanDatNhaService = TestBed.inject(TaiSanDatNhaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taiSanDatNha: ITaiSanDatNha = { id: 456 };

      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      expect(comp.taiSanDatNha).toEqual(taiSanDatNha);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDatNha>>();
      const taiSanDatNha = { id: 123 };
      jest.spyOn(taiSanDatNhaFormService, 'getTaiSanDatNha').mockReturnValue(taiSanDatNha);
      jest.spyOn(taiSanDatNhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDatNha }));
      saveSubject.complete();

      // THEN
      expect(taiSanDatNhaFormService.getTaiSanDatNha).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanDatNhaService.update).toHaveBeenCalledWith(expect.objectContaining(taiSanDatNha));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDatNha>>();
      const taiSanDatNha = { id: 123 };
      jest.spyOn(taiSanDatNhaFormService, 'getTaiSanDatNha').mockReturnValue({ id: null });
      jest.spyOn(taiSanDatNhaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDatNha: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDatNha }));
      saveSubject.complete();

      // THEN
      expect(taiSanDatNhaFormService.getTaiSanDatNha).toHaveBeenCalled();
      expect(taiSanDatNhaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDatNha>>();
      const taiSanDatNha = { id: 123 };
      jest.spyOn(taiSanDatNhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanDatNhaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
