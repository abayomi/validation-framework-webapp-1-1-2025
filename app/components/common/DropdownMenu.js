import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    const filterByKeyword = (child) => {
      const keywordMatched = child.props.children.toLowerCase().includes(searchKeyword.toLowerCase());
      return ('' === searchKeyword) || keywordMatched;
    };

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
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(filterByKeyword)}
        </ul>
      </div>
    );
  },
);

const DropdownMenu = ({ list, onDropDownItemClick, buttonName = '' }) => (
  <Dropdown className="ps-0">
    <Dropdown.Toggle id="dropdown-custom-components">
      {buttonName}
    </Dropdown.Toggle>
    <Dropdown.Menu as={CustomMenu}>
      {list.map((item) => (
        <Dropdown.Item
          key={item.key}
          eventKey={item.key}
          onClick={ () => onDropDownItemClick(item.value) }
        >
          {item.value}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownMenu;