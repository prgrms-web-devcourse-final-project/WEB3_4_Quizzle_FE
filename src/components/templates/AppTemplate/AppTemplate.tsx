import React from "react";
import "./AppTemplate.scss";

interface IAppTemplateProps {
    header?: React.ReactNode;
    content: React.ReactNode;
}

const AppTemplate = (props: IAppTemplateProps) => {
    return <div className="app-template-container">
        <div className="app-template-header">
            {props.header}
        </div>
        <div className="app-template-content">
            {props.content}
        </div>
    </div>
}

export default AppTemplate;