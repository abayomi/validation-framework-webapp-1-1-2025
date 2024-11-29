import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewObjectMaster from './viewObjectMaster';
import ViewFieldMaster from './viewFieldMaster'
import { useLocation } from "react-router-dom";

const HomepageTabMenu = ({ tabKey = 'viewObjectMaster' }) => {  
  console.log(tabKey);
  const location = useLocation();
  const [key, setKey] = useState(tabKey); // Set up the default tab. The value is the eventKey of a <Tab>.

  useEffect(() => {
    if (location.state?.tabKey) {
      setKey(location.state.tabKey);
    }
  }, [location]);

  return (
    <Tabs
      id="view-object-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="viewObjectMaster" title="Object Master">
        <ViewObjectMaster location={location} />
      </Tab>
      <Tab eventKey="viewFieldMaster" title="Field Master">        
        <ViewFieldMaster location={location} />
      </Tab>
    </Tabs>
  );
}

export default HomepageTabMenu;