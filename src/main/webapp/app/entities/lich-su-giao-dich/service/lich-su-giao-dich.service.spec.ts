import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILichSuGiaoDich } from '../lich-su-giao-dich.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../lich-su-giao-dich.test-samples';

import { LichSuGiaoDichService, RestLichSuGiaoDich } from './lich-su-giao-dich.service';

const requireRestSample: RestLichSuGiaoDich = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('LichSuGiaoDich Service', () => {
  let service: LichSuGiaoDichService;
  let httpMock: HttpTestingController;
  let expectedResult: ILichSuGiaoDich | ILichSuGiaoDich[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LichSuGiaoDichService);
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

    it('should create a LichSuGiaoDich', () => {
      const lichSuGiaoDich = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(lichSuGiaoDich).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LichSuGiaoDich', () => {
      const lichSuGiaoDich = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(lichSuGiaoDich).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LichSuGiaoDich', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LichSuGiaoDich', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LichSuGiaoDich', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLichSuGiaoDichToCollectionIfMissing', () => {
      it('should add a LichSuGiaoDich to an empty array', () => {
        const lichSuGiaoDich: ILichSuGiaoDich = sampleWithRequiredData;
        expectedResult = service.addLichSuGiaoDichToCollectionIfMissing([], lichSuGiaoDich);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lichSuGiaoDich);
      });

      it('should not add a LichSuGiaoDich to an array that contains it', () => {
        const lichSuGiaoDich: ILichSuGiaoDich = sampleWithRequiredData;
        const lichSuGiaoDichCollection: ILichSuGiaoDich[] = [
          {
            ...lichSuGiaoDich,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLichSuGiaoDichToCollectionIfMissing(lichSuGiaoDichCollection, lichSuGiaoDich);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LichSuGiaoDich to an array that doesn't contain it", () => {
        const lichSuGiaoDich: ILichSuGiaoDich = sampleWithRequiredData;
        const lichSuGiaoDichCollection: ILichSuGiaoDich[] = [sampleWithPartialData];
        expectedResult = service.addLichSuGiaoDichToCollectionIfMissing(lichSuGiaoDichCollection, lichSuGiaoDich);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lichSuGiaoDich);
      });

      it('should add only unique LichSuGiaoDich to an array', () => {
        const lichSuGiaoDichArray: ILichSuGiaoDich[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const lichSuGiaoDichCollection: ILichSuGiaoDich[] = [sampleWithRequiredData];
        expectedResult = service.addLichSuGiaoDichToCollectionIfMissing(lichSuGiaoDichCollection, ...lichSuGiaoDichArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const lichSuGiaoDich: ILichSuGiaoDich = sampleWithRequiredData;
        const lichSuGiaoDich2: ILichSuGiaoDich = sampleWithPartialData;
        expectedResult = service.addLichSuGiaoDichToCollectionIfMissing([], lichSuGiaoDich, lichSuGiaoDich2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lichSuGiaoDich);
        expect(expectedResult).toContain(lichSuGiaoDich2);
      });

      it('should accept null and undefined values', () => {
        const lichSuGiaoDich: ILichSuGiaoDich = sampleWithRequiredData;
        expectedResult = service.addLichSuGiaoDichToCollectionIfMissing([], null, lichSuGiaoDich, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lichSuGiaoDich);
      });

      it('should return initial array if no LichSuGiaoDich is added', () => {
        const lichSuGiaoDichCollection: ILichSuGiaoDich[] = [sampleWithRequiredData];
        expectedResult = service.addLichSuGiaoDichToCollectionIfMissing(lichSuGiaoDichCollection, undefined, null);
        expect(expectedResult).toEqual(lichSuGiaoDichCollection);
      });
    });

    describe('compareLichSuGiaoDich', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLichSuGiaoDich(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLichSuGiaoDich(entity1, entity2);
        const compareResult2 = service.compareLichSuGiaoDich(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLichSuGiaoDich(entity1, entity2);
        const compareResult2 = service.compareLichSuGiaoDich(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLichSuGiaoDich(entity1, entity2);
        const compareResult2 = service.compareLichSuGiaoDich(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
