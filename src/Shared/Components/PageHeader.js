import React from "react";

class PageHeader extends React.Component {
    render() {
        return (
            <div style={{ marginBottom: "50px" }}>
                <h2 className="ui header">
                    <i className={`${this.props.icon}`}></i>
                    <div className="content">
                        {this.props.title}
                    </div>
                </h2>
            </div>
        );
    }
}

export default PageHeader
