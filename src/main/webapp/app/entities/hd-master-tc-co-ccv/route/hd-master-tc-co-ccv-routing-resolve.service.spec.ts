import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';
import { HdMasterTcCoCcvService } from '../service/hd-master-tc-co-ccv.service';

import hdMasterTcCoCcvResolve from './hd-master-tc-co-ccv-routing-resolve.service';

describe('HdMasterTcCoCcv routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: HdMasterTcCoCcvService;
  let resultHdMasterTcCoCcv: IHdMasterTcCoCcv | null | undefined;

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
    service = TestBed.inject(HdMasterTcCoCcvService);
    resultHdMasterTcCoCcv = undefined;
  });

  describe('resolve', () => {
    it('should return IHdMasterTcCoCcv returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdMasterTcCoCcvResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdMasterTcCoCcv = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultHdMasterTcCoCcv).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdMasterTcCoCcvResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdMasterTcCoCcv = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHdMasterTcCoCcv).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IHdMasterTcCoCcv>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdMasterTcCoCcvResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdMasterTcCoCcv = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultHdMasterTcCoCcv).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
