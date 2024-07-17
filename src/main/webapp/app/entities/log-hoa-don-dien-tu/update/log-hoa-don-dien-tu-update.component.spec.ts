import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LogHoaDonDienTuService } from '../service/log-hoa-don-dien-tu.service';
import { ILogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';
import { LogHoaDonDienTuFormService } from './log-hoa-don-dien-tu-form.service';

import { LogHoaDonDienTuUpdateComponent } from './log-hoa-don-dien-tu-update.component';

describe('LogHoaDonDienTu Management Update Component', () => {
  let comp: LogHoaDonDienTuUpdateComponent;
  let fixture: ComponentFixture<LogHoaDonDienTuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logHoaDonDienTuFormService: LogHoaDonDienTuFormService;
  let logHoaDonDienTuService: LogHoaDonDienTuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogHoaDonDienTuUpdateComponent],
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
      .overrideTemplate(LogHoaDonDienTuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogHoaDonDienTuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logHoaDonDienTuFormService = TestBed.inject(LogHoaDonDienTuFormService);
    logHoaDonDienTuService = TestBed.inject(LogHoaDonDienTuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logHoaDonDienTu: ILogHoaDonDienTu = { id: 456 };

      activatedRoute.data = of({ logHoaDonDienTu });
      comp.ngOnInit();

      expect(comp.logHoaDonDienTu).toEqual(logHoaDonDienTu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogHoaDonDienTu>>();
      const logHoaDonDienTu = { id: 123 };
      jest.spyOn(logHoaDonDienTuFormService, 'getLogHoaDonDienTu').mockReturnValue(logHoaDonDienTu);
      jest.spyOn(logHoaDonDienTuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logHoaDonDienTu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logHoaDonDienTu }));
      saveSubject.complete();

      // THEN
      expect(logHoaDonDienTuFormService.getLogHoaDonDienTu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logHoaDonDienTuService.update).toHaveBeenCalledWith(expect.objectContaining(logHoaDonDienTu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogHoaDonDienTu>>();
      const logHoaDonDienTu = { id: 123 };
      jest.spyOn(logHoaDonDienTuFormService, 'getLogHoaDonDienTu').mockReturnValue({ id: null });
      jest.spyOn(logHoaDonDienTuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logHoaDonDienTu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logHoaDonDienTu }));
      saveSubject.complete();

      // THEN
      expect(logHoaDonDienTuFormService.getLogHoaDonDienTu).toHaveBeenCalled();
      expect(logHoaDonDienTuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogHoaDonDienTu>>();
      const logHoaDonDienTu = { id: 123 };
      jest.spyOn(logHoaDonDienTuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logHoaDonDienTu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logHoaDonDienTuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
