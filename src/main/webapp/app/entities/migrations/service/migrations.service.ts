import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMigrations, NewMigrations } from '../migrations.model';

export type PartialUpdateMigrations = Partial<IMigrations> & Pick<IMigrations, 'id'>;

export type EntityResponseType = HttpResponse<IMigrations>;
export type EntityArrayResponseType = HttpResponse<IMigrations[]>;

@Injectable({ providedIn: 'root' })
export class MigrationsService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/migrations');

  create(migrations: NewMigrations): Observable<EntityResponseType> {
    return this.http.post<IMigrations>(this.resourceUrl, migrations, { observe: 'response' });
  }

  update(migrations: IMigrations): Observable<EntityResponseType> {
    return this.http.put<IMigrations>(`${this.resourceUrl}/${this.getMigrationsIdentifier(migrations)}`, migrations, {
      observe: 'response',
    });
  }

  partialUpdate(migrations: PartialUpdateMigrations): Observable<EntityResponseType> {
    return this.http.patch<IMigrations>(`${this.resourceUrl}/${this.getMigrationsIdentifier(migrations)}`, migrations, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMigrations>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMigrations[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMigrationsIdentifier(migrations: Pick<IMigrations, 'id'>): number {
    return migrations.id;
  }

  compareMigrations(o1: Pick<IMigrations, 'id'> | null, o2: Pick<IMigrations, 'id'> | null): boolean {
    return o1 && o2 ? this.getMigrationsIdentifier(o1) === this.getMigrationsIdentifier(o2) : o1 === o2;
  }

  addMigrationsToCollectionIfMissing<Type extends Pick<IMigrations, 'id'>>(
    migrationsCollection: Type[],
    ...migrationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const migrations: Type[] = migrationsToCheck.filter(isPresent);
    if (migrations.length > 0) {
      const migrationsCollectionIdentifiers = migrationsCollection.map(migrationsItem => this.getMigrationsIdentifier(migrationsItem));
      const migrationsToAdd = migrations.filter(migrationsItem => {
        const migrationsIdentifier = this.getMigrationsIdentifier(migrationsItem);
        if (migrationsCollectionIdentifiers.includes(migrationsIdentifier)) {
          return false;
        }
        migrationsCollectionIdentifiers.push(migrationsIdentifier);
        return true;
      });
      return [...migrationsToAdd, ...migrationsCollection];
    }
    return migrationsCollection;
  }
}
