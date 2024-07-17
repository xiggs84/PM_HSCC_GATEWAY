import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISoLanHoiFaq } from '../so-lan-hoi-faq.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../so-lan-hoi-faq.test-samples';

import { SoLanHoiFaqService, RestSoLanHoiFaq } from './so-lan-hoi-faq.service';

const requireRestSample: RestSoLanHoiFaq = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('SoLanHoiFaq Service', () => {
  let service: SoLanHoiFaqService;
  let httpMock: HttpTestingController;
  let expectedResult: ISoLanHoiFaq | ISoLanHoiFaq[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SoLanHoiFaqService);
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

    it('should create a SoLanHoiFaq', () => {
      const soLanHoiFaq = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(soLanHoiFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SoLanHoiFaq', () => {
      const soLanHoiFaq = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(soLanHoiFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SoLanHoiFaq', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SoLanHoiFaq', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SoLanHoiFaq', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSoLanHoiFaqToCollectionIfMissing', () => {
      it('should add a SoLanHoiFaq to an empty array', () => {
        const soLanHoiFaq: ISoLanHoiFaq = sampleWithRequiredData;
        expectedResult = service.addSoLanHoiFaqToCollectionIfMissing([], soLanHoiFaq);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soLanHoiFaq);
      });

      it('should not add a SoLanHoiFaq to an array that contains it', () => {
        const soLanHoiFaq: ISoLanHoiFaq = sampleWithRequiredData;
        const soLanHoiFaqCollection: ISoLanHoiFaq[] = [
          {
            ...soLanHoiFaq,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSoLanHoiFaqToCollectionIfMissing(soLanHoiFaqCollection, soLanHoiFaq);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SoLanHoiFaq to an array that doesn't contain it", () => {
        const soLanHoiFaq: ISoLanHoiFaq = sampleWithRequiredData;
        const soLanHoiFaqCollection: ISoLanHoiFaq[] = [sampleWithPartialData];
        expectedResult = service.addSoLanHoiFaqToCollectionIfMissing(soLanHoiFaqCollection, soLanHoiFaq);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soLanHoiFaq);
      });

      it('should add only unique SoLanHoiFaq to an array', () => {
        const soLanHoiFaqArray: ISoLanHoiFaq[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const soLanHoiFaqCollection: ISoLanHoiFaq[] = [sampleWithRequiredData];
        expectedResult = service.addSoLanHoiFaqToCollectionIfMissing(soLanHoiFaqCollection, ...soLanHoiFaqArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const soLanHoiFaq: ISoLanHoiFaq = sampleWithRequiredData;
        const soLanHoiFaq2: ISoLanHoiFaq = sampleWithPartialData;
        expectedResult = service.addSoLanHoiFaqToCollectionIfMissing([], soLanHoiFaq, soLanHoiFaq2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soLanHoiFaq);
        expect(expectedResult).toContain(soLanHoiFaq2);
      });

      it('should accept null and undefined values', () => {
        const soLanHoiFaq: ISoLanHoiFaq = sampleWithRequiredData;
        expectedResult = service.addSoLanHoiFaqToCollectionIfMissing([], null, soLanHoiFaq, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soLanHoiFaq);
      });

      it('should return initial array if no SoLanHoiFaq is added', () => {
        const soLanHoiFaqCollection: ISoLanHoiFaq[] = [sampleWithRequiredData];
        expectedResult = service.addSoLanHoiFaqToCollectionIfMissing(soLanHoiFaqCollection, undefined, null);
        expect(expectedResult).toEqual(soLanHoiFaqCollection);
      });
    });

    describe('compareSoLanHoiFaq', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSoLanHoiFaq(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSoLanHoiFaq(entity1, entity2);
        const compareResult2 = service.compareSoLanHoiFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSoLanHoiFaq(entity1, entity2);
        const compareResult2 = service.compareSoLanHoiFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSoLanHoiFaq(entity1, entity2);
        const compareResult2 = service.compareSoLanHoiFaq(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
