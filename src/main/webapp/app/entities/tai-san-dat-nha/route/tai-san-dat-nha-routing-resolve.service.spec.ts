import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';

import taiSanDatNhaResolve from './tai-san-dat-nha-routing-resolve.service';

describe('TaiSanDatNha routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TaiSanDatNhaService;
  let resultTaiSanDatNha: ITaiSanDatNha | null | undefined;

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
    service = TestBed.inject(TaiSanDatNhaService);
    resultTaiSanDatNha = undefined;
  });

  describe('resolve', () => {
    it('should return ITaiSanDatNha returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanDatNhaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSanDatNha = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaiSanDatNha).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanDatNhaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSanDatNha = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTaiSanDatNha).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITaiSanDatNha>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanDatNhaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSanDatNha = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaiSanDatNha).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
