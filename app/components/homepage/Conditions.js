"use client";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'

const Conditions = () => {
    const dispatch = useDispatch()
    const conditions = useSelector(state => state.user.rulesData[0].conditions)
    console.log(conditions);
    
    const transformData = (data) => {
        return (
            
            <div>
                {data.map(item => (
                    <div>
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
            {transformData(conditions)}
        </div>
    )
}

export default withAuth(Conditions);