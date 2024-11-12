import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
          )}
        </ul>
      </div>
    );
  },
);

const DropdownMenu = ({ list, keyProp, valueProp, setValue, buttonName }) => (
  <Dropdown className="ps-0">
    <Dropdown.Toggle id="dropdown-custom-components">
      {buttonName}
    </Dropdown.Toggle>
    <Dropdown.Menu as={CustomMenu}>
      {list.map((item) => (
        <Dropdown.Item
          key={item[keyProp]}
          eventKey={item[keyProp]}
          onClick={() => setValue(item[valueProp])}
        >
          {item[valueProp]}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownMenu;