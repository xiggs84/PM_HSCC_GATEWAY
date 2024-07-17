import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-dau-so-cmnd.test-samples';

import { DanhMucDauSoCmndService } from './danh-muc-dau-so-cmnd.service';

const requireRestSample: IDanhMucDauSoCmnd = {
  ...sampleWithRequiredData,
};

describe('DanhMucDauSoCmnd Service', () => {
  let service: DanhMucDauSoCmndService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucDauSoCmnd | IDanhMucDauSoCmnd[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucDauSoCmndService);
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

    it('should create a DanhMucDauSoCmnd', () => {
      const danhMucDauSoCmnd = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucDauSoCmnd).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucDauSoCmnd', () => {
      const danhMucDauSoCmnd = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucDauSoCmnd).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucDauSoCmnd', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucDauSoCmnd', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucDauSoCmnd', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucDauSoCmndToCollectionIfMissing', () => {
      it('should add a DanhMucDauSoCmnd to an empty array', () => {
        const danhMucDauSoCmnd: IDanhMucDauSoCmnd = sampleWithRequiredData;
        expectedResult = service.addDanhMucDauSoCmndToCollectionIfMissing([], danhMucDauSoCmnd);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucDauSoCmnd);
      });

      it('should not add a DanhMucDauSoCmnd to an array that contains it', () => {
        const danhMucDauSoCmnd: IDanhMucDauSoCmnd = sampleWithRequiredData;
        const danhMucDauSoCmndCollection: IDanhMucDauSoCmnd[] = [
          {
            ...danhMucDauSoCmnd,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucDauSoCmndToCollectionIfMissing(danhMucDauSoCmndCollection, danhMucDauSoCmnd);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucDauSoCmnd to an array that doesn't contain it", () => {
        const danhMucDauSoCmnd: IDanhMucDauSoCmnd = sampleWithRequiredData;
        const danhMucDauSoCmndCollection: IDanhMucDauSoCmnd[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucDauSoCmndToCollectionIfMissing(danhMucDauSoCmndCollection, danhMucDauSoCmnd);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucDauSoCmnd);
      });

      it('should add only unique DanhMucDauSoCmnd to an array', () => {
        const danhMucDauSoCmndArray: IDanhMucDauSoCmnd[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucDauSoCmndCollection: IDanhMucDauSoCmnd[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucDauSoCmndToCollectionIfMissing(danhMucDauSoCmndCollection, ...danhMucDauSoCmndArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucDauSoCmnd: IDanhMucDauSoCmnd = sampleWithRequiredData;
        const danhMucDauSoCmnd2: IDanhMucDauSoCmnd = sampleWithPartialData;
        expectedResult = service.addDanhMucDauSoCmndToCollectionIfMissing([], danhMucDauSoCmnd, danhMucDauSoCmnd2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucDauSoCmnd);
        expect(expectedResult).toContain(danhMucDauSoCmnd2);
      });

      it('should accept null and undefined values', () => {
        const danhMucDauSoCmnd: IDanhMucDauSoCmnd = sampleWithRequiredData;
        expectedResult = service.addDanhMucDauSoCmndToCollectionIfMissing([], null, danhMucDauSoCmnd, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucDauSoCmnd);
      });

      it('should return initial array if no DanhMucDauSoCmnd is added', () => {
        const danhMucDauSoCmndCollection: IDanhMucDauSoCmnd[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucDauSoCmndToCollectionIfMissing(danhMucDauSoCmndCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucDauSoCmndCollection);
      });
    });

    describe('compareDanhMucDauSoCmnd', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucDauSoCmnd(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucDauSoCmnd(entity1, entity2);
        const compareResult2 = service.compareDanhMucDauSoCmnd(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucDauSoCmnd(entity1, entity2);
        const compareResult2 = service.compareDanhMucDauSoCmnd(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucDauSoCmnd(entity1, entity2);
        const compareResult2 = service.compareDanhMucDauSoCmnd(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
