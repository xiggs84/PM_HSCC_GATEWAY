import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TaisannhadatidService } from '../service/taisannhadatid.service';
import { ITaisannhadatid } from '../taisannhadatid.model';
import { TaisannhadatidFormService } from './taisannhadatid-form.service';

import { TaisannhadatidUpdateComponent } from './taisannhadatid-update.component';

describe('Taisannhadatid Management Update Component', () => {
  let comp: TaisannhadatidUpdateComponent;
  let fixture: ComponentFixture<TaisannhadatidUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taisannhadatidFormService: TaisannhadatidFormService;
  let taisannhadatidService: TaisannhadatidService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaisannhadatidUpdateComponent],
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
      .overrideTemplate(TaisannhadatidUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaisannhadatidUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taisannhadatidFormService = TestBed.inject(TaisannhadatidFormService);
    taisannhadatidService = TestBed.inject(TaisannhadatidService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taisannhadatid: ITaisannhadatid = { id: 456 };

      activatedRoute.data = of({ taisannhadatid });
      comp.ngOnInit();

      expect(comp.taisannhadatid).toEqual(taisannhadatid);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisannhadatid>>();
      const taisannhadatid = { id: 123 };
      jest.spyOn(taisannhadatidFormService, 'getTaisannhadatid').mockReturnValue(taisannhadatid);
      jest.spyOn(taisannhadatidService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisannhadatid });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taisannhadatid }));
      saveSubject.complete();

      // THEN
      expect(taisannhadatidFormService.getTaisannhadatid).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taisannhadatidService.update).toHaveBeenCalledWith(expect.objectContaining(taisannhadatid));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisannhadatid>>();
      const taisannhadatid = { id: 123 };
      jest.spyOn(taisannhadatidFormService, 'getTaisannhadatid').mockReturnValue({ id: null });
      jest.spyOn(taisannhadatidService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisannhadatid: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taisannhadatid }));
      saveSubject.complete();

      // THEN
      expect(taisannhadatidFormService.getTaisannhadatid).toHaveBeenCalled();
      expect(taisannhadatidService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaisannhadatid>>();
      const taisannhadatid = { id: 123 };
      jest.spyOn(taisannhadatidService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taisannhadatid });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taisannhadatidService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
