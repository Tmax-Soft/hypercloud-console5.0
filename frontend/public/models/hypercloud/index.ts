import { K8sKind } from '../../module/k8s';

export const HyperClusterResourceModel: K8sKind = {
  label: 'Cluster',
  labelPlural: 'Clusters',
  apiVersion: 'v1',
  apiGroup: 'hyper.multi.tmax.io',
  plural: 'hyperclusterresources',
  abbr: 'C',
  kind: 'HyperClusterResource',
  id: 'hyperclusterresource',
  namespaced: false,
};

export const FederatedConfigMapModel: K8sKind = {
  label: 'Federated Config Map',
  labelPlural: 'Federated Config Maps',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedconfigmaps',
  abbr: 'FCM',
  kind: 'FederatedConfigMap',
  id: 'federatedconfigmap',
  namespaced: true,
};

export const FederatedDeploymentModel: K8sKind = {
  label: 'Federated Deployment',
  labelPlural: 'Federated Deployments',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federateddeployments',
  abbr: 'FDEPLOY',
  kind: 'FederatedDeployment',
  id: 'federateddeployment',
  namespaced: true,
};

export const FederatedIngressModel: K8sKind = {
  label: 'Federated Ingress',
  labelPlural: 'Federated Ingresses',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedingresses',
  abbr: 'FING',
  kind: 'FederatedIngress',
  id: 'federatedingress',
  namespaced: true,
};

export const FederatedJobModel: K8sKind = {
  label: 'Federated Job',
  labelPlural: 'Federated Jobs',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedjobs',
  abbr: 'FJ',
  kind: 'FederatedJob',
  id: 'federatedjob',
  namespaced: true,
};

export const FederatedNamespaceModel: K8sKind = {
  label: 'Federated Namespace',
  labelPlural: 'Federated Namespaces',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatednamespaces',
  abbr: 'FNS',
  kind: 'FederatedNamespace',
  id: 'federatednamespace',
  namespaced: true,
};

export const FederatedReplicaSetModel: K8sKind = {
  label: 'Federated Replica Set',
  labelPlural: 'Federated Replica Sets',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedreplicasets',
  abbr: 'FRS',
  kind: 'FederatedReplicaSet',
  id: 'federatedreplicaset',
  namespaced: true,
};

export const FederatedSecretModel: K8sKind = {
  label: 'Federated Secret',
  labelPlural: 'Federated Secrets',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedsecrets',
  abbr: 'FS',
  kind: 'FederatedSecret',
  id: 'federatedsecret',
  namespaced: true,
};

export const FederatedServiceModel: K8sKind = {
  label: 'Federated Service',
  labelPlural: 'Federated Services',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedservices',
  abbr: 'FSVC',
  kind: 'FederatedService',
  id: 'federatedservice',
  namespaced: true,
};

export const FederatedPodModel: K8sKind = {
  label: 'Federated Pod',
  labelPlural: 'Federated Pods',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedpods',
  abbr: 'FPO',
  kind: 'FederatedPod',
  id: 'federatedpod',
  namespaced: true,
};

export const FederatedHPAModel: K8sKind = {
  label: 'Federated Horizontal Pod Autoscaler',
  labelPlural: 'Federated Horizontal Pod Autoscalers',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedhorizontalpodautoscalers',
  abbr: 'FHPA',
  kind: 'FederatedHorizontalPodAutoscaler',
  id: 'federatedhorizontalpodautoscaler',
  namespaced: true,
};

export const FederatedDaemonSetModel: K8sKind = {
  label: 'Federated Daemon Set',
  labelPlural: 'Federated Daemon Sets',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federateddaemonsets',
  abbr: 'FDS',
  kind: 'FederatedDaemonSet',
  id: 'federateddaemonset',
  namespaced: true,
};

export const FederatedStatefulSetModel: K8sKind = {
  label: 'Federated Stateful Set',
  labelPlural: 'Federated Stateful Sets',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedstatefulsets',
  abbr: 'FSTS',
  kind: 'FederatedStatefulSet',
  id: 'federatedstatefulset',
  namespaced: true,
};

export const FederatedCronJobModel: K8sKind = {
  label: 'Federated Cron Job',
  labelPlural: 'Federated Cron Jobs',
  apiVersion: 'v1beta1',
  apiGroup: 'types.kubefed.io',
  plural: 'federatedcronjobs',
  abbr: 'FCJ',
  kind: 'FederatedCronJob',
  id: 'federatedcronjob',
  namespaced: true,
};

export const RegistryModel: K8sKind = {
  kind: 'Registry',
  namespaced: true,
  label: 'Registry',
  plural: 'registries',
  apiVersion: 'v1',
  abbr: 'RG',
  apiGroup: 'tmax.io',
  labelPlural: 'Registries',
  id: 'registry',
  crd: false,
};

export const ImageModel: K8sKind = {
  label: 'Image',
  apiVersion: 'v1',
  apiGroup: 'tmax.io',
  plural: 'images',
  abbr: 'I',
  namespaced: true,
  kind: 'Image',
  id: 'image',
  labelPlural: 'Images',
  crd: false,
};

export const TaskModel: K8sKind = {
  kind: 'Task',
  namespaced: true,
  label: 'Task',
  plural: 'tasks',
  apiVersion: 'v1beta1',
  abbr: 'TK',
  apiGroup: 'tekton.dev',
  labelPlural: 'Tasks',
  id: 'task',
  crd: false,
};

export const TaskRunModel: K8sKind = {
  kind: 'TaskRun',
  namespaced: true,
  label: 'Task Run',
  plural: 'taskruns',
  apiVersion: 'v1beta1',
  abbr: 'TR',
  apiGroup: 'tekton.dev',
  labelPlural: 'Task Runs',
  id: 'taskrun',
  crd: false,
};

export const PipelineModel: K8sKind = {
  kind: 'Pipeline',
  namespaced: true,
  label: 'Pipeline',
  plural: 'pipelines',
  apiVersion: 'v1beta1',
  abbr: 'P',
  apiGroup: 'tekton.dev',
  labelPlural: 'Pipelines',
  id: 'pipeline',
  crd: false,
};

export const PipelineRunModel: K8sKind = {
  kind: 'PipelineRun',
  namespaced: true,
  label: 'Pipeline Run',
  plural: 'pipelineruns',
  apiVersion: 'v1beta1',
  abbr: 'PR',
  apiGroup: 'tekton.dev',
  labelPlural: 'Pipeline Runs',
  id: 'pipelinerun',
  crd: false,
};

export const ApprovalModel: K8sKind = {
  kind: 'Approval',
  namespaced: true,
  label: 'Approval',
  plural: 'approvals',
  apiVersion: 'v1',
  abbr: 'PA',
  apiGroup: 'cicd.tmax.io',
  labelPlural: 'Pipeline Approvals',
  id: 'approval',
  crd: false,
};

export const PipelineResourceModel: K8sKind = {
  kind: 'PipelineResource',
  namespaced: true,
  label: 'Pipeline Resource',
  plural: 'pipelineresources',
  apiVersion: 'v1alpha1',
  abbr: 'PRS',
  apiGroup: 'tekton.dev',
  labelPlural: 'Pipeline Resources',
  id: 'pipelineresource',
  crd: false,
};
