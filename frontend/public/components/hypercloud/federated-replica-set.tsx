import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';
import { sortable } from '@patternfly/react-table';

import { AddHealthChecks, EditHealthChecks } from '@console/app/src/actions/modify-health-checks';
import { K8sResourceKind } from '../../module/k8s';
import { DetailsPage, ListPage, Table, TableRow, TableData, RowFunction } from '../factory';
import { DetailsItem, Kebab, KebabAction, detailsPage, LabelList, navFactory, ResourceKebab, ResourceLink, ResourceSummary, SectionHeading, Selector } from '../utils';
import { ResourceEventStream } from '../events';
import { FederatedReplicaSetModel } from '../../models';

export const menuActions: KebabAction[] = [AddHealthChecks, Kebab.factory.AddStorage, ...Kebab.getExtensionsActionsForKind(FederatedReplicaSetModel), EditHealthChecks, ...Kebab.factory.common];

const kind = FederatedReplicaSetModel.kind;

const tableColumnClasses = ['', '', classNames('pf-m-hidden', 'pf-m-visible-on-sm', 'pf-u-w-16-on-lg'), classNames('pf-m-hidden', 'pf-m-visible-on-lg'), classNames('pf-m-hidden', 'pf-m-visible-on-lg'), Kebab.columnClass];

const FederatedReplicaSetTableHeader = () => {
  return [
    {
      title: 'Name',
      sortField: 'metadata.name',
      transforms: [sortable],
      props: { className: tableColumnClasses[0] },
    },
    {
      title: 'Namespace',
      sortField: 'metadata.namespace',
      transforms: [sortable],
      props: { className: tableColumnClasses[1] },
    },
    {
      title: 'Status',
      sortFunc: 'replicasetNumScheduled',
      transforms: [sortable],
      props: { className: tableColumnClasses[2] },
    },
    {
      title: 'Labels',
      sortField: 'metadata.labels',
      transforms: [sortable],
      props: { className: tableColumnClasses[3] },
    },
    {
      title: 'Pod Selector',
      sortField: 'spec.selector',
      transforms: [sortable],
      props: { className: tableColumnClasses[4] },
    },
    {
      title: '',
      props: { className: tableColumnClasses[5] },
    },
  ];
};
FederatedReplicaSetTableHeader.displayName = 'FederatedReplicaSetTableHeader';

const FederatedReplicaSetTableRow: RowFunction<K8sResourceKind> = ({ obj: replicaset, index, key, style }) => {
  return (
    <TableRow id={replicaset.metadata.uid} index={index} trKey={key} style={style}>
      <TableData className={tableColumnClasses[0]}>
        <ResourceLink kind={kind} name={replicaset.metadata.name} namespace={replicaset.metadata.namespace} title={replicaset.metadata.uid} />
      </TableData>
      <TableData className={classNames(tableColumnClasses[1], 'co-break-word')}>
        <ResourceLink kind="Namespace" name={replicaset.metadata.namespace} title={replicaset.metadata.namespace} />
      </TableData>
      <TableData className={tableColumnClasses[2]}>
        <Link to={`/k8s/ns/${replicaset.metadata.namespace}/replicasets/${replicaset.metadata.name}/pods`} title="pods">
          {replicaset.status.currentNumberScheduled} of {replicaset.status.desiredNumberScheduled} pods
        </Link>
      </TableData>
      <TableData className={tableColumnClasses[3]}>
        <LabelList kind={kind} labels={replicaset.metadata.labels} />
      </TableData>
      <TableData className={tableColumnClasses[4]}>
        <Selector selector={replicaset.spec.selector} namespace={replicaset.metadata.namespace} />
      </TableData>
      <TableData className={tableColumnClasses[5]}>
        <ResourceKebab actions={menuActions} kind={kind} resource={replicaset} />
      </TableData>
    </TableRow>
  );
};

export const FederatedReplicaSetDetailsList: React.FC<FederatedReplicaSetDetailsListProps> = ({ ds }) => (
  <dl className="co-m-pane__details">
    <DetailsItem label="Current Count" obj={ds} path="status.currentNumberScheduled" />
    <DetailsItem label="Desired Count" obj={ds} path="status.desiredNumberScheduled" />
  </dl>
);

const FederatedReplicaSetDetails: React.FC<FederatedReplicaSetDetailsProps> = ({ obj: replicaset }) => (
  <>
    <div className="co-m-pane__body">
      <SectionHeading text="Daemon Set Details" />
      <div className="row">
        <div className="col-lg-6">
          <ResourceSummary resource={replicaset} showPodSelector showNodeSelector showTolerations />
        </div>
        <div className="col-lg-6">
          <FederatedReplicaSetDetailsList ds={replicaset} />
        </div>
      </div>
    </div>
    <div className="co-m-pane__body">
      <SectionHeading text="Containers" />
    </div>
  </>
);

const { details, editYaml, events } = navFactory;
export const FederatedReplicaSets: React.FC = props => <Table {...props} aria-label="Daemon Sets" Header={FederatedReplicaSetTableHeader} Row={FederatedReplicaSetTableRow} virtualize />;

export const FederatedReplicaSetsPage: React.FC<FederatedReplicaSetsPageProps> = props => <ListPage canCreate={true} ListComponent={FederatedReplicaSets} kind={kind} {...props} />;

export const FederatedReplicaSetsDetailsPage: React.FC<FederatedReplicaSetsDetailsPageProps> = props => <DetailsPage {...props} kind={kind} menuActions={menuActions} pages={[details(detailsPage(FederatedReplicaSetDetails)), editYaml(), events(ResourceEventStream)]} />;

type FederatedReplicaSetDetailsListProps = {
  ds: K8sResourceKind;
};

type FederatedReplicaSetDetailsProps = {
  obj: K8sResourceKind;
};

type FederatedReplicaSetsPageProps = {
  showTitle?: boolean;
  namespace?: string;
  selector?: any;
};

type FederatedReplicaSetsDetailsPageProps = {
  match: any;
};
