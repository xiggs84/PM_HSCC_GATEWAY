import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ITinhTrangDuongSu } from '../tinh-trang-duong-su.model';
import { TinhTrangDuongSuService } from '../service/tinh-trang-duong-su.service';

import tinhTrangDuongSuResolve from './tinh-trang-duong-su-routing-resolve.service';

describe('TinhTrangDuongSu routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TinhTrangDuongSuService;
  let resultTinhTrangDuongSu: ITinhTrangDuongSu | null | undefined;

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
    service = TestBed.inject(TinhTrangDuongSuService);
    resultTinhTrangDuongSu = undefined;
  });

  describe('resolve', () => {
    it('should return ITinhTrangDuongSu returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        tinhTrangDuongSuResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTinhTrangDuongSu = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTinhTrangDuongSu).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        tinhTrangDuongSuResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTinhTrangDuongSu = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTinhTrangDuongSu).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITinhTrangDuongSu>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        tinhTrangDuongSuResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTinhTrangDuongSu = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTinhTrangDuongSu).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
