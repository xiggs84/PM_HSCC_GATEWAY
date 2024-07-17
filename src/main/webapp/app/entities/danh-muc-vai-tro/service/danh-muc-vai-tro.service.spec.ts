import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucVaiTro } from '../danh-muc-vai-tro.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-vai-tro.test-samples';

import { DanhMucVaiTroService } from './danh-muc-vai-tro.service';

const requireRestSample: IDanhMucVaiTro = {
  ...sampleWithRequiredData,
};

describe('DanhMucVaiTro Service', () => {
  let service: DanhMucVaiTroService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucVaiTro | IDanhMucVaiTro[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucVaiTroService);
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

    it('should create a DanhMucVaiTro', () => {
      const danhMucVaiTro = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucVaiTro).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucVaiTro', () => {
      const danhMucVaiTro = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucVaiTro).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucVaiTro', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucVaiTro', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucVaiTro', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucVaiTroToCollectionIfMissing', () => {
      it('should add a DanhMucVaiTro to an empty array', () => {
        const danhMucVaiTro: IDanhMucVaiTro = sampleWithRequiredData;
        expectedResult = service.addDanhMucVaiTroToCollectionIfMissing([], danhMucVaiTro);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucVaiTro);
      });

      it('should not add a DanhMucVaiTro to an array that contains it', () => {
        const danhMucVaiTro: IDanhMucVaiTro = sampleWithRequiredData;
        const danhMucVaiTroCollection: IDanhMucVaiTro[] = [
          {
            ...danhMucVaiTro,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucVaiTroToCollectionIfMissing(danhMucVaiTroCollection, danhMucVaiTro);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucVaiTro to an array that doesn't contain it", () => {
        const danhMucVaiTro: IDanhMucVaiTro = sampleWithRequiredData;
        const danhMucVaiTroCollection: IDanhMucVaiTro[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucVaiTroToCollectionIfMissing(danhMucVaiTroCollection, danhMucVaiTro);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucVaiTro);
      });

      it('should add only unique DanhMucVaiTro to an array', () => {
        const danhMucVaiTroArray: IDanhMucVaiTro[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucVaiTroCollection: IDanhMucVaiTro[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucVaiTroToCollectionIfMissing(danhMucVaiTroCollection, ...danhMucVaiTroArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucVaiTro: IDanhMucVaiTro = sampleWithRequiredData;
        const danhMucVaiTro2: IDanhMucVaiTro = sampleWithPartialData;
        expectedResult = service.addDanhMucVaiTroToCollectionIfMissing([], danhMucVaiTro, danhMucVaiTro2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucVaiTro);
        expect(expectedResult).toContain(danhMucVaiTro2);
      });

      it('should accept null and undefined values', () => {
        const danhMucVaiTro: IDanhMucVaiTro = sampleWithRequiredData;
        expectedResult = service.addDanhMucVaiTroToCollectionIfMissing([], null, danhMucVaiTro, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucVaiTro);
      });

      it('should return initial array if no DanhMucVaiTro is added', () => {
        const danhMucVaiTroCollection: IDanhMucVaiTro[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucVaiTroToCollectionIfMissing(danhMucVaiTroCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucVaiTroCollection);
      });
    });

    describe('compareDanhMucVaiTro', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucVaiTro(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucVaiTro(entity1, entity2);
        const compareResult2 = service.compareDanhMucVaiTro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucVaiTro(entity1, entity2);
        const compareResult2 = service.compareDanhMucVaiTro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucVaiTro(entity1, entity2);
        const compareResult2 = service.compareDanhMucVaiTro(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
