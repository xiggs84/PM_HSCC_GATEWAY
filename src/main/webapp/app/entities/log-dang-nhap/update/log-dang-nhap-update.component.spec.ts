import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LogDangNhapService } from '../service/log-dang-nhap.service';
import { ILogDangNhap } from '../log-dang-nhap.model';
import { LogDangNhapFormService } from './log-dang-nhap-form.service';

import { LogDangNhapUpdateComponent } from './log-dang-nhap-update.component';

describe('LogDangNhap Management Update Component', () => {
  let comp: LogDangNhapUpdateComponent;
  let fixture: ComponentFixture<LogDangNhapUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logDangNhapFormService: LogDangNhapFormService;
  let logDangNhapService: LogDangNhapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogDangNhapUpdateComponent],
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
      .overrideTemplate(LogDangNhapUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogDangNhapUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logDangNhapFormService = TestBed.inject(LogDangNhapFormService);
    logDangNhapService = TestBed.inject(LogDangNhapService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logDangNhap: ILogDangNhap = { id: 456 };

      activatedRoute.data = of({ logDangNhap });
      comp.ngOnInit();

      expect(comp.logDangNhap).toEqual(logDangNhap);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogDangNhap>>();
      const logDangNhap = { id: 123 };
      jest.spyOn(logDangNhapFormService, 'getLogDangNhap').mockReturnValue(logDangNhap);
      jest.spyOn(logDangNhapService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logDangNhap });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logDangNhap }));
      saveSubject.complete();

      // THEN
      expect(logDangNhapFormService.getLogDangNhap).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logDangNhapService.update).toHaveBeenCalledWith(expect.objectContaining(logDangNhap));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogDangNhap>>();
      const logDangNhap = { id: 123 };
      jest.spyOn(logDangNhapFormService, 'getLogDangNhap').mockReturnValue({ id: null });
      jest.spyOn(logDangNhapService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logDangNhap: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logDangNhap }));
      saveSubject.complete();

      // THEN
      expect(logDangNhapFormService.getLogDangNhap).toHaveBeenCalled();
      expect(logDangNhapService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogDangNhap>>();
      const logDangNhap = { id: 123 };
      jest.spyOn(logDangNhapService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logDangNhap });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logDangNhapService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
