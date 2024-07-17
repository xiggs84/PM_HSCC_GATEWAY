import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-ngoai-te.test-samples';

import { DanhMucNgoaiTeService } from './danh-muc-ngoai-te.service';

const requireRestSample: IDanhMucNgoaiTe = {
  ...sampleWithRequiredData,
};

describe('DanhMucNgoaiTe Service', () => {
  let service: DanhMucNgoaiTeService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucNgoaiTe | IDanhMucNgoaiTe[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucNgoaiTeService);
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

    it('should create a DanhMucNgoaiTe', () => {
      const danhMucNgoaiTe = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucNgoaiTe).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucNgoaiTe', () => {
      const danhMucNgoaiTe = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucNgoaiTe).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucNgoaiTe', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucNgoaiTe', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucNgoaiTe', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucNgoaiTeToCollectionIfMissing', () => {
      it('should add a DanhMucNgoaiTe to an empty array', () => {
        const danhMucNgoaiTe: IDanhMucNgoaiTe = sampleWithRequiredData;
        expectedResult = service.addDanhMucNgoaiTeToCollectionIfMissing([], danhMucNgoaiTe);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNgoaiTe);
      });

      it('should not add a DanhMucNgoaiTe to an array that contains it', () => {
        const danhMucNgoaiTe: IDanhMucNgoaiTe = sampleWithRequiredData;
        const danhMucNgoaiTeCollection: IDanhMucNgoaiTe[] = [
          {
            ...danhMucNgoaiTe,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucNgoaiTeToCollectionIfMissing(danhMucNgoaiTeCollection, danhMucNgoaiTe);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucNgoaiTe to an array that doesn't contain it", () => {
        const danhMucNgoaiTe: IDanhMucNgoaiTe = sampleWithRequiredData;
        const danhMucNgoaiTeCollection: IDanhMucNgoaiTe[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucNgoaiTeToCollectionIfMissing(danhMucNgoaiTeCollection, danhMucNgoaiTe);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNgoaiTe);
      });

      it('should add only unique DanhMucNgoaiTe to an array', () => {
        const danhMucNgoaiTeArray: IDanhMucNgoaiTe[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucNgoaiTeCollection: IDanhMucNgoaiTe[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNgoaiTeToCollectionIfMissing(danhMucNgoaiTeCollection, ...danhMucNgoaiTeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucNgoaiTe: IDanhMucNgoaiTe = sampleWithRequiredData;
        const danhMucNgoaiTe2: IDanhMucNgoaiTe = sampleWithPartialData;
        expectedResult = service.addDanhMucNgoaiTeToCollectionIfMissing([], danhMucNgoaiTe, danhMucNgoaiTe2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNgoaiTe);
        expect(expectedResult).toContain(danhMucNgoaiTe2);
      });

      it('should accept null and undefined values', () => {
        const danhMucNgoaiTe: IDanhMucNgoaiTe = sampleWithRequiredData;
        expectedResult = service.addDanhMucNgoaiTeToCollectionIfMissing([], null, danhMucNgoaiTe, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNgoaiTe);
      });

      it('should return initial array if no DanhMucNgoaiTe is added', () => {
        const danhMucNgoaiTeCollection: IDanhMucNgoaiTe[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNgoaiTeToCollectionIfMissing(danhMucNgoaiTeCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucNgoaiTeCollection);
      });
    });

    describe('compareDanhMucNgoaiTe', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucNgoaiTe(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucNgoaiTe(entity1, entity2);
        const compareResult2 = service.compareDanhMucNgoaiTe(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucNgoaiTe(entity1, entity2);
        const compareResult2 = service.compareDanhMucNgoaiTe(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucNgoaiTe(entity1, entity2);
        const compareResult2 = service.compareDanhMucNgoaiTe(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
