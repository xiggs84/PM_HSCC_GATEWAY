import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ILogLienThongMotCua } from '../log-lien-thong-mot-cua.model';
import { LogLienThongMotCuaService } from '../service/log-lien-thong-mot-cua.service';

import logLienThongMotCuaResolve from './log-lien-thong-mot-cua-routing-resolve.service';

describe('LogLienThongMotCua routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: LogLienThongMotCuaService;
  let resultLogLienThongMotCua: ILogLienThongMotCua | null | undefined;

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
    service = TestBed.inject(LogLienThongMotCuaService);
    resultLogLienThongMotCua = undefined;
  });

  describe('resolve', () => {
    it('should return ILogLienThongMotCua returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logLienThongMotCuaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogLienThongMotCua = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogLienThongMotCua).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        logLienThongMotCuaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogLienThongMotCua = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLogLienThongMotCua).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILogLienThongMotCua>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logLienThongMotCuaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogLienThongMotCua = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogLienThongMotCua).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
