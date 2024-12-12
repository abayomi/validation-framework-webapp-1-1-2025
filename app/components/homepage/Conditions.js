"use client";

import { uniqueRecords } from "../../lib/arrayHelper";
import withAuth from "../withAuth";

/**
 * Sorts an array of items in ascending order by their ID.
 *
 * @param {Array} conditionData - The array of items to be sorted.
 * @returns {Array} A new array with items sorted by ID in ascending order.
 */
const sortByItemsIdAsc = (conditionData) => [...conditionData].sort((a, b) => a.id - b.id);

/**
 * Component: Show the details of a rule of an object field
 * @returns {JSX.Element}
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