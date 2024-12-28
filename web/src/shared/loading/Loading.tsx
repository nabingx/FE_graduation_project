import React from "react";
import { Atom } from "react-loading-indicators";
import { observer } from "mobx-react";
interface Props {
    color?: string;
}
const Loading: React.FC<Props> = ({ color }) => {
    return (
        <div
            className="loadding"
            style={{ display: "grid", justifyContent: "center" }}
        >
            <Atom
                color={color ? color : "#0E72ED"}
                size="small"
                text=""
                textColor="#NaNNaNNaN"
            />
        </div>
    );
};
export default observer(Loading);
