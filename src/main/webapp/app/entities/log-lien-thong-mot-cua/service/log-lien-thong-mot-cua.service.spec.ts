import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILogLienThongMotCua } from '../log-lien-thong-mot-cua.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../log-lien-thong-mot-cua.test-samples';

import { LogLienThongMotCuaService, RestLogLienThongMotCua } from './log-lien-thong-mot-cua.service';

const requireRestSample: RestLogLienThongMotCua = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('LogLienThongMotCua Service', () => {
  let service: LogLienThongMotCuaService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogLienThongMotCua | ILogLienThongMotCua[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LogLienThongMotCuaService);
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

    it('should create a LogLienThongMotCua', () => {
      const logLienThongMotCua = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logLienThongMotCua).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogLienThongMotCua', () => {
      const logLienThongMotCua = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logLienThongMotCua).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogLienThongMotCua', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogLienThongMotCua', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogLienThongMotCua', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogLienThongMotCuaToCollectionIfMissing', () => {
      it('should add a LogLienThongMotCua to an empty array', () => {
        const logLienThongMotCua: ILogLienThongMotCua = sampleWithRequiredData;
        expectedResult = service.addLogLienThongMotCuaToCollectionIfMissing([], logLienThongMotCua);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logLienThongMotCua);
      });

      it('should not add a LogLienThongMotCua to an array that contains it', () => {
        const logLienThongMotCua: ILogLienThongMotCua = sampleWithRequiredData;
        const logLienThongMotCuaCollection: ILogLienThongMotCua[] = [
          {
            ...logLienThongMotCua,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogLienThongMotCuaToCollectionIfMissing(logLienThongMotCuaCollection, logLienThongMotCua);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogLienThongMotCua to an array that doesn't contain it", () => {
        const logLienThongMotCua: ILogLienThongMotCua = sampleWithRequiredData;
        const logLienThongMotCuaCollection: ILogLienThongMotCua[] = [sampleWithPartialData];
        expectedResult = service.addLogLienThongMotCuaToCollectionIfMissing(logLienThongMotCuaCollection, logLienThongMotCua);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logLienThongMotCua);
      });

      it('should add only unique LogLienThongMotCua to an array', () => {
        const logLienThongMotCuaArray: ILogLienThongMotCua[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logLienThongMotCuaCollection: ILogLienThongMotCua[] = [sampleWithRequiredData];
        expectedResult = service.addLogLienThongMotCuaToCollectionIfMissing(logLienThongMotCuaCollection, ...logLienThongMotCuaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logLienThongMotCua: ILogLienThongMotCua = sampleWithRequiredData;
        const logLienThongMotCua2: ILogLienThongMotCua = sampleWithPartialData;
        expectedResult = service.addLogLienThongMotCuaToCollectionIfMissing([], logLienThongMotCua, logLienThongMotCua2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logLienThongMotCua);
        expect(expectedResult).toContain(logLienThongMotCua2);
      });

      it('should accept null and undefined values', () => {
        const logLienThongMotCua: ILogLienThongMotCua = sampleWithRequiredData;
        expectedResult = service.addLogLienThongMotCuaToCollectionIfMissing([], null, logLienThongMotCua, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logLienThongMotCua);
      });

      it('should return initial array if no LogLienThongMotCua is added', () => {
        const logLienThongMotCuaCollection: ILogLienThongMotCua[] = [sampleWithRequiredData];
        expectedResult = service.addLogLienThongMotCuaToCollectionIfMissing(logLienThongMotCuaCollection, undefined, null);
        expect(expectedResult).toEqual(logLienThongMotCuaCollection);
      });
    });

    describe('compareLogLienThongMotCua', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogLienThongMotCua(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogLienThongMotCua(entity1, entity2);
        const compareResult2 = service.compareLogLienThongMotCua(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogLienThongMotCua(entity1, entity2);
        const compareResult2 = service.compareLogLienThongMotCua(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogLienThongMotCua(entity1, entity2);
        const compareResult2 = service.compareLogLienThongMotCua(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
