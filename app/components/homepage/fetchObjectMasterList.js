import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import graphqlForObjectMaster from "../../graphql/objectMasterQueries";

function fetchObjectMasterList(dialectCode) {
    const [list, setList] = useState([]);

    const rawData = useQuery(graphqlForObjectMaster.FetchObjectMasterList, {
        variables: { dialectCode: dialectCode }
    });

    useEffect(() => {
        // Render the list of Object Master
        if (rawData.error) {
            console.log('Error from GraphQL API: ', rawObjectFieldsData.error.message);
        }
        if (rawData.data) {
            setList(rawData.data.FetchObjectMasterList);
        }
    }, [rawData]);

    const doRefresh = () => rawData.refetch();

    return [list, doRefresh];
}

export default fetchObjectMasterList;