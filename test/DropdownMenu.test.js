import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, act} from '@testing-library/react';
import { mapOptionList } from '@/app/components/createobject/createObjectFields';
import { mockFieldMasterList } from './mockData';
import DropdownMenu from "../app/components/common/DropdownMenu";

/* npm test -- DropdownMenu.test.js */
describe('The test case for the DropdownMenu component', () => {
    it('1st test case', async () => {
        const onDropDownItemClick = jest.fn();
        const dropDownButtonName = 'Choose';

        // Use act(...) to wrap the rendering to ensure that all state updates are completed
        await act(async () => {
            render(
                <DropdownMenu
                    buttonName={dropDownButtonName}
                    optionList={mapOptionList(mockFieldMasterList)}
                    onDropDownItemClick={onDropDownItemClick}
                    customizeLabel={item => `${item.value} - (${item.definition})`}
                />
            );
        });

        // This simulated click operation cannot be placed in the previous act().
        await act(async () => {
            const chooseButton = screen.getByText(dropDownButtonName);
            fireEvent.click(chooseButton);
        });

        // Check if the specific text is present in the dropdown menu
        const dropdownItem = screen.getByText('corp_cd - (Corp Code)');
        expect(dropdownItem).toBeInTheDocument();

        // Simulate a click on the Dropdown item, and check if the click handler was called.
        fireEvent.click(dropdownItem);
        expect(onDropDownItemClick).toHaveBeenCalled();
    });
});