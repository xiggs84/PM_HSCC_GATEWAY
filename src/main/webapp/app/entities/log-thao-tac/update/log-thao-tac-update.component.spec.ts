import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LogThaoTacService } from '../service/log-thao-tac.service';
import { ILogThaoTac } from '../log-thao-tac.model';
import { LogThaoTacFormService } from './log-thao-tac-form.service';

import { LogThaoTacUpdateComponent } from './log-thao-tac-update.component';

describe('LogThaoTac Management Update Component', () => {
  let comp: LogThaoTacUpdateComponent;
  let fixture: ComponentFixture<LogThaoTacUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logThaoTacFormService: LogThaoTacFormService;
  let logThaoTacService: LogThaoTacService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogThaoTacUpdateComponent],
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
      .overrideTemplate(LogThaoTacUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogThaoTacUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logThaoTacFormService = TestBed.inject(LogThaoTacFormService);
    logThaoTacService = TestBed.inject(LogThaoTacService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logThaoTac: ILogThaoTac = { id: 456 };

      activatedRoute.data = of({ logThaoTac });
      comp.ngOnInit();

      expect(comp.logThaoTac).toEqual(logThaoTac);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogThaoTac>>();
      const logThaoTac = { id: 123 };
      jest.spyOn(logThaoTacFormService, 'getLogThaoTac').mockReturnValue(logThaoTac);
      jest.spyOn(logThaoTacService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logThaoTac });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logThaoTac }));
      saveSubject.complete();

      // THEN
      expect(logThaoTacFormService.getLogThaoTac).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logThaoTacService.update).toHaveBeenCalledWith(expect.objectContaining(logThaoTac));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogThaoTac>>();
      const logThaoTac = { id: 123 };
      jest.spyOn(logThaoTacFormService, 'getLogThaoTac').mockReturnValue({ id: null });
      jest.spyOn(logThaoTacService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logThaoTac: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logThaoTac }));
      saveSubject.complete();

      // THEN
      expect(logThaoTacFormService.getLogThaoTac).toHaveBeenCalled();
      expect(logThaoTacService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogThaoTac>>();
      const logThaoTac = { id: 123 };
      jest.spyOn(logThaoTacService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logThaoTac });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logThaoTacService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
