"use client";
import withAuth from "../withAuth";

const Conditions = ({ conditionData }) => {
    const isAllowBlankRule = (0 === conditionData.length) || !conditionData[0].id;
    if (isAllowBlankRule) {
        return <p>No conditions for a rule that allows blank.</p>;
    }

    return conditionData.map(item => (
        <ul key={item.id}>
            <li>Id: <b>{item.id}</b></li>
            <li>Type: <b>{item.type}</b></li>
            <li>Value: <b>{item.value}</b></li>
            <li>Short Description: <b>{item.shortDescription}</b></li>
            <li>Long Description: <b>{item.longDescription}</b></li>
        </ul>
    ));
}

export default withAuth(Conditions);