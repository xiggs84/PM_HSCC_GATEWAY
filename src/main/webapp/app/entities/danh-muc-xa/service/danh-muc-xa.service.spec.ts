import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucXa } from '../danh-muc-xa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-xa.test-samples';

import { DanhMucXaService } from './danh-muc-xa.service';

const requireRestSample: IDanhMucXa = {
  ...sampleWithRequiredData,
};

describe('DanhMucXa Service', () => {
  let service: DanhMucXaService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucXa | IDanhMucXa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucXaService);
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

    it('should create a DanhMucXa', () => {
      const danhMucXa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucXa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucXa', () => {
      const danhMucXa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucXa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucXa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucXa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucXa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucXaToCollectionIfMissing', () => {
      it('should add a DanhMucXa to an empty array', () => {
        const danhMucXa: IDanhMucXa = sampleWithRequiredData;
        expectedResult = service.addDanhMucXaToCollectionIfMissing([], danhMucXa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucXa);
      });

      it('should not add a DanhMucXa to an array that contains it', () => {
        const danhMucXa: IDanhMucXa = sampleWithRequiredData;
        const danhMucXaCollection: IDanhMucXa[] = [
          {
            ...danhMucXa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucXaToCollectionIfMissing(danhMucXaCollection, danhMucXa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucXa to an array that doesn't contain it", () => {
        const danhMucXa: IDanhMucXa = sampleWithRequiredData;
        const danhMucXaCollection: IDanhMucXa[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucXaToCollectionIfMissing(danhMucXaCollection, danhMucXa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucXa);
      });

      it('should add only unique DanhMucXa to an array', () => {
        const danhMucXaArray: IDanhMucXa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucXaCollection: IDanhMucXa[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucXaToCollectionIfMissing(danhMucXaCollection, ...danhMucXaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucXa: IDanhMucXa = sampleWithRequiredData;
        const danhMucXa2: IDanhMucXa = sampleWithPartialData;
        expectedResult = service.addDanhMucXaToCollectionIfMissing([], danhMucXa, danhMucXa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucXa);
        expect(expectedResult).toContain(danhMucXa2);
      });

      it('should accept null and undefined values', () => {
        const danhMucXa: IDanhMucXa = sampleWithRequiredData;
        expectedResult = service.addDanhMucXaToCollectionIfMissing([], null, danhMucXa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucXa);
      });

      it('should return initial array if no DanhMucXa is added', () => {
        const danhMucXaCollection: IDanhMucXa[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucXaToCollectionIfMissing(danhMucXaCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucXaCollection);
      });
    });

    describe('compareDanhMucXa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucXa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucXa(entity1, entity2);
        const compareResult2 = service.compareDanhMucXa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucXa(entity1, entity2);
        const compareResult2 = service.compareDanhMucXa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucXa(entity1, entity2);
        const compareResult2 = service.compareDanhMucXa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
