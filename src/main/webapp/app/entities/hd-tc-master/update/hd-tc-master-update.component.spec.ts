import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { HdTcMasterService } from '../service/hd-tc-master.service';
import { IHdTcMaster } from '../hd-tc-master.model';
import { HdTcMasterFormService } from './hd-tc-master-form.service';

import { HdTcMasterUpdateComponent } from './hd-tc-master-update.component';

describe('HdTcMaster Management Update Component', () => {
  let comp: HdTcMasterUpdateComponent;
  let fixture: ComponentFixture<HdTcMasterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hdTcMasterFormService: HdTcMasterFormService;
  let hdTcMasterService: HdTcMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HdTcMasterUpdateComponent],
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
      .overrideTemplate(HdTcMasterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HdTcMasterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hdTcMasterFormService = TestBed.inject(HdTcMasterFormService);
    hdTcMasterService = TestBed.inject(HdTcMasterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const hdTcMaster: IHdTcMaster = { id: 456 };

      activatedRoute.data = of({ hdTcMaster });
      comp.ngOnInit();

      expect(comp.hdTcMaster).toEqual(hdTcMaster);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdTcMaster>>();
      const hdTcMaster = { id: 123 };
      jest.spyOn(hdTcMasterFormService, 'getHdTcMaster').mockReturnValue(hdTcMaster);
      jest.spyOn(hdTcMasterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdTcMaster });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdTcMaster }));
      saveSubject.complete();

      // THEN
      expect(hdTcMasterFormService.getHdTcMaster).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(hdTcMasterService.update).toHaveBeenCalledWith(expect.objectContaining(hdTcMaster));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdTcMaster>>();
      const hdTcMaster = { id: 123 };
      jest.spyOn(hdTcMasterFormService, 'getHdTcMaster').mockReturnValue({ id: null });
      jest.spyOn(hdTcMasterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdTcMaster: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdTcMaster }));
      saveSubject.complete();

      // THEN
      expect(hdTcMasterFormService.getHdTcMaster).toHaveBeenCalled();
      expect(hdTcMasterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdTcMaster>>();
      const hdTcMaster = { id: 123 };
      jest.spyOn(hdTcMasterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdTcMaster });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hdTcMasterService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
