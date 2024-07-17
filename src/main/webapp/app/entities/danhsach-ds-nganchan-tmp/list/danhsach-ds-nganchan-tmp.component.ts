import { Component, NgZone, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, Subscription, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { sortStateSignal, SortDirective, SortByDirective, type SortState, SortService } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';
import { EntityArrayResponseType, DanhsachDsNganchanTmpService } from '../service/danhsach-ds-nganchan-tmp.service';
import { DanhsachDsNganchanTmpDeleteDialogComponent } from '../delete/danhsach-ds-nganchan-tmp-delete-dialog.component';

@Component({
  standalone: true,
  selector: 'jhi-danhsach-ds-nganchan-tmp',
  templateUrl: './danhsach-ds-nganchan-tmp.component.html',
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
  ],
})
export class DanhsachDsNganchanTmpComponent implements OnInit {
  subscription: Subscription | null = null;
  danhsachDsNganchanTmps?: IDanhsachDsNganchanTmp[];
  isLoading = false;

  sortState = sortStateSignal({});

  public router = inject(Router);
  protected danhsachDsNganchanTmpService = inject(DanhsachDsNganchanTmpService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (_index: number, item: IDanhsachDsNganchanTmp): number =>
    this.danhsachDsNganchanTmpService.getDanhsachDsNganchanTmpIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => this.load()),
      )
      .subscribe();
  }

  delete(danhsachDsNganchanTmp: IDanhsachDsNganchanTmp): void {
    const modalRef = this.modalService.open(DanhsachDsNganchanTmpDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.danhsachDsNganchanTmp = danhsachDsNganchanTmp;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(event);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.danhsachDsNganchanTmps = this.refineData(dataFromBody);
  }

  protected refineData(data: IDanhsachDsNganchanTmp[]): IDanhsachDsNganchanTmp[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: IDanhsachDsNganchanTmp[] | null): IDanhsachDsNganchanTmp[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.danhsachDsNganchanTmpService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(sortState: SortState): void {
    const queryParamsObj = {
      sort: this.sortService.buildSortParam(sortState),
    };

    this.ngZone.run(() => {
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParamsObj,
      });
    });
  }
}
