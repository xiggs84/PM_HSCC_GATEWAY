import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IHdMasterCoCcv } from '../hd-master-co-ccv.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../hd-master-co-ccv.test-samples';

import { HdMasterCoCcvService } from './hd-master-co-ccv.service';

const requireRestSample: IHdMasterCoCcv = {
  ...sampleWithRequiredData,
};

describe('HdMasterCoCcv Service', () => {
  let service: HdMasterCoCcvService;
  let httpMock: HttpTestingController;
  let expectedResult: IHdMasterCoCcv | IHdMasterCoCcv[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(HdMasterCoCcvService);
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

    it('should create a HdMasterCoCcv', () => {
      const hdMasterCoCcv = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(hdMasterCoCcv).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HdMasterCoCcv', () => {
      const hdMasterCoCcv = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(hdMasterCoCcv).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HdMasterCoCcv', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HdMasterCoCcv', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HdMasterCoCcv', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHdMasterCoCcvToCollectionIfMissing', () => {
      it('should add a HdMasterCoCcv to an empty array', () => {
        const hdMasterCoCcv: IHdMasterCoCcv = sampleWithRequiredData;
        expectedResult = service.addHdMasterCoCcvToCollectionIfMissing([], hdMasterCoCcv);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdMasterCoCcv);
      });

      it('should not add a HdMasterCoCcv to an array that contains it', () => {
        const hdMasterCoCcv: IHdMasterCoCcv = sampleWithRequiredData;
        const hdMasterCoCcvCollection: IHdMasterCoCcv[] = [
          {
            ...hdMasterCoCcv,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHdMasterCoCcvToCollectionIfMissing(hdMasterCoCcvCollection, hdMasterCoCcv);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HdMasterCoCcv to an array that doesn't contain it", () => {
        const hdMasterCoCcv: IHdMasterCoCcv = sampleWithRequiredData;
        const hdMasterCoCcvCollection: IHdMasterCoCcv[] = [sampleWithPartialData];
        expectedResult = service.addHdMasterCoCcvToCollectionIfMissing(hdMasterCoCcvCollection, hdMasterCoCcv);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdMasterCoCcv);
      });

      it('should add only unique HdMasterCoCcv to an array', () => {
        const hdMasterCoCcvArray: IHdMasterCoCcv[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const hdMasterCoCcvCollection: IHdMasterCoCcv[] = [sampleWithRequiredData];
        expectedResult = service.addHdMasterCoCcvToCollectionIfMissing(hdMasterCoCcvCollection, ...hdMasterCoCcvArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const hdMasterCoCcv: IHdMasterCoCcv = sampleWithRequiredData;
        const hdMasterCoCcv2: IHdMasterCoCcv = sampleWithPartialData;
        expectedResult = service.addHdMasterCoCcvToCollectionIfMissing([], hdMasterCoCcv, hdMasterCoCcv2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdMasterCoCcv);
        expect(expectedResult).toContain(hdMasterCoCcv2);
      });

      it('should accept null and undefined values', () => {
        const hdMasterCoCcv: IHdMasterCoCcv = sampleWithRequiredData;
        expectedResult = service.addHdMasterCoCcvToCollectionIfMissing([], null, hdMasterCoCcv, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdMasterCoCcv);
      });

      it('should return initial array if no HdMasterCoCcv is added', () => {
        const hdMasterCoCcvCollection: IHdMasterCoCcv[] = [sampleWithRequiredData];
        expectedResult = service.addHdMasterCoCcvToCollectionIfMissing(hdMasterCoCcvCollection, undefined, null);
        expect(expectedResult).toEqual(hdMasterCoCcvCollection);
      });
    });

    describe('compareHdMasterCoCcv', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHdMasterCoCcv(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHdMasterCoCcv(entity1, entity2);
        const compareResult2 = service.compareHdMasterCoCcv(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHdMasterCoCcv(entity1, entity2);
        const compareResult2 = service.compareHdMasterCoCcv(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHdMasterCoCcv(entity1, entity2);
        const compareResult2 = service.compareHdMasterCoCcv(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
