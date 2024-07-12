import React from "react";

interface IProps {
    show: boolean;
    children?: React.ReactNode;
}
const TabPanel: React.FC<IProps> = ({ show, children, ...other }) => {
    return (
        <div role="tabpanel" hidden={!show} {...other}>
            {show && children}
        </div>
    );
};

export default TabPanel;
