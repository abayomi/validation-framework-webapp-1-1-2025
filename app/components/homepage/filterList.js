"use client";

import Button from 'react-bootstrap/Button';
import { propertyGet } from "../../lib/arrayHelper";
import { dialectCodeOptions } from "../config/dialectCodeMap";

const FilterList = ({ dialectCode, filterText, inputPlaceHolder, onFilterTextChanged, onRefreshClicked, onDialectCodeChanged }) => {
    return (
        <>
            <select className="mx-3 px-2 py-1" 
                    aria-label="Dialect code" 
                    value={dialectCode} 
                    onChange={onDialectCodeChanged}
            >
                {
                    Object.entries(dialectCodeOptions).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))
                }
            </select>

            <input
                type="text"
                placeholder={inputPlaceHolder}
                value={filterText}
                onChange={onFilterTextChanged}
            />
            
            <Button size="sm" className="ms-3" onClick={onRefreshClicked}>Refresh</Button>
        </>
    );
};

const doFilterList = (data, field, filterText) => {
    return data.filter(function(item) {
        const targetField = propertyGet(item, field);
        return targetField && targetField.toLowerCase().includes(filterText.toLowerCase());
    });
};

export { doFilterList };
export default FilterList;