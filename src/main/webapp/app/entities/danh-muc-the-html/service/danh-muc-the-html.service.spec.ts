import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucTheHtml } from '../danh-muc-the-html.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-the-html.test-samples';

import { DanhMucTheHtmlService } from './danh-muc-the-html.service';

const requireRestSample: IDanhMucTheHtml = {
  ...sampleWithRequiredData,
};

describe('DanhMucTheHtml Service', () => {
  let service: DanhMucTheHtmlService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucTheHtml | IDanhMucTheHtml[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucTheHtmlService);
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

    it('should create a DanhMucTheHtml', () => {
      const danhMucTheHtml = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucTheHtml).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucTheHtml', () => {
      const danhMucTheHtml = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucTheHtml).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucTheHtml', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucTheHtml', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucTheHtml', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucTheHtmlToCollectionIfMissing', () => {
      it('should add a DanhMucTheHtml to an empty array', () => {
        const danhMucTheHtml: IDanhMucTheHtml = sampleWithRequiredData;
        expectedResult = service.addDanhMucTheHtmlToCollectionIfMissing([], danhMucTheHtml);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTheHtml);
      });

      it('should not add a DanhMucTheHtml to an array that contains it', () => {
        const danhMucTheHtml: IDanhMucTheHtml = sampleWithRequiredData;
        const danhMucTheHtmlCollection: IDanhMucTheHtml[] = [
          {
            ...danhMucTheHtml,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucTheHtmlToCollectionIfMissing(danhMucTheHtmlCollection, danhMucTheHtml);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucTheHtml to an array that doesn't contain it", () => {
        const danhMucTheHtml: IDanhMucTheHtml = sampleWithRequiredData;
        const danhMucTheHtmlCollection: IDanhMucTheHtml[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucTheHtmlToCollectionIfMissing(danhMucTheHtmlCollection, danhMucTheHtml);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTheHtml);
      });

      it('should add only unique DanhMucTheHtml to an array', () => {
        const danhMucTheHtmlArray: IDanhMucTheHtml[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucTheHtmlCollection: IDanhMucTheHtml[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTheHtmlToCollectionIfMissing(danhMucTheHtmlCollection, ...danhMucTheHtmlArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucTheHtml: IDanhMucTheHtml = sampleWithRequiredData;
        const danhMucTheHtml2: IDanhMucTheHtml = sampleWithPartialData;
        expectedResult = service.addDanhMucTheHtmlToCollectionIfMissing([], danhMucTheHtml, danhMucTheHtml2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTheHtml);
        expect(expectedResult).toContain(danhMucTheHtml2);
      });

      it('should accept null and undefined values', () => {
        const danhMucTheHtml: IDanhMucTheHtml = sampleWithRequiredData;
        expectedResult = service.addDanhMucTheHtmlToCollectionIfMissing([], null, danhMucTheHtml, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTheHtml);
      });

      it('should return initial array if no DanhMucTheHtml is added', () => {
        const danhMucTheHtmlCollection: IDanhMucTheHtml[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTheHtmlToCollectionIfMissing(danhMucTheHtmlCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucTheHtmlCollection);
      });
    });

    describe('compareDanhMucTheHtml', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucTheHtml(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucTheHtml(entity1, entity2);
        const compareResult2 = service.compareDanhMucTheHtml(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucTheHtml(entity1, entity2);
        const compareResult2 = service.compareDanhMucTheHtml(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucTheHtml(entity1, entity2);
        const compareResult2 = service.compareDanhMucTheHtml(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
