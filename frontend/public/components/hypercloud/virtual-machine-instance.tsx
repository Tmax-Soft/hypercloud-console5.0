import * as _ from 'lodash-es';
import * as React from 'react';
import * as classNames from 'classnames';
import { sortable } from '@patternfly/react-table';
import { Translation } from 'react-i18next';

import { K8sResourceKind } from '../../module/k8s';
import { DetailsPage, ListPage, Table, TableRow, TableData, RowFunction } from '../factory';
import { Kebab, KebabAction, detailsPage, Timestamp, navFactory, ResourceKebab, ResourceLink, ResourceSummary, SectionHeading } from '../utils';
import { Status } from '@console/shared';
import { VirtualMachineInstanceModel } from '../../models';

export const menuActions: KebabAction[] = [...Kebab.getExtensionsActionsForKind(VirtualMachineInstanceModel), ...Kebab.factory.common];

const kind = VirtualMachineInstanceModel.kind;

const tableColumnClasses = ['', '', classNames('pf-m-hidden', 'pf-m-visible-on-sm', 'pf-u-w-16-on-lg'), Kebab.columnClass];

const VirtualMachineInstanceTableRow: RowFunction<K8sResourceKind> = ({ obj: virtualmachineinstance, index, key, style }) => {
  return (
    <TableRow id={virtualmachineinstance.metadata.uid} index={index} trKey={key} style={style}>
      <TableData className={tableColumnClasses[0]}>
        <ResourceLink kind={kind} name={virtualmachineinstance.metadata.name} namespace={virtualmachineinstance.metadata.namespace} title={virtualmachineinstance.metadata.uid} />
      </TableData>
      <TableData className={tableColumnClasses[1]}>
        <Status status={virtualmachineinstance.metadata.namespace} />
      </TableData>
      <TableData className={tableColumnClasses[2]}>
        <Timestamp timestamp={virtualmachineinstance.metadata.creationTimestamp} />
      </TableData>
      <TableData className={tableColumnClasses[3]}>
        <ResourceKebab actions={menuActions} kind={kind} resource={virtualmachineinstance} />
      </TableData>
    </TableRow>
  );
};

const VirtualMachineInstanceDetails: React.FC<VirtualMachineInstanceDetailsProps> = ({ obj: virtualmachineinstance }) => (
  <>
    <div className="co-m-pane__body">
      <SectionHeading text="Virtual Machine Instance Details" />
      <div className="row">
        <div className="col-lg-6">
          <ResourceSummary resource={virtualmachineinstance} />
        </div>
      </div>
    </div>
    <div className="co-m-pane__body">
    </div>
  </>
);

const { details, editYaml } = navFactory;
export const VirtualMachineInstances: React.FC = props =>
  <Translation>{
    (t) => <Table {...props} aria-label="Virtual Machine Instances" Header={() => [
      {
        title: t('COMMON:MSG_MAIN_TABLEHEADER_1'),
        sortField: 'metadata.name',
        transforms: [sortable],
        props: { className: tableColumnClasses[0] },
      },
      {
        title: t('COMMON:MSG_MAIN_TABLEHEADER_2'),
        sortFunc: 'metadata.namespace',
        transforms: [sortable],
        props: { className: tableColumnClasses[1] },
      },
      {
        title: t('COMMON:MSG_MAIN_TABLEHEADER_12'),
        sortField: 'metadata.creationTimestamp',
        transforms: [sortable],
        props: { className: tableColumnClasses[2] },
      },
      {
        title: '',
        props: { className: tableColumnClasses[3] },
      },
    ]} Row={VirtualMachineInstanceTableRow} virtualize />
  }</Translation>;

export const VirtualMachineInstancesPage: React.FC<VirtualMachineInstancesPageProps> = props => <ListPage canCreate={false} ListComponent={VirtualMachineInstances} kind={kind} {...props} />;

export const VirtualMachineInstancesDetailsPage: React.FC<VirtualMachineInstancesDetailsPageProps> = props => <DetailsPage {...props} kind={kind} menuActions={menuActions} pages={[details(detailsPage(VirtualMachineInstanceDetails)), editYaml()]} />;

type VirtualMachineInstanceDetailsProps = {
  obj: K8sResourceKind;
};

type VirtualMachineInstancesPageProps = {
  showTitle?: boolean;
  namespace?: string;
  selector?: any;
};

type VirtualMachineInstancesDetailsPageProps = {
  match: any;
};