import * as _ from 'lodash-es';
import * as React from 'react';

import { WithCommonForm } from '../create-form'
import { SelectorInput } from '../../../utils';

// const allow = 'allow';
// const deny = 'deny';

// const defaultDeny = {
//   apiVersion: 'networking.k8s.io/v1',
//   kind: 'NetworkPolicy',
//   spec: {
//     podSelector: null,
//   },
// };



const namespaceFormFactory = (params) => {
  return WithCommonForm(CreateNamespaceComponent, params);
};

const CreateNamespaceComponent: React.FC<NamespaceFormProps> = (props) => {
  const { Controller, control } = props

  return (
    <div className="form-group">
      <label htmlFor="tags-input" className="control-label">
        Labels
        </label>
      <div className="modal-body__field">
        <Controller
          name="metadata.labels"
          labelClassName="co-text-namespace"
          as={SelectorInput}
          control={control}
          tags={[]}
        />
      </div>
    </div>
    /* <div className="form-group">
      <label htmlFor="network-policy" className="control-label">
        Default Network Policy
              </label>
      <div className="modal-body__field ">
        <Dropdown
          selectedKey={this.state.np}
          items={defaultNetworkPolicies}
          dropDownClassName="dropdown--full-width"
          id="dropdown-selectbox"
          onChange={(np) => this.setState({ np })}
        />
      </div>
    </div> */
  )
}


export const CreateNamespace: React.FC<CreateNamespaceProps> = (props) => {
  const formComponent = namespaceFormFactory(props.match.params);
  // const { ns, type } = props.match.params;
  const NamespaceFormComponent = formComponent;
  return (
    <NamespaceFormComponent
      fixed={{}}
      explanation={''}
      titleVerb="Create"
      onSubmitCallback={onSubmitCallback}
      isCreate={true}
    />
  )
}

export const onSubmitCallback = (data) => {
  let labels = SelectorInput.objectify(data.metadata.labels);
  delete data.metadata.labels;
  data = _.defaultsDeep(data, { metadata: { labels: labels } });
  return data;
}

type CreateNamespaceProps = {
  match: any;
  fixed: object;
  explanation: string;
  titleVerb: string;
  saveButtonText?: string;
  onCancel?: () => void;
  onSave?: () => void;
  isCreate: boolean;
}

type NamespaceFormProps = {
  Controller: any;
  control: any;
  onChange: Function;
  stringData: {
    [key: string]: string
  }
  isCreate: boolean;
}