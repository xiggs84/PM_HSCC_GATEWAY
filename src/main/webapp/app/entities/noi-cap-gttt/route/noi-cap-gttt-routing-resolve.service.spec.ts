import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { INoiCapGttt } from '../noi-cap-gttt.model';
import { NoiCapGtttService } from '../service/noi-cap-gttt.service';

import noiCapGtttResolve from './noi-cap-gttt-routing-resolve.service';

describe('NoiCapGttt routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: NoiCapGtttService;
  let resultNoiCapGttt: INoiCapGttt | null | undefined;

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
    service = TestBed.inject(NoiCapGtttService);
    resultNoiCapGttt = undefined;
  });

  describe('resolve', () => {
    it('should return INoiCapGttt returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        noiCapGtttResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultNoiCapGttt = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultNoiCapGttt).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        noiCapGtttResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultNoiCapGttt = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNoiCapGttt).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<INoiCapGttt>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        noiCapGtttResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultNoiCapGttt = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultNoiCapGttt).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
