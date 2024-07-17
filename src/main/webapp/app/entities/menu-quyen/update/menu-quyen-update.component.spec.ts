import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { MenuQuyenService } from '../service/menu-quyen.service';
import { IMenuQuyen } from '../menu-quyen.model';
import { MenuQuyenFormService } from './menu-quyen-form.service';

import { MenuQuyenUpdateComponent } from './menu-quyen-update.component';

describe('MenuQuyen Management Update Component', () => {
  let comp: MenuQuyenUpdateComponent;
  let fixture: ComponentFixture<MenuQuyenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let menuQuyenFormService: MenuQuyenFormService;
  let menuQuyenService: MenuQuyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuQuyenUpdateComponent],
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
      .overrideTemplate(MenuQuyenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MenuQuyenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    menuQuyenFormService = TestBed.inject(MenuQuyenFormService);
    menuQuyenService = TestBed.inject(MenuQuyenService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const menuQuyen: IMenuQuyen = { id: 456 };

      activatedRoute.data = of({ menuQuyen });
      comp.ngOnInit();

      expect(comp.menuQuyen).toEqual(menuQuyen);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuQuyen>>();
      const menuQuyen = { id: 123 };
      jest.spyOn(menuQuyenFormService, 'getMenuQuyen').mockReturnValue(menuQuyen);
      jest.spyOn(menuQuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuQuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menuQuyen }));
      saveSubject.complete();

      // THEN
      expect(menuQuyenFormService.getMenuQuyen).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(menuQuyenService.update).toHaveBeenCalledWith(expect.objectContaining(menuQuyen));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuQuyen>>();
      const menuQuyen = { id: 123 };
      jest.spyOn(menuQuyenFormService, 'getMenuQuyen').mockReturnValue({ id: null });
      jest.spyOn(menuQuyenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuQuyen: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menuQuyen }));
      saveSubject.complete();

      // THEN
      expect(menuQuyenFormService.getMenuQuyen).toHaveBeenCalled();
      expect(menuQuyenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuQuyen>>();
      const menuQuyen = { id: 123 };
      jest.spyOn(menuQuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuQuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(menuQuyenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
