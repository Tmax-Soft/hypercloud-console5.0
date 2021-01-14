import * as React from 'react';
import { K8sResourceCondition /* , modelFor */} from '../../module/k8s';
import { ResourceLink } from '@console/internal/components/utils';
import { referenceFor } from '@console/internal/module/k8s';

export const Resources: React.SFC<ResourcesProps> = ({ conditions, registry }) => {
  const rows = conditions?.map?.((condition: K8sResourceCondition, i: number) => {
      
      if(condition.type.includes('Exist')) {
        const kind = condition.type.replace('Exist', '');
        let name;
        if(kind === 'SecretTlsExist') {
            name = `hpcd-tls-${registry}`;
        } else if (kind === 'Notary') {
            name = registry;
        } else {
            name = `hpcd-${registry}`;
        }

        return (
            <div className="row" data-test-id={condition.type} key={i}>
              <div className="col-xs-6 col-sm-4 col-md-4">
                  {kind}
              </div>
              <div className="col-xs-6 col-sm-4 col-md-4">
                {
                    !condition.type.includes('Keycloak') ?<ResourceLink kind={referenceFor({kind, apiVersion: 'tmax.io/v1'})} name={name}
                    /> : ''
                }
              </div>
              <div className="col-xs-6 col-sm-4 col-md-4" data-test-id="status">
                {condition.status}
              </div>
            </div>
        );          
      }
  });

  return (
    <>
      {conditions?.length ? (
        <div className="co-m-table-grid co-m-table-grid--bordered">
          <div className="row co-m-table-grid__head">
            <div className="col-xs-6 col-sm-4 col-md-4">Resource</div>
            <div className="col-xs-6 col-sm-4 col-md-4">Resource Name</div>
            <div className="col-xs-6 col-sm-4 col-md-4">Status</div>
          </div>
          <div className="co-m-table-grid__body">{rows}</div>
        </div>
      ) : (
        <div className="cos-status-box">
          <div className="text-center">No Conditions Found</div>
        </div>
      )}
    </>
  );
};

export type ResourcesProps = {
  conditions: K8sResourceCondition[];
  registry: string;
};