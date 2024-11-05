"use client";
import withAuth from "../withAuth";

const Conditions = ({conditionData}) => {    
    const transformData = (data) => {
        return (
            
            <div>
                {data.map(item => (
                    <div key={item.id}>
                        <br />
                        <li>Id: <b>{item.id}</b></li>
                        <li>Type: <b>{item.type}</b></li>
                        <li>Value: <b>{item.value}</b></li>
                        <li>Short Description: <b>{item.shortDescription}</b></li>
                        <li>Long Description: <b>{item.longDescription}</b></li>
                    </div>
                ))}
                
            </div>     
        ); 
    }

    return (
        <div>
            {transformData(conditionData)}
        </div>
    )
}

export default withAuth(Conditions);