import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LogLienThongMotCuaService } from '../service/log-lien-thong-mot-cua.service';
import { ILogLienThongMotCua } from '../log-lien-thong-mot-cua.model';
import { LogLienThongMotCuaFormService } from './log-lien-thong-mot-cua-form.service';

import { LogLienThongMotCuaUpdateComponent } from './log-lien-thong-mot-cua-update.component';

describe('LogLienThongMotCua Management Update Component', () => {
  let comp: LogLienThongMotCuaUpdateComponent;
  let fixture: ComponentFixture<LogLienThongMotCuaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logLienThongMotCuaFormService: LogLienThongMotCuaFormService;
  let logLienThongMotCuaService: LogLienThongMotCuaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogLienThongMotCuaUpdateComponent],
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
      .overrideTemplate(LogLienThongMotCuaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogLienThongMotCuaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logLienThongMotCuaFormService = TestBed.inject(LogLienThongMotCuaFormService);
    logLienThongMotCuaService = TestBed.inject(LogLienThongMotCuaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logLienThongMotCua: ILogLienThongMotCua = { id: 456 };

      activatedRoute.data = of({ logLienThongMotCua });
      comp.ngOnInit();

      expect(comp.logLienThongMotCua).toEqual(logLienThongMotCua);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogLienThongMotCua>>();
      const logLienThongMotCua = { id: 123 };
      jest.spyOn(logLienThongMotCuaFormService, 'getLogLienThongMotCua').mockReturnValue(logLienThongMotCua);
      jest.spyOn(logLienThongMotCuaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logLienThongMotCua });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logLienThongMotCua }));
      saveSubject.complete();

      // THEN
      expect(logLienThongMotCuaFormService.getLogLienThongMotCua).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logLienThongMotCuaService.update).toHaveBeenCalledWith(expect.objectContaining(logLienThongMotCua));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogLienThongMotCua>>();
      const logLienThongMotCua = { id: 123 };
      jest.spyOn(logLienThongMotCuaFormService, 'getLogLienThongMotCua').mockReturnValue({ id: null });
      jest.spyOn(logLienThongMotCuaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logLienThongMotCua: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logLienThongMotCua }));
      saveSubject.complete();

      // THEN
      expect(logLienThongMotCuaFormService.getLogLienThongMotCua).toHaveBeenCalled();
      expect(logLienThongMotCuaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogLienThongMotCua>>();
      const logLienThongMotCua = { id: 123 };
      jest.spyOn(logLienThongMotCuaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logLienThongMotCua });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logLienThongMotCuaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
