import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TaisanSaiDgcService } from '../service/taisan-sai-dgc.service';
import { ITaisanSaiDgc } from '../taisan-sai-dgc.model';
import { TaisanSaiDgcFormService } from './taisan-sai-dgc-form.service';

import { TaisanSaiDgcUpdateComponent } from './taisan-sai-dgc-update.component';

describe('TaisanSaiDgc Management Update Component', () => {
  let comp: TaisanSaiDgcUpdateComponent;
  let fixture: ComponentFixture<TaisanSaiDgcUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taisanSaiDgcFormService: TaisanSaiDgcFormService;
  let taisanSaiDgcService: TaisanSaiDgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaisanSaiDgcUpdateComponent],
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
      .overrideTemplate(TaisanSaiDgcUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaisanSaiDgcUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taisanSaiDgcFormService = TestBed.inject(TaisanSaiDgcFormService);
    taisanSaiDgcService = TestBed.inject(TaisanSaiDgcService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taisanSaiDgc: ITaisanSaiDgc = { id: 456 };

      activatedRoute.data = of({ taisanSaiDgc });
      comp.ngOnInit();

      expect(comp.taisanSaiDgc).toEqual(taisanSaiDgc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisanSaiDgc>>();
      const taisanSaiDgc = { id: 123 };
      jest.spyOn(taisanSaiDgcFormService, 'getTaisanSaiDgc').mockReturnValue(taisanSaiDgc);
      jest.spyOn(taisanSaiDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisanSaiDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taisanSaiDgc }));
      saveSubject.complete();

      // THEN
      expect(taisanSaiDgcFormService.getTaisanSaiDgc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taisanSaiDgcService.update).toHaveBeenCalledWith(expect.objectContaining(taisanSaiDgc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisanSaiDgc>>();
      const taisanSaiDgc = { id: 123 };
      jest.spyOn(taisanSaiDgcFormService, 'getTaisanSaiDgc').mockReturnValue({ id: null });
      jest.spyOn(taisanSaiDgcService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisanSaiDgc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taisanSaiDgc }));
      saveSubject.complete();

      // THEN
      expect(taisanSaiDgcFormService.getTaisanSaiDgc).toHaveBeenCalled();
      expect(taisanSaiDgcService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisanSaiDgc>>();
      const taisanSaiDgc = { id: 123 };
      jest.spyOn(taisanSaiDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisanSaiDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taisanSaiDgcService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
