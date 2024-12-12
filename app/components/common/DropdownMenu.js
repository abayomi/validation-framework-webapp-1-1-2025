import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

/**
 * Component: The custom dropdown component, with it we can control how each component behaves.
 * @returns {JSX.Element}
 */
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

/**
 * Component: The dropdown menu for displaying the list of Field Master.
 * @returns {JSX.Element}
 */
const DropdownMenu = ({ optionList, onDropDownItemClick, buttonName = '', customizeLabel = null}) => {
  const dropdownItemList = optionList.map(item => (
    <Dropdown.Item
      key={item.key}
      eventKey={item.key}
      onClick={ () => onDropDownItemClick(item) }
    >
      {/* The label of the drop-down menu option can be modified through the callback function passed in by modifyLabel. */}
      { customizeLabel ? customizeLabel(item) : item.value }
    </Dropdown.Item>
  ));

  return (
    <Dropdown className="ps-0">
      <Dropdown.Toggle id="dropdown-custom-components">
        {buttonName}
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        {dropdownItemList}
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomMenu.displayName = 'CustomMenu';

export default DropdownMenu;