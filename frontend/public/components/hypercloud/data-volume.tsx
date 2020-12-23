import * as _ from 'lodash-es';
import * as React from 'react';
import * as classNames from 'classnames';
import { sortable } from '@patternfly/react-table';

import { K8sResourceKind } from '../../module/k8s';
import { DetailsPage, ListPage, Table, TableRow, TableData, RowFunction } from '../factory';
import { Kebab, KebabAction, detailsPage, Timestamp, navFactory, ResourceKebab, ResourceLink, ResourceSummary, SectionHeading } from '../utils';
import { Status } from '@console/shared';
import { DataVolumeModel } from '../../models';

export const menuActions: KebabAction[] = [...Kebab.getExtensionsActionsForKind(DataVolumeModel), ...Kebab.factory.common];

const kind = DataVolumeModel.kind;

const tableColumnClasses = ['', '', classNames('pf-m-hidden', 'pf-m-visible-on-sm', 'pf-u-w-16-on-lg'), Kebab.columnClass];

const DataVolumeTableHeader = () => {
  return [
    {
      title: 'Name',
      sortField: 'metadata.name',
      transforms: [sortable],
      props: { className: tableColumnClasses[0] },
    },
    {
      title: 'Namespace',
      sortFunc: 'metadata.namespace',
      transforms: [sortable],
      props: { className: tableColumnClasses[1] },
    },
    {
      title: 'Created',
      sortField: 'metadata.creationTimestamp',
      transforms: [sortable],
      props: { className: tableColumnClasses[2] },
    },
    {
      title: '',
      props: { className: tableColumnClasses[3] },
    },
  ];
};
DataVolumeTableHeader.displayName = 'DataVolumeTableHeader';

const DataVolumeTableRow: RowFunction<K8sResourceKind> = ({ obj: datavolume, index, key, style }) => {
  return (
    <TableRow id={datavolume.metadata.uid} index={index} trKey={key} style={style}>
      <TableData className={tableColumnClasses[0]}>
        <ResourceLink kind={kind} name={datavolume.metadata.name} namespace={datavolume.metadata.namespace} title={datavolume.metadata.uid} />
      </TableData>
      <TableData className={tableColumnClasses[1]}>
        <Status status={datavolume.metadata.namespace} />
      </TableData>
      <TableData className={tableColumnClasses[2]}>
        <Timestamp timestamp={datavolume.metadata.creationTimestamp} />
      </TableData>
      <TableData className={tableColumnClasses[3]}>
        <ResourceKebab actions={menuActions} kind={kind} resource={datavolume} />
      </TableData>
    </TableRow>
  );
};

const DataVolumeDetails: React.FC<DataVolumeDetailsProps> = ({ obj: datavolume }) => (
  <>
    <div className="co-m-pane__body">
      <SectionHeading text="Data Volume Details" />
      <div className="row">
        <div className="col-lg-6">
          <ResourceSummary resource={datavolume} />
        </div>
      </div>
    </div>
    <div className="co-m-pane__body">
    </div>
  </>
);

const { details, editYaml } = navFactory;
export const DataVolumes: React.FC = props => <Table {...props} aria-label="Data Volumes" Header={DataVolumeTableHeader} Row={DataVolumeTableRow} virtualize />;

export const DataVolumesPage: React.FC<DataVolumesPageProps> = props => <ListPage canCreate={true} ListComponent={DataVolumes} kind={kind} {...props} />;

export const DataVolumesDetailsPage: React.FC<DataVolumesDetailsPageProps> = props => <DetailsPage {...props} kind={kind} menuActions={menuActions} pages={[details(detailsPage(DataVolumeDetails)), editYaml()]} />;

type DataVolumeDetailsProps = {
  obj: K8sResourceKind;
};

type DataVolumesPageProps = {
  showTitle?: boolean;
  namespace?: string;
  selector?: any;
};

type DataVolumesDetailsPageProps = {
  match: any;
};