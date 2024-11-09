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
  const activeKey = location.pathname.includes("/updatemasterobject/object") ? eventKeyObjectMaster : eventKeyFieldMaster;;
  const isUpdate = location.pathname.includes("updatemasterobject");
  const [key, setKey] = useState(activeKey);

  return (
    <Tabs
      id="create-object-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {(!isUpdate || activeKey === eventKeyObjectMaster) && (
        <Tab eventKey={eventKeyObjectMaster} title="Object Master">
          <CreateObjectMaster location={location} />
        </Tab>
      )}
      {(!isUpdate || activeKey === eventKeyFieldMaster) && (
        <Tab eventKey={eventKeyFieldMaster} title="Field Master">
          <CreateFieldMasterObject location={location} />
        </Tab>
      )}
    </Tabs>
  );
}

export { eventKeyObjectMaster, eventKeyFieldMaster };
export default TabMenu;