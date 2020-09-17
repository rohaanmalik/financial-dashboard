import * as React from 'react';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { classNames } from '@progress/kendo-react-common';
import { useHistory, useLocation } from 'react-router-dom';

export interface NavigationProps {
    className?: string;
}

export const Navigation: React.FunctionComponent<NavigationProps> = (props) => {
    const history = useHistory();
    const location = useLocation();

    const handleStockClick = React.useCallback(() => { history.push('/stocks'); }, [history]);

    return (
        <div className={classNames(props.className)}>
            <ButtonGroup>
                <Button togglable={true} selected={location.pathname.includes('/stocks')} onClick={handleStockClick}>Stock List</Button>
            </ButtonGroup>
        </div>
    )
}