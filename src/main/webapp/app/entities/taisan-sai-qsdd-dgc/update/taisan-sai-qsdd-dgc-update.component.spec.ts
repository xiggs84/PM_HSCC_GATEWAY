import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TaisanSaiQsddDgcService } from '../service/taisan-sai-qsdd-dgc.service';
import { ITaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';
import { TaisanSaiQsddDgcFormService } from './taisan-sai-qsdd-dgc-form.service';

import { TaisanSaiQsddDgcUpdateComponent } from './taisan-sai-qsdd-dgc-update.component';

describe('TaisanSaiQsddDgc Management Update Component', () => {
  let comp: TaisanSaiQsddDgcUpdateComponent;
  let fixture: ComponentFixture<TaisanSaiQsddDgcUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taisanSaiQsddDgcFormService: TaisanSaiQsddDgcFormService;
  let taisanSaiQsddDgcService: TaisanSaiQsddDgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaisanSaiQsddDgcUpdateComponent],
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
      .overrideTemplate(TaisanSaiQsddDgcUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaisanSaiQsddDgcUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taisanSaiQsddDgcFormService = TestBed.inject(TaisanSaiQsddDgcFormService);
    taisanSaiQsddDgcService = TestBed.inject(TaisanSaiQsddDgcService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taisanSaiQsddDgc: ITaisanSaiQsddDgc = { id: 456 };

      activatedRoute.data = of({ taisanSaiQsddDgc });
      comp.ngOnInit();

      expect(comp.taisanSaiQsddDgc).toEqual(taisanSaiQsddDgc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisanSaiQsddDgc>>();
      const taisanSaiQsddDgc = { id: 123 };
      jest.spyOn(taisanSaiQsddDgcFormService, 'getTaisanSaiQsddDgc').mockReturnValue(taisanSaiQsddDgc);
      jest.spyOn(taisanSaiQsddDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisanSaiQsddDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taisanSaiQsddDgc }));
      saveSubject.complete();

      // THEN
      expect(taisanSaiQsddDgcFormService.getTaisanSaiQsddDgc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taisanSaiQsddDgcService.update).toHaveBeenCalledWith(expect.objectContaining(taisanSaiQsddDgc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisanSaiQsddDgc>>();
      const taisanSaiQsddDgc = { id: 123 };
      jest.spyOn(taisanSaiQsddDgcFormService, 'getTaisanSaiQsddDgc').mockReturnValue({ id: null });
      jest.spyOn(taisanSaiQsddDgcService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisanSaiQsddDgc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taisanSaiQsddDgc }));
      saveSubject.complete();

      // THEN
      expect(taisanSaiQsddDgcFormService.getTaisanSaiQsddDgc).toHaveBeenCalled();
      expect(taisanSaiQsddDgcService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisanSaiQsddDgc>>();
      const taisanSaiQsddDgc = { id: 123 };
      jest.spyOn(taisanSaiQsddDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisanSaiQsddDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taisanSaiQsddDgcService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
