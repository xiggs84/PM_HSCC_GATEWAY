import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-ngon-ngu.test-samples';

import { DanhMucNgonNguService } from './danh-muc-ngon-ngu.service';

const requireRestSample: IDanhMucNgonNgu = {
  ...sampleWithRequiredData,
};

describe('DanhMucNgonNgu Service', () => {
  let service: DanhMucNgonNguService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucNgonNgu | IDanhMucNgonNgu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucNgonNguService);
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

    it('should create a DanhMucNgonNgu', () => {
      const danhMucNgonNgu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucNgonNgu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucNgonNgu', () => {
      const danhMucNgonNgu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucNgonNgu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucNgonNgu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucNgonNgu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucNgonNgu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucNgonNguToCollectionIfMissing', () => {
      it('should add a DanhMucNgonNgu to an empty array', () => {
        const danhMucNgonNgu: IDanhMucNgonNgu = sampleWithRequiredData;
        expectedResult = service.addDanhMucNgonNguToCollectionIfMissing([], danhMucNgonNgu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNgonNgu);
      });

      it('should not add a DanhMucNgonNgu to an array that contains it', () => {
        const danhMucNgonNgu: IDanhMucNgonNgu = sampleWithRequiredData;
        const danhMucNgonNguCollection: IDanhMucNgonNgu[] = [
          {
            ...danhMucNgonNgu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucNgonNguToCollectionIfMissing(danhMucNgonNguCollection, danhMucNgonNgu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucNgonNgu to an array that doesn't contain it", () => {
        const danhMucNgonNgu: IDanhMucNgonNgu = sampleWithRequiredData;
        const danhMucNgonNguCollection: IDanhMucNgonNgu[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucNgonNguToCollectionIfMissing(danhMucNgonNguCollection, danhMucNgonNgu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNgonNgu);
      });

      it('should add only unique DanhMucNgonNgu to an array', () => {
        const danhMucNgonNguArray: IDanhMucNgonNgu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucNgonNguCollection: IDanhMucNgonNgu[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNgonNguToCollectionIfMissing(danhMucNgonNguCollection, ...danhMucNgonNguArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucNgonNgu: IDanhMucNgonNgu = sampleWithRequiredData;
        const danhMucNgonNgu2: IDanhMucNgonNgu = sampleWithPartialData;
        expectedResult = service.addDanhMucNgonNguToCollectionIfMissing([], danhMucNgonNgu, danhMucNgonNgu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNgonNgu);
        expect(expectedResult).toContain(danhMucNgonNgu2);
      });

      it('should accept null and undefined values', () => {
        const danhMucNgonNgu: IDanhMucNgonNgu = sampleWithRequiredData;
        expectedResult = service.addDanhMucNgonNguToCollectionIfMissing([], null, danhMucNgonNgu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNgonNgu);
      });

      it('should return initial array if no DanhMucNgonNgu is added', () => {
        const danhMucNgonNguCollection: IDanhMucNgonNgu[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNgonNguToCollectionIfMissing(danhMucNgonNguCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucNgonNguCollection);
      });
    });

    describe('compareDanhMucNgonNgu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucNgonNgu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucNgonNgu(entity1, entity2);
        const compareResult2 = service.compareDanhMucNgonNgu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucNgonNgu(entity1, entity2);
        const compareResult2 = service.compareDanhMucNgonNgu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucNgonNgu(entity1, entity2);
        const compareResult2 = service.compareDanhMucNgonNgu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
