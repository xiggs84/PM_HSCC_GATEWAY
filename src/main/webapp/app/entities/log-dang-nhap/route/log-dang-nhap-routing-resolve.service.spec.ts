import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ILogDangNhap } from '../log-dang-nhap.model';
import { LogDangNhapService } from '../service/log-dang-nhap.service';

import logDangNhapResolve from './log-dang-nhap-routing-resolve.service';

describe('LogDangNhap routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: LogDangNhapService;
  let resultLogDangNhap: ILogDangNhap | null | undefined;

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
    service = TestBed.inject(LogDangNhapService);
    resultLogDangNhap = undefined;
  });

  describe('resolve', () => {
    it('should return ILogDangNhap returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logDangNhapResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogDangNhap = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogDangNhap).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        logDangNhapResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogDangNhap = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLogDangNhap).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILogDangNhap>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logDangNhapResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogDangNhap = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogDangNhap).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
