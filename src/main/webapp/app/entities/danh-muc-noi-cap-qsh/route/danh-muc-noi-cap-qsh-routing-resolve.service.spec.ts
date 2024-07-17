import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';
import { DanhMucNoiCapQshService } from '../service/danh-muc-noi-cap-qsh.service';

import danhMucNoiCapQshResolve from './danh-muc-noi-cap-qsh-routing-resolve.service';

describe('DanhMucNoiCapQsh routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucNoiCapQshService;
  let resultDanhMucNoiCapQsh: IDanhMucNoiCapQsh | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(DanhMucNoiCapQshService);
    resultDanhMucNoiCapQsh = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucNoiCapQsh returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucNoiCapQshResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucNoiCapQsh = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucNoiCapQsh).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucNoiCapQshResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucNoiCapQsh = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucNoiCapQsh).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucNoiCapQsh>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucNoiCapQshResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucNoiCapQsh = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucNoiCapQsh).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
