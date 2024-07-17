import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILogDangNhap } from '../log-dang-nhap.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../log-dang-nhap.test-samples';

import { LogDangNhapService, RestLogDangNhap } from './log-dang-nhap.service';

const requireRestSample: RestLogDangNhap = {
  ...sampleWithRequiredData,
  ngayDangNhap: sampleWithRequiredData.ngayDangNhap?.format(DATE_FORMAT),
};

describe('LogDangNhap Service', () => {
  let service: LogDangNhapService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogDangNhap | ILogDangNhap[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LogDangNhapService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a LogDangNhap', () => {
      const logDangNhap = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logDangNhap).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogDangNhap', () => {
      const logDangNhap = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logDangNhap).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogDangNhap', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogDangNhap', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogDangNhap', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogDangNhapToCollectionIfMissing', () => {
      it('should add a LogDangNhap to an empty array', () => {
        const logDangNhap: ILogDangNhap = sampleWithRequiredData;
        expectedResult = service.addLogDangNhapToCollectionIfMissing([], logDangNhap);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logDangNhap);
      });

      it('should not add a LogDangNhap to an array that contains it', () => {
        const logDangNhap: ILogDangNhap = sampleWithRequiredData;
        const logDangNhapCollection: ILogDangNhap[] = [
          {
            ...logDangNhap,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogDangNhapToCollectionIfMissing(logDangNhapCollection, logDangNhap);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogDangNhap to an array that doesn't contain it", () => {
        const logDangNhap: ILogDangNhap = sampleWithRequiredData;
        const logDangNhapCollection: ILogDangNhap[] = [sampleWithPartialData];
        expectedResult = service.addLogDangNhapToCollectionIfMissing(logDangNhapCollection, logDangNhap);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logDangNhap);
      });

      it('should add only unique LogDangNhap to an array', () => {
        const logDangNhapArray: ILogDangNhap[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logDangNhapCollection: ILogDangNhap[] = [sampleWithRequiredData];
        expectedResult = service.addLogDangNhapToCollectionIfMissing(logDangNhapCollection, ...logDangNhapArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logDangNhap: ILogDangNhap = sampleWithRequiredData;
        const logDangNhap2: ILogDangNhap = sampleWithPartialData;
        expectedResult = service.addLogDangNhapToCollectionIfMissing([], logDangNhap, logDangNhap2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logDangNhap);
        expect(expectedResult).toContain(logDangNhap2);
      });

      it('should accept null and undefined values', () => {
        const logDangNhap: ILogDangNhap = sampleWithRequiredData;
        expectedResult = service.addLogDangNhapToCollectionIfMissing([], null, logDangNhap, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logDangNhap);
      });

      it('should return initial array if no LogDangNhap is added', () => {
        const logDangNhapCollection: ILogDangNhap[] = [sampleWithRequiredData];
        expectedResult = service.addLogDangNhapToCollectionIfMissing(logDangNhapCollection, undefined, null);
        expect(expectedResult).toEqual(logDangNhapCollection);
      });
    });

    describe('compareLogDangNhap', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogDangNhap(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogDangNhap(entity1, entity2);
        const compareResult2 = service.compareLogDangNhap(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogDangNhap(entity1, entity2);
        const compareResult2 = service.compareLogDangNhap(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogDangNhap(entity1, entity2);
        const compareResult2 = service.compareLogDangNhap(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
