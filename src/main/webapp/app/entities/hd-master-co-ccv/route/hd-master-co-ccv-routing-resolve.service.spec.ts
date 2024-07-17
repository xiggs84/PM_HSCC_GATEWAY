import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IHdMasterCoCcv } from '../hd-master-co-ccv.model';
import { HdMasterCoCcvService } from '../service/hd-master-co-ccv.service';

import hdMasterCoCcvResolve from './hd-master-co-ccv-routing-resolve.service';

describe('HdMasterCoCcv routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: HdMasterCoCcvService;
  let resultHdMasterCoCcv: IHdMasterCoCcv | null | undefined;

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
    service = TestBed.inject(HdMasterCoCcvService);
    resultHdMasterCoCcv = undefined;
  });

  describe('resolve', () => {
    it('should return IHdMasterCoCcv returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdMasterCoCcvResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdMasterCoCcv = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultHdMasterCoCcv).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdMasterCoCcvResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdMasterCoCcv = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHdMasterCoCcv).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IHdMasterCoCcv>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdMasterCoCcvResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdMasterCoCcv = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultHdMasterCoCcv).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
