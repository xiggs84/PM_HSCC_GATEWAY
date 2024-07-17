import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';
import { DanhsachDsNganchanTmpService } from '../service/danhsach-ds-nganchan-tmp.service';

import danhsachDsNganchanTmpResolve from './danhsach-ds-nganchan-tmp-routing-resolve.service';

describe('DanhsachDsNganchanTmp routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhsachDsNganchanTmpService;
  let resultDanhsachDsNganchanTmp: IDanhsachDsNganchanTmp | null | undefined;

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
    service = TestBed.inject(DanhsachDsNganchanTmpService);
    resultDanhsachDsNganchanTmp = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhsachDsNganchanTmp returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhsachDsNganchanTmpResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhsachDsNganchanTmp = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhsachDsNganchanTmp).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhsachDsNganchanTmpResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhsachDsNganchanTmp = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhsachDsNganchanTmp).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhsachDsNganchanTmp>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhsachDsNganchanTmpResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhsachDsNganchanTmp = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhsachDsNganchanTmp).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
