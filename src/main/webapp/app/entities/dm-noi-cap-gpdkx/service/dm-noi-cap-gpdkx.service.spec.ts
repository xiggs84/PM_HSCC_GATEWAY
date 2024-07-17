import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../dm-noi-cap-gpdkx.test-samples';

import { DmNoiCapGpdkxService } from './dm-noi-cap-gpdkx.service';

const requireRestSample: IDmNoiCapGpdkx = {
  ...sampleWithRequiredData,
};

describe('DmNoiCapGpdkx Service', () => {
  let service: DmNoiCapGpdkxService;
  let httpMock: HttpTestingController;
  let expectedResult: IDmNoiCapGpdkx | IDmNoiCapGpdkx[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DmNoiCapGpdkxService);
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

    it('should create a DmNoiCapGpdkx', () => {
      const dmNoiCapGpdkx = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dmNoiCapGpdkx).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DmNoiCapGpdkx', () => {
      const dmNoiCapGpdkx = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dmNoiCapGpdkx).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DmNoiCapGpdkx', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DmNoiCapGpdkx', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DmNoiCapGpdkx', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDmNoiCapGpdkxToCollectionIfMissing', () => {
      it('should add a DmNoiCapGpdkx to an empty array', () => {
        const dmNoiCapGpdkx: IDmNoiCapGpdkx = sampleWithRequiredData;
        expectedResult = service.addDmNoiCapGpdkxToCollectionIfMissing([], dmNoiCapGpdkx);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmNoiCapGpdkx);
      });

      it('should not add a DmNoiCapGpdkx to an array that contains it', () => {
        const dmNoiCapGpdkx: IDmNoiCapGpdkx = sampleWithRequiredData;
        const dmNoiCapGpdkxCollection: IDmNoiCapGpdkx[] = [
          {
            ...dmNoiCapGpdkx,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDmNoiCapGpdkxToCollectionIfMissing(dmNoiCapGpdkxCollection, dmNoiCapGpdkx);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DmNoiCapGpdkx to an array that doesn't contain it", () => {
        const dmNoiCapGpdkx: IDmNoiCapGpdkx = sampleWithRequiredData;
        const dmNoiCapGpdkxCollection: IDmNoiCapGpdkx[] = [sampleWithPartialData];
        expectedResult = service.addDmNoiCapGpdkxToCollectionIfMissing(dmNoiCapGpdkxCollection, dmNoiCapGpdkx);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmNoiCapGpdkx);
      });

      it('should add only unique DmNoiCapGpdkx to an array', () => {
        const dmNoiCapGpdkxArray: IDmNoiCapGpdkx[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dmNoiCapGpdkxCollection: IDmNoiCapGpdkx[] = [sampleWithRequiredData];
        expectedResult = service.addDmNoiCapGpdkxToCollectionIfMissing(dmNoiCapGpdkxCollection, ...dmNoiCapGpdkxArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dmNoiCapGpdkx: IDmNoiCapGpdkx = sampleWithRequiredData;
        const dmNoiCapGpdkx2: IDmNoiCapGpdkx = sampleWithPartialData;
        expectedResult = service.addDmNoiCapGpdkxToCollectionIfMissing([], dmNoiCapGpdkx, dmNoiCapGpdkx2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmNoiCapGpdkx);
        expect(expectedResult).toContain(dmNoiCapGpdkx2);
      });

      it('should accept null and undefined values', () => {
        const dmNoiCapGpdkx: IDmNoiCapGpdkx = sampleWithRequiredData;
        expectedResult = service.addDmNoiCapGpdkxToCollectionIfMissing([], null, dmNoiCapGpdkx, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmNoiCapGpdkx);
      });

      it('should return initial array if no DmNoiCapGpdkx is added', () => {
        const dmNoiCapGpdkxCollection: IDmNoiCapGpdkx[] = [sampleWithRequiredData];
        expectedResult = service.addDmNoiCapGpdkxToCollectionIfMissing(dmNoiCapGpdkxCollection, undefined, null);
        expect(expectedResult).toEqual(dmNoiCapGpdkxCollection);
      });
    });

    describe('compareDmNoiCapGpdkx', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDmNoiCapGpdkx(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDmNoiCapGpdkx(entity1, entity2);
        const compareResult2 = service.compareDmNoiCapGpdkx(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDmNoiCapGpdkx(entity1, entity2);
        const compareResult2 = service.compareDmNoiCapGpdkx(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDmNoiCapGpdkx(entity1, entity2);
        const compareResult2 = service.compareDmNoiCapGpdkx(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
