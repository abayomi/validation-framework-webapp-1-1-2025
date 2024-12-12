import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import graphqlForObjectMaster from "../../graphql/objectMasterQueries";

/**
 * Fetches and manages the list of Object Master data based on the provided dialect code.
 *
 * @param {string} dialectCode - The dialect code to fetch the Object Master list for.
 * @returns {[Array, Function]} - An array containing the list of Object Master data and a function to refresh the data.
 */
function fetchObjectMasterList(dialectCode) {
    const [list, setList] = useState([]);

    const rawData = useQuery(graphqlForObjectMaster.FetchObjectMasterList, {
        variables: { dialectCode: dialectCode }
    });

    useEffect(() => {
        // Render the list of Object Master
        if (rawData.error) {
            console.log('Error from GraphQL API: ', rawData.error.message);
        }
        if (rawData.data) {
            setList(rawData.data.FetchObjectMasterList);
        }
    }, [rawData]);

    const doRefresh = () => rawData.refetch();

    return [list, doRefresh];
}

export default fetchObjectMasterList;