import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';
import { CauHinhHoaDonDienTuService } from '../service/cau-hinh-hoa-don-dien-tu.service';

import cauHinhHoaDonDienTuResolve from './cau-hinh-hoa-don-dien-tu-routing-resolve.service';

describe('CauHinhHoaDonDienTu routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: CauHinhHoaDonDienTuService;
  let resultCauHinhHoaDonDienTu: ICauHinhHoaDonDienTu | null | undefined;

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
    service = TestBed.inject(CauHinhHoaDonDienTuService);
    resultCauHinhHoaDonDienTu = undefined;
  });

  describe('resolve', () => {
    it('should return ICauHinhHoaDonDienTu returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhHoaDonDienTuResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhHoaDonDienTu = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhHoaDonDienTu).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhHoaDonDienTuResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhHoaDonDienTu = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCauHinhHoaDonDienTu).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICauHinhHoaDonDienTu>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhHoaDonDienTuResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhHoaDonDienTu = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhHoaDonDienTu).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
