import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../log-hoa-don-dien-tu.test-samples';

import { LogHoaDonDienTuService, RestLogHoaDonDienTu } from './log-hoa-don-dien-tu.service';

const requireRestSample: RestLogHoaDonDienTu = {
  ...sampleWithRequiredData,
  ngayPhatHanh: sampleWithRequiredData.ngayPhatHanh?.format(DATE_FORMAT),
};

describe('LogHoaDonDienTu Service', () => {
  let service: LogHoaDonDienTuService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogHoaDonDienTu | ILogHoaDonDienTu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LogHoaDonDienTuService);
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

    it('should create a LogHoaDonDienTu', () => {
      const logHoaDonDienTu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logHoaDonDienTu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogHoaDonDienTu', () => {
      const logHoaDonDienTu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logHoaDonDienTu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogHoaDonDienTu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogHoaDonDienTu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogHoaDonDienTu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogHoaDonDienTuToCollectionIfMissing', () => {
      it('should add a LogHoaDonDienTu to an empty array', () => {
        const logHoaDonDienTu: ILogHoaDonDienTu = sampleWithRequiredData;
        expectedResult = service.addLogHoaDonDienTuToCollectionIfMissing([], logHoaDonDienTu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logHoaDonDienTu);
      });

      it('should not add a LogHoaDonDienTu to an array that contains it', () => {
        const logHoaDonDienTu: ILogHoaDonDienTu = sampleWithRequiredData;
        const logHoaDonDienTuCollection: ILogHoaDonDienTu[] = [
          {
            ...logHoaDonDienTu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogHoaDonDienTuToCollectionIfMissing(logHoaDonDienTuCollection, logHoaDonDienTu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogHoaDonDienTu to an array that doesn't contain it", () => {
        const logHoaDonDienTu: ILogHoaDonDienTu = sampleWithRequiredData;
        const logHoaDonDienTuCollection: ILogHoaDonDienTu[] = [sampleWithPartialData];
        expectedResult = service.addLogHoaDonDienTuToCollectionIfMissing(logHoaDonDienTuCollection, logHoaDonDienTu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logHoaDonDienTu);
      });

      it('should add only unique LogHoaDonDienTu to an array', () => {
        const logHoaDonDienTuArray: ILogHoaDonDienTu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logHoaDonDienTuCollection: ILogHoaDonDienTu[] = [sampleWithRequiredData];
        expectedResult = service.addLogHoaDonDienTuToCollectionIfMissing(logHoaDonDienTuCollection, ...logHoaDonDienTuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logHoaDonDienTu: ILogHoaDonDienTu = sampleWithRequiredData;
        const logHoaDonDienTu2: ILogHoaDonDienTu = sampleWithPartialData;
        expectedResult = service.addLogHoaDonDienTuToCollectionIfMissing([], logHoaDonDienTu, logHoaDonDienTu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logHoaDonDienTu);
        expect(expectedResult).toContain(logHoaDonDienTu2);
      });

      it('should accept null and undefined values', () => {
        const logHoaDonDienTu: ILogHoaDonDienTu = sampleWithRequiredData;
        expectedResult = service.addLogHoaDonDienTuToCollectionIfMissing([], null, logHoaDonDienTu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logHoaDonDienTu);
      });

      it('should return initial array if no LogHoaDonDienTu is added', () => {
        const logHoaDonDienTuCollection: ILogHoaDonDienTu[] = [sampleWithRequiredData];
        expectedResult = service.addLogHoaDonDienTuToCollectionIfMissing(logHoaDonDienTuCollection, undefined, null);
        expect(expectedResult).toEqual(logHoaDonDienTuCollection);
      });
    });

    describe('compareLogHoaDonDienTu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogHoaDonDienTu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogHoaDonDienTu(entity1, entity2);
        const compareResult2 = service.compareLogHoaDonDienTu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogHoaDonDienTu(entity1, entity2);
        const compareResult2 = service.compareLogHoaDonDienTu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogHoaDonDienTu(entity1, entity2);
        const compareResult2 = service.compareLogHoaDonDienTu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
