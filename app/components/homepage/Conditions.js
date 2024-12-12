"use client";

import { uniqueRecords } from "../../lib/arrayHelper";
import withAuth from "../withAuth";

const sortByItemsIdAsc = (conditionData) => [...conditionData].sort((a, b) => a.id - b.id);

/**
 * Component: Show the details of a rule of an object field
 * @returns {Element}
 */
const Conditions = ({ conditionData }) => {
    const filteredConditionData = uniqueRecords(conditionData);
    if (0 === filteredConditionData.length) {
        return <p>No conditions</p>;
    }

    const sortedConditionData = sortByItemsIdAsc(filteredConditionData);

    return sortedConditionData.map(item => (
        <ul key={item.id}>
            <li>Value: <b>{item.value}</b></li>
            <li>Short Description: <b>{item.shortDescription}</b></li>
            <li>Long Description: <b>{item.longDescription}</b></li>
        </ul>
    ));
}

export default withAuth(Conditions);