import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Homepage from "./Homepage"
import ViewObjectMaster from './viewObjectMaster';
import ViewFieldMaster from './viewFieldMaster'
import { useLocation } from "react-router-dom";

const TabMenu = () => {  
  const location = useLocation();
  const [key, setKey] = useState('ViewObjectMaster');

  return (
    <Tabs
      id="view-object-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="ViewObjectMaster" title="Object Master">
        <ViewObjectMaster location={location} />
      </Tab>
      <Tab eventKey="viewFieldMaster" title="Field Master">        
        <ViewFieldMaster location={location} />
      </Tab>
    </Tabs>
  );
}

export default TabMenu;