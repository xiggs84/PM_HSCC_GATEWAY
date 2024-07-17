import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-file-upload-kyso.test-samples';

import { DanhMucFileUploadKysoService, RestDanhMucFileUploadKyso } from './danh-muc-file-upload-kyso.service';

const requireRestSample: RestDanhMucFileUploadKyso = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.toJSON(),
};

describe('DanhMucFileUploadKyso Service', () => {
  let service: DanhMucFileUploadKysoService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucFileUploadKyso | IDanhMucFileUploadKyso[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucFileUploadKysoService);
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

    it('should create a DanhMucFileUploadKyso', () => {
      const danhMucFileUploadKyso = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucFileUploadKyso).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucFileUploadKyso', () => {
      const danhMucFileUploadKyso = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucFileUploadKyso).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucFileUploadKyso', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucFileUploadKyso', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucFileUploadKyso', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucFileUploadKysoToCollectionIfMissing', () => {
      it('should add a DanhMucFileUploadKyso to an empty array', () => {
        const danhMucFileUploadKyso: IDanhMucFileUploadKyso = sampleWithRequiredData;
        expectedResult = service.addDanhMucFileUploadKysoToCollectionIfMissing([], danhMucFileUploadKyso);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucFileUploadKyso);
      });

      it('should not add a DanhMucFileUploadKyso to an array that contains it', () => {
        const danhMucFileUploadKyso: IDanhMucFileUploadKyso = sampleWithRequiredData;
        const danhMucFileUploadKysoCollection: IDanhMucFileUploadKyso[] = [
          {
            ...danhMucFileUploadKyso,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucFileUploadKysoToCollectionIfMissing(danhMucFileUploadKysoCollection, danhMucFileUploadKyso);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucFileUploadKyso to an array that doesn't contain it", () => {
        const danhMucFileUploadKyso: IDanhMucFileUploadKyso = sampleWithRequiredData;
        const danhMucFileUploadKysoCollection: IDanhMucFileUploadKyso[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucFileUploadKysoToCollectionIfMissing(danhMucFileUploadKysoCollection, danhMucFileUploadKyso);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucFileUploadKyso);
      });

      it('should add only unique DanhMucFileUploadKyso to an array', () => {
        const danhMucFileUploadKysoArray: IDanhMucFileUploadKyso[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucFileUploadKysoCollection: IDanhMucFileUploadKyso[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucFileUploadKysoToCollectionIfMissing(
          danhMucFileUploadKysoCollection,
          ...danhMucFileUploadKysoArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucFileUploadKyso: IDanhMucFileUploadKyso = sampleWithRequiredData;
        const danhMucFileUploadKyso2: IDanhMucFileUploadKyso = sampleWithPartialData;
        expectedResult = service.addDanhMucFileUploadKysoToCollectionIfMissing([], danhMucFileUploadKyso, danhMucFileUploadKyso2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucFileUploadKyso);
        expect(expectedResult).toContain(danhMucFileUploadKyso2);
      });

      it('should accept null and undefined values', () => {
        const danhMucFileUploadKyso: IDanhMucFileUploadKyso = sampleWithRequiredData;
        expectedResult = service.addDanhMucFileUploadKysoToCollectionIfMissing([], null, danhMucFileUploadKyso, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucFileUploadKyso);
      });

      it('should return initial array if no DanhMucFileUploadKyso is added', () => {
        const danhMucFileUploadKysoCollection: IDanhMucFileUploadKyso[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucFileUploadKysoToCollectionIfMissing(danhMucFileUploadKysoCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucFileUploadKysoCollection);
      });
    });

    describe('compareDanhMucFileUploadKyso', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucFileUploadKyso(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucFileUploadKyso(entity1, entity2);
        const compareResult2 = service.compareDanhMucFileUploadKyso(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucFileUploadKyso(entity1, entity2);
        const compareResult2 = service.compareDanhMucFileUploadKyso(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucFileUploadKyso(entity1, entity2);
        const compareResult2 = service.compareDanhMucFileUploadKyso(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
