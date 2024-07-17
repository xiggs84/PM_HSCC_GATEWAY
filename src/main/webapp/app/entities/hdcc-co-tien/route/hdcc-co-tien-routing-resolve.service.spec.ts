import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IHdccCoTien } from '../hdcc-co-tien.model';
import { HdccCoTienService } from '../service/hdcc-co-tien.service';

import hdccCoTienResolve from './hdcc-co-tien-routing-resolve.service';

describe('HdccCoTien routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: HdccCoTienService;
  let resultHdccCoTien: IHdccCoTien | null | undefined;

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
    service = TestBed.inject(HdccCoTienService);
    resultHdccCoTien = undefined;
  });

  describe('resolve', () => {
    it('should return IHdccCoTien returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdccCoTienResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdccCoTien = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultHdccCoTien).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdccCoTienResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdccCoTien = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHdccCoTien).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IHdccCoTien>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        hdccCoTienResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultHdccCoTien = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultHdccCoTien).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
