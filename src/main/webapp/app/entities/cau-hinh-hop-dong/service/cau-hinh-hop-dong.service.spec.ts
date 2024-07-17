import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICauHinhHopDong } from '../cau-hinh-hop-dong.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cau-hinh-hop-dong.test-samples';

import { CauHinhHopDongService } from './cau-hinh-hop-dong.service';

const requireRestSample: ICauHinhHopDong = {
  ...sampleWithRequiredData,
};

describe('CauHinhHopDong Service', () => {
  let service: CauHinhHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: ICauHinhHopDong | ICauHinhHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CauHinhHopDongService);
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

    it('should create a CauHinhHopDong', () => {
      const cauHinhHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cauHinhHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CauHinhHopDong', () => {
      const cauHinhHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cauHinhHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CauHinhHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CauHinhHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CauHinhHopDong', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCauHinhHopDongToCollectionIfMissing', () => {
      it('should add a CauHinhHopDong to an empty array', () => {
        const cauHinhHopDong: ICauHinhHopDong = sampleWithRequiredData;
        expectedResult = service.addCauHinhHopDongToCollectionIfMissing([], cauHinhHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhHopDong);
      });

      it('should not add a CauHinhHopDong to an array that contains it', () => {
        const cauHinhHopDong: ICauHinhHopDong = sampleWithRequiredData;
        const cauHinhHopDongCollection: ICauHinhHopDong[] = [
          {
            ...cauHinhHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCauHinhHopDongToCollectionIfMissing(cauHinhHopDongCollection, cauHinhHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CauHinhHopDong to an array that doesn't contain it", () => {
        const cauHinhHopDong: ICauHinhHopDong = sampleWithRequiredData;
        const cauHinhHopDongCollection: ICauHinhHopDong[] = [sampleWithPartialData];
        expectedResult = service.addCauHinhHopDongToCollectionIfMissing(cauHinhHopDongCollection, cauHinhHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhHopDong);
      });

      it('should add only unique CauHinhHopDong to an array', () => {
        const cauHinhHopDongArray: ICauHinhHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cauHinhHopDongCollection: ICauHinhHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhHopDongToCollectionIfMissing(cauHinhHopDongCollection, ...cauHinhHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cauHinhHopDong: ICauHinhHopDong = sampleWithRequiredData;
        const cauHinhHopDong2: ICauHinhHopDong = sampleWithPartialData;
        expectedResult = service.addCauHinhHopDongToCollectionIfMissing([], cauHinhHopDong, cauHinhHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhHopDong);
        expect(expectedResult).toContain(cauHinhHopDong2);
      });

      it('should accept null and undefined values', () => {
        const cauHinhHopDong: ICauHinhHopDong = sampleWithRequiredData;
        expectedResult = service.addCauHinhHopDongToCollectionIfMissing([], null, cauHinhHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhHopDong);
      });

      it('should return initial array if no CauHinhHopDong is added', () => {
        const cauHinhHopDongCollection: ICauHinhHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhHopDongToCollectionIfMissing(cauHinhHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(cauHinhHopDongCollection);
      });
    });

    describe('compareCauHinhHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCauHinhHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCauHinhHopDong(entity1, entity2);
        const compareResult2 = service.compareCauHinhHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCauHinhHopDong(entity1, entity2);
        const compareResult2 = service.compareCauHinhHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCauHinhHopDong(entity1, entity2);
        const compareResult2 = service.compareCauHinhHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
