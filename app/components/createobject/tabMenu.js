import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateFieldMasterObject from './createFieldMaster';
import CreateObjectMaster from './createObjectMaster'
import { useLocation } from "react-router-dom";

const TabMenu = () => {  
  const location = useLocation();
  let activeKey = "objectMaster";
  let isUpdate = false;
  if (location.pathname.includes("updatemasterobject")) {
    isUpdate = true;
    activeKey = location.pathname === "/updatemasterobject/object" ? 'objectMaster' : 'fieldMaster';
  }
  const [key, setKey] = useState(activeKey);

  return (
    <Tabs
      id="create-object-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {(!isUpdate || isUpdate && activeKey === "objectMaster") && (
        <Tab eventKey="objectMaster" title="Object Master">
          <CreateObjectMaster location={location} />
        </Tab>
      )}
      {(!isUpdate || isUpdate && activeKey === "fieldMaster") && (
        <Tab eventKey="fieldMaster" title="Field Master">
          <CreateFieldMasterObject location={location} />
        </Tab>
      )}
    </Tabs>
  );
}

export default TabMenu;