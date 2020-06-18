import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { resourceSidebars } from './resource-sidebars';

export class ResourceSidebarWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
    };
  }
  render() {
    const { style, label, t } = this.props;
    const { height } = style;
    const { showSidebar } = this.state;
    const sampleText = t('CONTENT:SAMPLES');
    // if (!showSidebar) {
    //   return (
    //     <div className="co-p-has-sidebar__sidebar--hidden hidden-sm">
    //       <button className="btn btn-link" onClick={() => this.setState({ showSidebar: !showSidebar })}>
    //         <span className="fa fa-fw fa-info-circle co-p-has-sidebar__sidebar-link-icon"></span>
    //         {t('CONTENT:VIEWSAMPLES')}
    //       </button>
    //     </div>
    //   );
    // }

    return (
      <React.Fragment>
        <div className="co-p-has-sidebar__sidebar--hidden hidden-sm">
          <button disabled={showSidebar ? true : false} className="btn btn-link" onClick={() => this.setState({ showSidebar: !showSidebar })}>
            <span className="fa fa-fw fa-info-circle co-p-has-sidebar__sidebar-link-icon"></span>
            {t('CONTENT:VIEWSAMPLES')}
          </button>
        </div>
        {showSidebar && (
          <div className="co-p-has-sidebar__sidebar co-p-has-sidebar__sidebar--bordered hidden-sm" style={{ height }}>
            <div className="co-m-pane__body">
              <button type="button" className="close" aria-hidden="true" aria-label="Close" onClick={() => this.setState({ showSidebar: !showSidebar })}>
                <span className="pficon pficon-close"></span>
              </button>
              <h1 className="co-p-has-sidebar__sidebar-heading co-resource-sidebar-header text-capitalize">
                {label} {sampleText}
              </h1>
              {this.props.children}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export const SampleYaml = ({ sample, loadSampleYaml, downloadSampleYaml }) => {
  const { t } = useTranslation();
  const { highlightText, header, subheader, img, details, templateName, kind } = sample;
  return (
    <li className="co-resource-sidebar-item">
      <h5 className="co-resource-sidebar-item__header">
        <span className="text-uppercase">{highlightText}</span> {header} <span className="co-role-sidebar-subheader">{subheader}</span>
      </h5>
      {img && <img src={img} className="co-resource-sidebar-item__img" />}
<<<<<<< HEAD
      <p className="co-resource-sidebar-item__details">{details}</p>
=======
      <p className="co-resource-sidebar-item__details" style={{ whiteSpace: 'pre-line' }}>
        {details}
      </p>
>>>>>>> hc-dev
      <button className="btn btn-link" onClick={() => loadSampleYaml(templateName, kind)}>
        <span className="fa fa-fw fa-paste" aria-hidden="true"></span> {t('CONTENT:TRYIT')}
      </button>
      <button className="btn btn-link pull-right" onClick={() => downloadSampleYaml(templateName, kind)}>
        <span className="fa fa-fw fa-download" aria-hidden="true"></span> {t('CONTENT:DOWNLOADYAML')}
      </button>
    </li>
  );
};

export const ResourceSidebar = props => {
  const { kindObj, height } = props;
  if (!kindObj || !props.isCreateMode) {
    return null;
  }
  const { t } = useTranslation();
  let { kind, label } = kindObj;
<<<<<<< HEAD
  label === 'Federated Resource' ? label : t('RESOURCE:' + kind.toUpperCase());

=======
  label = t('RESOURCE:' + kind.toUpperCase());
>>>>>>> hc-dev
  let SidebarComponent = resourceSidebars.get(kind);
  if (SidebarComponent) {
    return (
      <ResourceSidebarWrapper label={label} t={t} style={{ height: height }}>
        <SidebarComponent {...props} />
      </ResourceSidebarWrapper>
    );
  }
  return null;
};
