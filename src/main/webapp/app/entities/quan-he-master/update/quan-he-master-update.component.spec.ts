import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { QuanHeMasterService } from '../service/quan-he-master.service';
import { IQuanHeMaster } from '../quan-he-master.model';
import { QuanHeMasterFormService } from './quan-he-master-form.service';

import { QuanHeMasterUpdateComponent } from './quan-he-master-update.component';

describe('QuanHeMaster Management Update Component', () => {
  let comp: QuanHeMasterUpdateComponent;
  let fixture: ComponentFixture<QuanHeMasterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quanHeMasterFormService: QuanHeMasterFormService;
  let quanHeMasterService: QuanHeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuanHeMasterUpdateComponent],
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
      .overrideTemplate(QuanHeMasterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuanHeMasterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quanHeMasterFormService = TestBed.inject(QuanHeMasterFormService);
    quanHeMasterService = TestBed.inject(QuanHeMasterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const quanHeMaster: IQuanHeMaster = { id: 456 };

      activatedRoute.data = of({ quanHeMaster });
      comp.ngOnInit();

      expect(comp.quanHeMaster).toEqual(quanHeMaster);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeMaster>>();
      const quanHeMaster = { id: 123 };
      jest.spyOn(quanHeMasterFormService, 'getQuanHeMaster').mockReturnValue(quanHeMaster);
      jest.spyOn(quanHeMasterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeMaster });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeMaster }));
      saveSubject.complete();

      // THEN
      expect(quanHeMasterFormService.getQuanHeMaster).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quanHeMasterService.update).toHaveBeenCalledWith(expect.objectContaining(quanHeMaster));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeMaster>>();
      const quanHeMaster = { id: 123 };
      jest.spyOn(quanHeMasterFormService, 'getQuanHeMaster').mockReturnValue({ id: null });
      jest.spyOn(quanHeMasterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeMaster: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeMaster }));
      saveSubject.complete();

      // THEN
      expect(quanHeMasterFormService.getQuanHeMaster).toHaveBeenCalled();
      expect(quanHeMasterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeMaster>>();
      const quanHeMaster = { id: 123 };
      jest.spyOn(quanHeMasterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeMaster });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quanHeMasterService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
