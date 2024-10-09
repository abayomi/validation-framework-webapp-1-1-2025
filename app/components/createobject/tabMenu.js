import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateFieldMasterObject from './createFieldMaster';
import CreateObjectMaster from './createObjectMaster'
import { useLocation } from "react-router-dom";

const TabMenu = () => {  
  const location = useLocation();
  const activeKey = location.pathname === "/updatemasterobject/object" ? 'objectMaster' : 'fieldMaster'
  const [key, setKey] = useState(activeKey);

  return (
    <Tabs
      id="create-object-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="fieldMaster" title="Field Master">
        <CreateFieldMasterObject location={location} />
      </Tab>
      <Tab eventKey="objectMaster" title="Object Master">
        <CreateObjectMaster location={location} />
      </Tab>
    </Tabs>
  );
}

export default TabMenu;