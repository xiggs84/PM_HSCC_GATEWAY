import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { INoiCapGttt } from '../noi-cap-gttt.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../noi-cap-gttt.test-samples';

import { NoiCapGtttService } from './noi-cap-gttt.service';

const requireRestSample: INoiCapGttt = {
  ...sampleWithRequiredData,
};

describe('NoiCapGttt Service', () => {
  let service: NoiCapGtttService;
  let httpMock: HttpTestingController;
  let expectedResult: INoiCapGttt | INoiCapGttt[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(NoiCapGtttService);
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

    it('should create a NoiCapGttt', () => {
      const noiCapGttt = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(noiCapGttt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NoiCapGttt', () => {
      const noiCapGttt = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(noiCapGttt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NoiCapGttt', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NoiCapGttt', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a NoiCapGttt', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNoiCapGtttToCollectionIfMissing', () => {
      it('should add a NoiCapGttt to an empty array', () => {
        const noiCapGttt: INoiCapGttt = sampleWithRequiredData;
        expectedResult = service.addNoiCapGtttToCollectionIfMissing([], noiCapGttt);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(noiCapGttt);
      });

      it('should not add a NoiCapGttt to an array that contains it', () => {
        const noiCapGttt: INoiCapGttt = sampleWithRequiredData;
        const noiCapGtttCollection: INoiCapGttt[] = [
          {
            ...noiCapGttt,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNoiCapGtttToCollectionIfMissing(noiCapGtttCollection, noiCapGttt);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NoiCapGttt to an array that doesn't contain it", () => {
        const noiCapGttt: INoiCapGttt = sampleWithRequiredData;
        const noiCapGtttCollection: INoiCapGttt[] = [sampleWithPartialData];
        expectedResult = service.addNoiCapGtttToCollectionIfMissing(noiCapGtttCollection, noiCapGttt);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(noiCapGttt);
      });

      it('should add only unique NoiCapGttt to an array', () => {
        const noiCapGtttArray: INoiCapGttt[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const noiCapGtttCollection: INoiCapGttt[] = [sampleWithRequiredData];
        expectedResult = service.addNoiCapGtttToCollectionIfMissing(noiCapGtttCollection, ...noiCapGtttArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const noiCapGttt: INoiCapGttt = sampleWithRequiredData;
        const noiCapGttt2: INoiCapGttt = sampleWithPartialData;
        expectedResult = service.addNoiCapGtttToCollectionIfMissing([], noiCapGttt, noiCapGttt2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(noiCapGttt);
        expect(expectedResult).toContain(noiCapGttt2);
      });

      it('should accept null and undefined values', () => {
        const noiCapGttt: INoiCapGttt = sampleWithRequiredData;
        expectedResult = service.addNoiCapGtttToCollectionIfMissing([], null, noiCapGttt, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(noiCapGttt);
      });

      it('should return initial array if no NoiCapGttt is added', () => {
        const noiCapGtttCollection: INoiCapGttt[] = [sampleWithRequiredData];
        expectedResult = service.addNoiCapGtttToCollectionIfMissing(noiCapGtttCollection, undefined, null);
        expect(expectedResult).toEqual(noiCapGtttCollection);
      });
    });

    describe('compareNoiCapGttt', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNoiCapGttt(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNoiCapGttt(entity1, entity2);
        const compareResult2 = service.compareNoiCapGttt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNoiCapGttt(entity1, entity2);
        const compareResult2 = service.compareNoiCapGttt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNoiCapGttt(entity1, entity2);
        const compareResult2 = service.compareNoiCapGttt(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
