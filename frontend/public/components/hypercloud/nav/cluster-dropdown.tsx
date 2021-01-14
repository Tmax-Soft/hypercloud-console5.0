import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownItem, DropdownToggle, Title } from '@patternfly/react-core';
import { CaretDownIcon } from '@patternfly/react-icons';
import { RootState } from '../../../redux';
import { featureReducerName } from '../../../reducers/features';
import { getActiveCluster } from '../../../reducers/ui';
import * as UIActions from '../../../actions/ui';
import { coFetchJSON } from '../../../co-fetch';

const defaultCluster: ClusterInfo[] = [{
    key: '#MASTER_CLUSTER#',
    name: 'Master Cluster',
    path: '',
}];

type StateProps = {
    activeCluster: string;
    setActiveCluster?: (name: string) => void;
    setActiveClusterPath?: (path: string) => void;
};

export type ClusterDropdownProps = {
    onClusterSelected: () => void;
};

const ClusterDropdown_: React.FC<ClusterDropdownProps & StateProps> = ({
    setActiveCluster,
    setActiveClusterPath,
    onClusterSelected,
    activeCluster,
}) => {
    const [isClusterDropdownOpen, setClusterDropdownOpen] = React.useState(false);
    const [clusters, setClusters] = React.useState(defaultCluster);

    const toggleClusterOpen = React.useCallback(() => {
        setClusterDropdownOpen(!isClusterDropdownOpen);
    }, [isClusterDropdownOpen]);

    const onClusterSelect = React.useCallback(
        (event: React.MouseEvent<HTMLLinkElement>, cluster): void => {
            event.preventDefault();

            const clusterKey = cluster.key ?? cluster.name;
            if (clusterKey !== activeCluster) {
                setActiveCluster(clusterKey);
                setActiveClusterPath(cluster.path);

                //history.push(cluster.properties.getLandingPageURL(flags));
                // TODO: k8sIP 바꾸기
            }

            setClusterDropdownOpen(false);
            onClusterSelected && onClusterSelected();
        },
        [activeCluster, onClusterSelected, setActiveCluster],
    );

    const renderClusterToggle = React.useCallback(
        (name: string) =>
            <DropdownToggle
                isOpen={isClusterDropdownOpen}
                onToggle={toggleClusterOpen}
                iconComponent={CaretDownIcon}
                data-test-id="perspective-switcher-toggle"
            >
                <Title size="md">
                    {name && name !== '#MASTER_CLUSTER#' ? name : defaultCluster[0].name}
                </Title>
            </DropdownToggle>
        ,
        [isClusterDropdownOpen, toggleClusterOpen],
    );

    const getClusterItems = React.useCallback(
        (clusters) => {
            return clusters.map((nextCluster) => (
                <DropdownItem
                    key={nextCluster.key ?? nextCluster.name}
                    onClick={(event: React.MouseEvent<HTMLLinkElement>) =>
                        onClusterSelect(event, nextCluster)
                    }
                    isHovered={(nextCluster.key || nextCluster.name) === activeCluster}
                    component="button"
                >
                    <Title size="md">
                        {nextCluster.name}
                    </Title>
                </DropdownItem>
            ));
        },
        [activeCluster, onClusterSelect],
    );

    React.useEffect(() => {
        if (clusters.length <= 1 || isClusterDropdownOpen) {
            coFetchJSON('api/k8sAll').then((res) => {
                const clusterList: ClusterInfo[] = Object.keys(res.routers).reduce((list, currentKey) => {
                    list.push({ name: currentKey, path: res.routers[currentKey].path });
                    return list;
                }, []);

                setClusters(defaultCluster.concat(clusterList));

                const cluster = activeCluster && clusterList.find(c => c.name === activeCluster);

                if (!cluster) {
                    setActiveCluster(defaultCluster[0].key);
                    setActiveClusterPath(defaultCluster[0].path);
                } else {
                    setActiveClusterPath(cluster.path);
                }

            });
        }
    }, [isClusterDropdownOpen]);

    return (
        <Dropdown
            isOpen={isClusterDropdownOpen}
            toggle={renderClusterToggle(activeCluster)}
            dropdownItems={getClusterItems(clusters)}
            data-test-id="perspective-switcher-menu"
        />
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeCluster: getActiveCluster(state),
});

export default connect<StateProps, {}, ClusterDropdownProps, RootState>(
    mapStateToProps,
    { setActiveCluster: UIActions.setActiveCluster, setActiveClusterPath: UIActions.setActiveClusterPath },
    null,
    {
        areStatesEqual: (next, prev) =>
            next[featureReducerName] === prev[featureReducerName] &&
            getActiveCluster(next) === getActiveCluster(prev),
    },
)(ClusterDropdown_);

type ClusterInfo = {
    key?: string;
    name: string;
    path: string;
};
