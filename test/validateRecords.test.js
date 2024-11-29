import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ValidateRecords from '../app/components/validateRecords/validateRecords';
import RecordCard from '../app/components/validateRecords/recordCard';
import ObjectFields from '../app/components/validateRecords/objectFields';
import AlertWindow from '../app/components/validateRecords/alertWindow';
import ErrorBoundary from '../app/errorBoundary';
import '@testing-library/jest-dom';
import { useQuery, useLazyQuery } from '@apollo/client';

jest.mock('@apollo/client', () => ({
    useLazyQuery: jest.fn(),
    useQuery: jest.fn(),
    gql: jest.fn(),
}));

jest.mock('../app/graphql/objectMasterQueries', () => ({
    CREATE_ENTERPRISE_FIELD: jest.fn(),
    REMOVE_RULE_FROM_ENTERPRISE_FIELD: jest.fn(),
}));

jest.mock('../app/graphql/validationQueries', () => ({
    LOAD_VALIDATE_RECORDS: jest.fn(),
}));

jest.mock('../app/components/withAuth', () => (Component) => (props) => <Component {...props} />);

const mockData = [
    { objectMasterId: '123', objectName: 'Name1' },
    { objectMasterId: '456', objectName: 'Name2' },
    { objectMasterId: '789', objectName: 'Name3' },
];

const mockFieldData = [
    { fieldName: '111' },
    { fieldName: '222' },
    { fieldName: '333' }
];

const mockReturnInfo = "infoTest";
const mockReturnError = "errorTest";
const mockReturnLazyQueryByName0 = { data: test, loading: false, error: null };
const mockReturnLazyQueryByNameInfo = { data: { FetchObjectMetaDataByLabel: [{ fields: mockFieldData }] }, loading: false, error: null };
const mockReturnLazyQueryByNameError = { data: null, loading: false, error: 'test' };
const mockReturnLazyQueryByBatchError = { data: null, loading: false, error: mockReturnError };
const mockReturnLazyQueryByBatchInfo = { data: mockReturnInfo, loading: false, error: null };

useQuery.mockReturnValue({ data: { FetchObjectMasterList: mockData }, loading: false, error: null });

useLazyQuery.mockImplementation((query, options = {}) => {
    const { variables: initialVariables } = options;
    const [attributes, setAttributes] = useState({});

    const useLazyQueryMock = ({ variables: passedVariables } = {}) => {
        if (passedVariables['objectLabelName']) {
            if (['Name1', 'Name2'].includes(passedVariables['objectLabelName'])) {
                setAttributes(mockReturnLazyQueryByNameInfo);
            } else {
                setAttributes(mockReturnLazyQueryByNameError);
            }
        } else if (passedVariables['batch']) {
            if (passedVariables['batch']['objectName'] == 'Name1') {
                setAttributes(mockReturnLazyQueryByBatchInfo);
            } else {
                setAttributes(mockReturnLazyQueryByBatchError);
            }
        } else {
            setAttributes(mockReturnLazyQueryByName0);
        }
    };
    return [useLazyQueryMock, attributes];
});

it('renders ValidateRecords', async () => {
    render(<ValidateRecords />);
    expect(screen.getByText('Object Name')).toBeInTheDocument();
    expect(screen.getByText('Object Records')).toBeInTheDocument();
    expect(screen.getByText('Add Record')).toBeInTheDocument();
});

it('add Record', async () => {
    render(<ValidateRecords />);
    expect(screen.getByText('Add Record')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Add Record/i));
    const cardBodies = document.querySelectorAll('div.card-body');
    expect(cardBodies).toHaveLength(2);
});

it('delete Record', async () => {
    render(<ValidateRecords />);
    const deleteRecordButton = document.querySelector('button.delete-object-record');
    fireEvent.click(deleteRecordButton);
    const cardBodies = document.querySelectorAll('div.card-body');
    expect(cardBodies).toHaveLength(0);
});

it('add Field', async () => {
    render(<ValidateRecords />);
    expect(screen.getByText('Add Field')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Add Field/i));
    const cardBodies = document.querySelectorAll('div.row-object-field');
    expect(cardBodies).toHaveLength(2);
});

it('delete Field', async () => {
    render(<ValidateRecords />);
    const deleteFieldButton = document.querySelector('button.delete-object-field');
    fireEvent.click(deleteFieldButton);
    const cardBodies = document.querySelectorAll('div.row-object-field');
    expect(cardBodies).toHaveLength(0);
});

it('renders ValidateRecords and submit', async () => {
    const mockFunction = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((initialState) => {
        return [initialState === undefined ? [] : initialState, mockFunction];
    });
    render(
        <ErrorBoundary>
            <ValidateRecords />
        </ErrorBoundary>
    );

    const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
    const name1 = dropdownItems[0];
    expect(name1).toBeInTheDocument();
    fireEvent.click(name1);
    expect(screen.getByText('Name1')).toBeInTheDocument();

    const selectElement = screen.getByLabelText('fieldName');
    fireEvent.change(selectElement, { target: { value: '111' } });
    expect(selectElement.value).toBe('111');

    const fieldValue = "ValueTest";
    const inputFieldElement = document.querySelector('input#fieldValue');
    expect(inputFieldElement).toBeInTheDocument();
    fireEvent.change(inputFieldElement, { target: { value: fieldValue } });
    expect(inputFieldElement.value).toBe(fieldValue);

    const submitButton = screen.getByText('Validate');
    fireEvent.click(submitButton);
    expect(screen.getByText(/infoTest/i)).toBeInTheDocument();
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    const objectName2 = "Name2";
    const inputElement = document.querySelector('input.input-object-name');
    fireEvent.change(inputElement, { target: { value: objectName2 } });
    fireEvent.change(selectElement, { target: { value: '222' } });
    expect(selectElement.value).toBe('222');
    fireEvent.click(submitButton);
    expect(screen.getByText(/errorTest/i)).toBeInTheDocument();
});

it('renders ValidateRecords and fetchObjectError', async () => {
    const mockFunction = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((initialState) => {
        return [initialState === undefined ? [] : initialState, mockFunction];
    });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(
        <ErrorBoundary>
            <ValidateRecords />
        </ErrorBoundary>
    );

    const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
    const name3 = dropdownItems[2];
    expect(name3).toBeInTheDocument();
    fireEvent.click(name3);
    expect(screen.getByText('Name3')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledWith("test");
});

it('renders with rawObjectMasterList.error', () => {
    useQuery.mockReturnValue({
        data: null,
        loading: false,
        error: 'rawObjectMasterListError',
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(<ValidateRecords />);
    expect(consoleErrorSpy).toHaveBeenCalledWith("rawObjectMasterListError");
});

it('renders RecordCard component', () => {
    const mockProps = {
        id: '1',
        item: null,
        onChange: jest.fn(),
        fieldNameList: ['field1', 'field2'],
        onDelete: jest.fn(),
    };

    render(<RecordCard {...mockProps} />);
});

it('renders ObjectFields component', () => {
    const mockProps = {
        id: '1',
        item: null,
        onChange: jest.fn(),
        fieldNameList: ['fieldName1', 'fieldName2'],
        deleteRow: jest.fn(),
    };

    render(<ObjectFields {...mockProps} />);
});

it('renders AlertWindow and calls handleClose when overlay is clicked', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <AlertWindow
        show={true}
        handleClose={handleClose}
        error={null}
        modalData={null}
      />
    );
  
    const overlay = container.querySelector('.overlay');
    fireEvent.click(overlay);
  
    expect(handleClose).toHaveBeenCalled();
  });