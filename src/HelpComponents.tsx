import React from "react";

type Props = {
    data: any
}

export class ForEach extends React.Component<Props> {

    render() {
        const { data } = this.props;
        return (
            <div>
                {data && Array.isArray(data) && data.map((item: any) => <h1>{item.name}</h1>)}
            </div>
        )
    }
}
