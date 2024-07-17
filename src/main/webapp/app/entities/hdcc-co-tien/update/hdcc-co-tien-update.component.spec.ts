import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { HdccCoTienService } from '../service/hdcc-co-tien.service';
import { IHdccCoTien } from '../hdcc-co-tien.model';
import { HdccCoTienFormService } from './hdcc-co-tien-form.service';

import { HdccCoTienUpdateComponent } from './hdcc-co-tien-update.component';

describe('HdccCoTien Management Update Component', () => {
  let comp: HdccCoTienUpdateComponent;
  let fixture: ComponentFixture<HdccCoTienUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hdccCoTienFormService: HdccCoTienFormService;
  let hdccCoTienService: HdccCoTienService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HdccCoTienUpdateComponent],
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
      .overrideTemplate(HdccCoTienUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HdccCoTienUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hdccCoTienFormService = TestBed.inject(HdccCoTienFormService);
    hdccCoTienService = TestBed.inject(HdccCoTienService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const hdccCoTien: IHdccCoTien = { id: 456 };

      activatedRoute.data = of({ hdccCoTien });
      comp.ngOnInit();

      expect(comp.hdccCoTien).toEqual(hdccCoTien);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdccCoTien>>();
      const hdccCoTien = { id: 123 };
      jest.spyOn(hdccCoTienFormService, 'getHdccCoTien').mockReturnValue(hdccCoTien);
      jest.spyOn(hdccCoTienService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdccCoTien });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdccCoTien }));
      saveSubject.complete();

      // THEN
      expect(hdccCoTienFormService.getHdccCoTien).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(hdccCoTienService.update).toHaveBeenCalledWith(expect.objectContaining(hdccCoTien));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdccCoTien>>();
      const hdccCoTien = { id: 123 };
      jest.spyOn(hdccCoTienFormService, 'getHdccCoTien').mockReturnValue({ id: null });
      jest.spyOn(hdccCoTienService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdccCoTien: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdccCoTien }));
      saveSubject.complete();

      // THEN
      expect(hdccCoTienFormService.getHdccCoTien).toHaveBeenCalled();
      expect(hdccCoTienService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdccCoTien>>();
      const hdccCoTien = { id: 123 };
      jest.spyOn(hdccCoTienService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdccCoTien });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hdccCoTienService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
