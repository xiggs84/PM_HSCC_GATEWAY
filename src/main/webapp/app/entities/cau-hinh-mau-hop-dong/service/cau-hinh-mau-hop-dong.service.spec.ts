import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../cau-hinh-mau-hop-dong.test-samples';

import { CauHinhMauHopDongService, RestCauHinhMauHopDong } from './cau-hinh-mau-hop-dong.service';

const requireRestSample: RestCauHinhMauHopDong = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('CauHinhMauHopDong Service', () => {
  let service: CauHinhMauHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: ICauHinhMauHopDong | ICauHinhMauHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CauHinhMauHopDongService);
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

    it('should create a CauHinhMauHopDong', () => {
      const cauHinhMauHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cauHinhMauHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CauHinhMauHopDong', () => {
      const cauHinhMauHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cauHinhMauHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CauHinhMauHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CauHinhMauHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CauHinhMauHopDong', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCauHinhMauHopDongToCollectionIfMissing', () => {
      it('should add a CauHinhMauHopDong to an empty array', () => {
        const cauHinhMauHopDong: ICauHinhMauHopDong = sampleWithRequiredData;
        expectedResult = service.addCauHinhMauHopDongToCollectionIfMissing([], cauHinhMauHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhMauHopDong);
      });

      it('should not add a CauHinhMauHopDong to an array that contains it', () => {
        const cauHinhMauHopDong: ICauHinhMauHopDong = sampleWithRequiredData;
        const cauHinhMauHopDongCollection: ICauHinhMauHopDong[] = [
          {
            ...cauHinhMauHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCauHinhMauHopDongToCollectionIfMissing(cauHinhMauHopDongCollection, cauHinhMauHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CauHinhMauHopDong to an array that doesn't contain it", () => {
        const cauHinhMauHopDong: ICauHinhMauHopDong = sampleWithRequiredData;
        const cauHinhMauHopDongCollection: ICauHinhMauHopDong[] = [sampleWithPartialData];
        expectedResult = service.addCauHinhMauHopDongToCollectionIfMissing(cauHinhMauHopDongCollection, cauHinhMauHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhMauHopDong);
      });

      it('should add only unique CauHinhMauHopDong to an array', () => {
        const cauHinhMauHopDongArray: ICauHinhMauHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cauHinhMauHopDongCollection: ICauHinhMauHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhMauHopDongToCollectionIfMissing(cauHinhMauHopDongCollection, ...cauHinhMauHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cauHinhMauHopDong: ICauHinhMauHopDong = sampleWithRequiredData;
        const cauHinhMauHopDong2: ICauHinhMauHopDong = sampleWithPartialData;
        expectedResult = service.addCauHinhMauHopDongToCollectionIfMissing([], cauHinhMauHopDong, cauHinhMauHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhMauHopDong);
        expect(expectedResult).toContain(cauHinhMauHopDong2);
      });

      it('should accept null and undefined values', () => {
        const cauHinhMauHopDong: ICauHinhMauHopDong = sampleWithRequiredData;
        expectedResult = service.addCauHinhMauHopDongToCollectionIfMissing([], null, cauHinhMauHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhMauHopDong);
      });

      it('should return initial array if no CauHinhMauHopDong is added', () => {
        const cauHinhMauHopDongCollection: ICauHinhMauHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhMauHopDongToCollectionIfMissing(cauHinhMauHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(cauHinhMauHopDongCollection);
      });
    });

    describe('compareCauHinhMauHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCauHinhMauHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCauHinhMauHopDong(entity1, entity2);
        const compareResult2 = service.compareCauHinhMauHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCauHinhMauHopDong(entity1, entity2);
        const compareResult2 = service.compareCauHinhMauHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCauHinhMauHopDong(entity1, entity2);
        const compareResult2 = service.compareCauHinhMauHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
