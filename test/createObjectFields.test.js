import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import CreateObjectFields from '../app/components/createobject/createObjectFields';
import { mockFieldMasterList } from './mockData';

describe('The test case for the CreateObjectFields component', () => {
    const mockId = 'i-am-a-mock-uuid';
    const inputChangeHandler = () => console.log('Input change handler');
    const onDeleteHandler = jest.fn();
    const onDropDownItemClick = jest.fn();
    const fieldRuleCheckboxCallback = jest.fn();
    const isUpdating = true;
    const mockFieldItem = {
        "id": "c978e9a6-6180-4f11-ae68-77b9caaf61db",
        "objectFieldName": "Test Field Name",
        "fieldMasterName": "Test Master Name",
        "fieldMasterId": "13",
        "fieldXrefId": "0",
        "rules": [
            {
                id: '13',
                ruleGroupNumber: '10',
                longDescription: 'Currency code (USD)',
                shortDescription: 'Currency code (USD)',
                isMandatory: true
            }
        ]
    }

    it('1st test case', async () => {
        render(
            <CreateObjectFields
                key={mockId}
                item={mockFieldItem}
                onInputChangeHandler={inputChangeHandler}
                onDeleteHandler={onDeleteHandler}
                onDropDownItemClick={onDropDownItemClick}
                fieldMasterList={mockFieldMasterList}
                fieldRuleCheckboxCallback={fieldRuleCheckboxCallback}
                isUpdating={isUpdating}
            />
        );

        await waitFor(() => {
            expect(screen.getByText('Test Master Name')).toBeInTheDocument();
            expect(screen.getByText('Currency code (USD)')).toBeInTheDocument();

            const deleteButton = document.querySelector("button[class='mb-3 btn btn-danger']");
            fireEvent.click(deleteButton);
            expect(onDeleteHandler).toHaveBeenCalled();
        });
    });

    it('2nd test case', async () => {
        const item = {
            ...mockFieldItem,
            rules: [] /* Remove rules */
        };

        render(
            <CreateObjectFields
                key={mockId}
                item={item}
                onInputChangeHandler={inputChangeHandler}
                onDeleteHandler={onDeleteHandler}
                onDropDownItemClick={onDropDownItemClick}
                fieldMasterList={mockFieldMasterList}
                fieldRuleCheckboxCallback={fieldRuleCheckboxCallback}
                isUpdating={isUpdating}
            />
        );

        await waitFor(() => {
            const targetRuleDesc = screen.queryByText('Currency code (USD)');
            expect(targetRuleDesc).toBeNull(); // As expected: Because of the lack of rules, the corresponding UI will not be rendered.
        });
    });
});