import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LogSearchDsTsService } from '../service/log-search-ds-ts.service';
import { ILogSearchDsTs } from '../log-search-ds-ts.model';
import { LogSearchDsTsFormService } from './log-search-ds-ts-form.service';

import { LogSearchDsTsUpdateComponent } from './log-search-ds-ts-update.component';

describe('LogSearchDsTs Management Update Component', () => {
  let comp: LogSearchDsTsUpdateComponent;
  let fixture: ComponentFixture<LogSearchDsTsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logSearchDsTsFormService: LogSearchDsTsFormService;
  let logSearchDsTsService: LogSearchDsTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogSearchDsTsUpdateComponent],
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
      .overrideTemplate(LogSearchDsTsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogSearchDsTsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logSearchDsTsFormService = TestBed.inject(LogSearchDsTsFormService);
    logSearchDsTsService = TestBed.inject(LogSearchDsTsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logSearchDsTs: ILogSearchDsTs = { id: 456 };

      activatedRoute.data = of({ logSearchDsTs });
      comp.ngOnInit();

      expect(comp.logSearchDsTs).toEqual(logSearchDsTs);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogSearchDsTs>>();
      const logSearchDsTs = { id: 123 };
      jest.spyOn(logSearchDsTsFormService, 'getLogSearchDsTs').mockReturnValue(logSearchDsTs);
      jest.spyOn(logSearchDsTsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logSearchDsTs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logSearchDsTs }));
      saveSubject.complete();

      // THEN
      expect(logSearchDsTsFormService.getLogSearchDsTs).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logSearchDsTsService.update).toHaveBeenCalledWith(expect.objectContaining(logSearchDsTs));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogSearchDsTs>>();
      const logSearchDsTs = { id: 123 };
      jest.spyOn(logSearchDsTsFormService, 'getLogSearchDsTs').mockReturnValue({ id: null });
      jest.spyOn(logSearchDsTsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logSearchDsTs: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logSearchDsTs }));
      saveSubject.complete();

      // THEN
      expect(logSearchDsTsFormService.getLogSearchDsTs).toHaveBeenCalled();
      expect(logSearchDsTsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogSearchDsTs>>();
      const logSearchDsTs = { id: 123 };
      jest.spyOn(logSearchDsTsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logSearchDsTs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logSearchDsTsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
