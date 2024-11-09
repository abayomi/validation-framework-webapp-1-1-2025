import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateFieldMasterObject from './createFieldMaster';
import CreateObjectMaster from './createObjectMaster'
import { useLocation } from "react-router-dom";

const eventKeyObjectMaster = 'objectMaster';
const eventKeyFieldMaster = 'fieldMaster';

const TabMenu = () => {  
  const location = useLocation();

  const isShowTabMenu = location.pathname.includes("updatemasterobject");
  if (!isShowTabMenu) {
    return <></>;
  }

  const activeTabKey = location.pathname.includes("/updatemasterobject/object") ? eventKeyObjectMaster : eventKeyFieldMaster;
  const activeTabTitle = (activeTabKey === eventKeyObjectMaster) ? 'Object Master' : 'Field Master';

  return (
    <Tabs id="create-object-tab" className="mb-3">
      <Tab eventKey={activeTabKey} title={activeTabTitle}>
        { 
          (activeTabKey === eventKeyObjectMaster) 
          ? <CreateObjectMaster location={location} /> 
          : <CreateFieldMasterObject location={location} />
        }
      </Tab>
    </Tabs>
  );
}

export { eventKeyObjectMaster, eventKeyFieldMaster };
export default TabMenu;