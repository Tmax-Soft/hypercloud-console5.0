import * as React from 'react';
import { ApprovalModel } from '../../models';
import { ApprovalKind,  K8sResourceKindReference } from '../../module/k8s';
import { DetailsPage, ListPage, Table, RowFunction } from '../factory';
import {  Kebab,  navFactory, ResourceSummary, SectionHeading, } from '../utils';
import { WorkloadTableRow, WorkloadTableHeader } from '../workload-table';

const approvalsReference: K8sResourceKindReference = 'Approval';
const { common } = Kebab.factory;

export const menuActions = [...Kebab.getExtensionsActionsForKind(ApprovalModel), ...common];

export const ApprovalDetailsList: React.FC<ApprovalDetailsListProps> = ({ approval }) => {
  return (
    <dl className="co-m-pane__details">
      {/* <DetailsItem label="Update Strategy" obj={approval} path="spec.strategy.type" />
      {deployment.spec.strategy.type === 'RollingUpdate' && (
        <>
          <DetailsItem label="Max Unavailable" obj={approval} path="spec.strategy.rollingUpdate.maxUnavailable">
            {deployment.spec.strategy.rollingUpdate.maxUnavailable || 1} of {pluralize(deployment.spec.replicas, 'pod')}
          </DetailsItem>
          <DetailsItem label="Max Surge" obj={approval} path="spec.strategy.rollingUpdate.maxSurge">
            {deployment.spec.strategy.rollingUpdate.maxSurge || 1} greater than {pluralize(deployment.spec.replicas, 'pod')}
          </DetailsItem>
        </>
      )}
      <DetailsItem label="Progress Deadline Seconds" obj={approval} path="spec.progressDeadlineSeconds">
        {deployment.spec.progressDeadlineSeconds ? pluralize(deployment.spec.progressDeadlineSeconds, 'second') : 'Not Configured'}
      </DetailsItem>
      <DetailsItem label="Min Ready Seconds" obj={approval} path="spec.minReadySeconds">
        {deployment.spec.minReadySeconds ? pluralize(deployment.spec.minReadySeconds, 'second') : 'Not Configured'}
      </DetailsItem> */}
    </dl>
  );
};
ApprovalDetailsList.displayName = 'ApprovalDetailsList';

const ApprovalDetails: React.FC<ApprovalDetailsProps> = ({ obj: approval }) => {
  return (
    <>
      <div className="co-m-pane__body">
        <SectionHeading text="Approval Details" />
        <div className="co-m-pane__body-group">
          <div className="row">
            <div className="col-sm-6">
              <ResourceSummary resource={approval} showPodSelector showNodeSelector showTolerations>
                {/* <dt>Status</dt>
                <dd>{deployment.status.availableReplicas === deployment.status.updatedReplicas && deployment.spec.replicas === deployment.status.availableReplicas ? <Status status="Up to date" /> : <Status status="Updating" />}</dd> */}
              </ResourceSummary>
            </div>
            <div className="col-sm-6">
              <ApprovalDetailsList approval={approval} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="co-m-pane__body">
        <SectionHeading text="Containers" />
        <ContainerTable containers={deployment.spec.template.spec.containers} />
      </div>
      <div className="co-m-pane__body">
        <VolumesTable resource={approval} heading="Volumes" />
      </div>
      <div className="co-m-pane__body">
        <SectionHeading text="Conditions" />
        <Conditions conditions={deployment.status.conditions} />
      </div> */}
    </>
  );
};
ApprovalDetails.displayName = 'ApprovalDetails';

const { details, editYaml,} = navFactory;
export const ApprovalsDetailsPage: React.FC<ApprovalsDetailsPageProps> = props => (
  <DetailsPage
    {...props}
    kind={approvalsReference}
    menuActions={menuActions}
    pages={[
      details(ApprovalDetails),
      editYaml(),
      //   {
      //     href: 'replicasets',
      //     name: 'Replica Sets',
      //     component: ReplicaSetsTab,
      //   },
      //   pods(),
      //   envEditor(environmentComponent),
      //   events(ResourceEventStream),
    ]}
  />
);
ApprovalsDetailsPage.displayName = 'ApprovalsDetailsPage';

type ApprovalDetailsListProps = {
  approval: ApprovalKind;
};

type ApprovalDetailsProps = {
  obj: ApprovalKind;
};

const kind = 'Approval';

const ApprovalTableRow: RowFunction<ApprovalKind> = ({ obj, index, key, style }) => {
  return <WorkloadTableRow obj={obj} index={index} rowKey={key} style={style} menuActions={menuActions} kind={kind} />;
};

const ApprovalTableHeader = () => {
  return WorkloadTableHeader();
};
ApprovalTableHeader.displayName = 'ApprovalTableHeader';

export const ApprovalsList: React.FC = props => <Table {...props} aria-label="Approvals" Header={ApprovalTableHeader} Row={ApprovalTableRow} virtualize />;
ApprovalsList.displayName = 'ApprovalsList';

export const ApprovalsPage: React.FC<ApprovalsPageProps> = props => (
  <ListPage
    kind={approvalsReference}
    canCreate={true}
    ListComponent={ApprovalsList}
    // createProps={{
    //   to: `/k8s/ns/${props.namespace || 'default'}/persistentvolumeclaims/~new/form`,
    // }}
    {...props}
  />
);
ApprovalsPage.displayName = 'ApprovalsPage';

type ApprovalsPageProps = {
  showTitle?: boolean;
  namespace?: string;
  selector?: any;
};

type ApprovalsDetailsPageProps = {
  match: any;
};
