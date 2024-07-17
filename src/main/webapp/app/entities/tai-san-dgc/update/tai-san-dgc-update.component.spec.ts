import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TaiSanDgcService } from '../service/tai-san-dgc.service';
import { ITaiSanDgc } from '../tai-san-dgc.model';
import { TaiSanDgcFormService } from './tai-san-dgc-form.service';

import { TaiSanDgcUpdateComponent } from './tai-san-dgc-update.component';

describe('TaiSanDgc Management Update Component', () => {
  let comp: TaiSanDgcUpdateComponent;
  let fixture: ComponentFixture<TaiSanDgcUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanDgcFormService: TaiSanDgcFormService;
  let taiSanDgcService: TaiSanDgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDgcUpdateComponent],
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
      .overrideTemplate(TaiSanDgcUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanDgcUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanDgcFormService = TestBed.inject(TaiSanDgcFormService);
    taiSanDgcService = TestBed.inject(TaiSanDgcService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taiSanDgc: ITaiSanDgc = { id: 456 };

      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      expect(comp.taiSanDgc).toEqual(taiSanDgc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDgc>>();
      const taiSanDgc = { id: 123 };
      jest.spyOn(taiSanDgcFormService, 'getTaiSanDgc').mockReturnValue(taiSanDgc);
      jest.spyOn(taiSanDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDgc }));
      saveSubject.complete();

      // THEN
      expect(taiSanDgcFormService.getTaiSanDgc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanDgcService.update).toHaveBeenCalledWith(expect.objectContaining(taiSanDgc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDgc>>();
      const taiSanDgc = { id: 123 };
      jest.spyOn(taiSanDgcFormService, 'getTaiSanDgc').mockReturnValue({ id: null });
      jest.spyOn(taiSanDgcService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDgc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDgc }));
      saveSubject.complete();

      // THEN
      expect(taiSanDgcFormService.getTaiSanDgc).toHaveBeenCalled();
      expect(taiSanDgcService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDgc>>();
      const taiSanDgc = { id: 123 };
      jest.spyOn(taiSanDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanDgcService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
