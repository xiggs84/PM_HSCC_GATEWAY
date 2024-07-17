import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-cap-quan-ly.test-samples';

import { DanhMucCapQuanLyService } from './danh-muc-cap-quan-ly.service';

const requireRestSample: IDanhMucCapQuanLy = {
  ...sampleWithRequiredData,
};

describe('DanhMucCapQuanLy Service', () => {
  let service: DanhMucCapQuanLyService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucCapQuanLy | IDanhMucCapQuanLy[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucCapQuanLyService);
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

    it('should create a DanhMucCapQuanLy', () => {
      const danhMucCapQuanLy = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucCapQuanLy).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucCapQuanLy', () => {
      const danhMucCapQuanLy = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucCapQuanLy).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucCapQuanLy', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucCapQuanLy', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucCapQuanLy', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucCapQuanLyToCollectionIfMissing', () => {
      it('should add a DanhMucCapQuanLy to an empty array', () => {
        const danhMucCapQuanLy: IDanhMucCapQuanLy = sampleWithRequiredData;
        expectedResult = service.addDanhMucCapQuanLyToCollectionIfMissing([], danhMucCapQuanLy);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucCapQuanLy);
      });

      it('should not add a DanhMucCapQuanLy to an array that contains it', () => {
        const danhMucCapQuanLy: IDanhMucCapQuanLy = sampleWithRequiredData;
        const danhMucCapQuanLyCollection: IDanhMucCapQuanLy[] = [
          {
            ...danhMucCapQuanLy,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucCapQuanLyToCollectionIfMissing(danhMucCapQuanLyCollection, danhMucCapQuanLy);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucCapQuanLy to an array that doesn't contain it", () => {
        const danhMucCapQuanLy: IDanhMucCapQuanLy = sampleWithRequiredData;
        const danhMucCapQuanLyCollection: IDanhMucCapQuanLy[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucCapQuanLyToCollectionIfMissing(danhMucCapQuanLyCollection, danhMucCapQuanLy);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucCapQuanLy);
      });

      it('should add only unique DanhMucCapQuanLy to an array', () => {
        const danhMucCapQuanLyArray: IDanhMucCapQuanLy[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucCapQuanLyCollection: IDanhMucCapQuanLy[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucCapQuanLyToCollectionIfMissing(danhMucCapQuanLyCollection, ...danhMucCapQuanLyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucCapQuanLy: IDanhMucCapQuanLy = sampleWithRequiredData;
        const danhMucCapQuanLy2: IDanhMucCapQuanLy = sampleWithPartialData;
        expectedResult = service.addDanhMucCapQuanLyToCollectionIfMissing([], danhMucCapQuanLy, danhMucCapQuanLy2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucCapQuanLy);
        expect(expectedResult).toContain(danhMucCapQuanLy2);
      });

      it('should accept null and undefined values', () => {
        const danhMucCapQuanLy: IDanhMucCapQuanLy = sampleWithRequiredData;
        expectedResult = service.addDanhMucCapQuanLyToCollectionIfMissing([], null, danhMucCapQuanLy, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucCapQuanLy);
      });

      it('should return initial array if no DanhMucCapQuanLy is added', () => {
        const danhMucCapQuanLyCollection: IDanhMucCapQuanLy[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucCapQuanLyToCollectionIfMissing(danhMucCapQuanLyCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucCapQuanLyCollection);
      });
    });

    describe('compareDanhMucCapQuanLy', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucCapQuanLy(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucCapQuanLy(entity1, entity2);
        const compareResult2 = service.compareDanhMucCapQuanLy(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucCapQuanLy(entity1, entity2);
        const compareResult2 = service.compareDanhMucCapQuanLy(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucCapQuanLy(entity1, entity2);
        const compareResult2 = service.compareDanhMucCapQuanLy(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
