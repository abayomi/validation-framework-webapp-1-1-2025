import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateFieldMasterObject from './createFieldMaster';
import CreateObjectMaster from './createObjectMaster'
import { useLocation } from "react-router-dom";

const eventKeyObjectMaster = 'objectMaster';
const eventKeyFieldMaster = 'fieldMaster';

const TabMenu = () => {  
  const location = useLocation();
  const isUpdate = location.pathname.includes("updatemasterobject");
  const activeKeyValue = location.pathname.includes("/updatemasterobject/object") ? eventKeyObjectMaster : eventKeyFieldMaster;
  const [activeKey, setActiveKey] = useState(activeKeyValue);

  const tabObjectMaster = (
    <Tab eventKey={eventKeyObjectMaster} title="Object Master">
      <CreateObjectMaster location={location} />
    </Tab>
  );

  const tabFieldMaster = (
    <Tab eventKey={eventKeyFieldMaster} title="Field Master">
      <CreateFieldMasterObject location={location} />
    </Tab>
  );

  return (
    <Tabs
      id="create-object-tab"
      activeKey={activeKey}
      onSelect={(key) => setActiveKey(key)}
      className="mb-3"
    >
      {(isUpdate && activeKey === eventKeyObjectMaster) && tabObjectMaster}
      {(isUpdate && activeKey === eventKeyFieldMaster) && tabFieldMaster}
    </Tabs>
  );
}

export { eventKeyObjectMaster, eventKeyFieldMaster };
export default TabMenu;