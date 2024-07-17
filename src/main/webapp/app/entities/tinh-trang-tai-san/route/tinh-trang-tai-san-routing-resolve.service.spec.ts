import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ITinhTrangTaiSan } from '../tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from '../service/tinh-trang-tai-san.service';

import tinhTrangTaiSanResolve from './tinh-trang-tai-san-routing-resolve.service';

describe('TinhTrangTaiSan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TinhTrangTaiSanService;
  let resultTinhTrangTaiSan: ITinhTrangTaiSan | null | undefined;

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
    service = TestBed.inject(TinhTrangTaiSanService);
    resultTinhTrangTaiSan = undefined;
  });

  describe('resolve', () => {
    it('should return ITinhTrangTaiSan returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        tinhTrangTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTinhTrangTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTinhTrangTaiSan).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        tinhTrangTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTinhTrangTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTinhTrangTaiSan).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITinhTrangTaiSan>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        tinhTrangTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTinhTrangTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTinhTrangTaiSan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
