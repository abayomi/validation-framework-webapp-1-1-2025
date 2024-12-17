import React, { act } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import ViewObjectMaster from '../app/components/homepage/viewObjectMaster';
import { useMutation } from '@apollo/client';

jest.mock('@apollo/client', () => ({
    useQuery: jest.fn(),
    useLazyQuery: jest.fn(),
    useMutation: jest.fn(),
    gql: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('../app/components/withAuth', () => (Component) => (props) => <Component {...props} />);

jest.mock('../app/graphql/objectMasterQueries', () => ({
    graphqlForObjectMaster: {
        DeleteValidationObject: jest.fn(),
        FetchObjectMetaDataByLabel: jest.fn(),
    },
}));

const mockData = {
    "objectMasterId": "1",
    "objectName": "1111111Asset Rental Offering",
    "objMasterInUseInd": true,
    "objectLabelName": "test",
    "fields": [
        {
            "enterpriseFieldInd": true,
            "fieldMasterDefinition": "Dealer Assign Number",
            "fieldMasterId": "1",
            "fieldMasterName": "dan",
            "fieldName": "dlr_asgn_no",
            "fieldXrefId": "1",
            "rules": [
                {
                    "id": "1",
                    "type": "2",
                    "isMandatory": true,
                    "errorCode": "2",
                    "errorMessage": "%f",
                    "longDescription": "Call to enterprise API to validation value",
                    "shortDescription": "Rest API Call",
                    "conditions": [
                        {
                            "id": "26",
                            "type": "3",
                            "value": "enterprise-apis-cache-service",
                            "shortDescription": "API Id",
                            "longDescription": "API Unique Id"
                        },
                        {
                            "id": "1",
                            "type": "2",
                            "value": "dlr_asgn_no,corp_cd,cli_no",
                            "shortDescription": "API Parameters",
                            "longDescription": "API query parameters name"
                        }
                    ]
                }
            ]
        },
    ]
};

const mockUseQueryData = {
    "FetchObjectMetaDataByLabel": [
        mockData
    ]
};
const mockListData = {
    FetchObjectMasterList: [
        mockData
    ] 
};

const mockUseLazyQuery = jest.fn();
const mockUseMutation = jest.fn();

test('The list of Object Master is rendered error', async () => {
    useLazyQuery.mockImplementation(() => [mockUseLazyQuery, { data: null, error: null }]);
    useMutation.mockImplementation(() => [mockUseMutation, { data: null, error: null }]);
    useLocation.mockReturnValue({ state: { refreshPage: false } });
    render(
        <ViewObjectMaster />
    );
    await waitFor(() => {
        // The first row in the list renders correctly
        expect(screen.getByText('There are no records to display')).toBeInTheDocument();
    });
});

test('Click the first row in the list and display the corresponding Object Fields information.', async () => {
    useLazyQuery.mockImplementation(() => [mockUseLazyQuery, { data: mockUseQueryData, error: null }]);
    useQuery.mockReturnValue({ data: mockListData, error: null });
    useMutation.mockImplementation(() => [mockUseMutation, { data: null, error: null }]);
    useLocation.mockReturnValue({ state: { refreshPage: false } });
    render(<ViewObjectMaster />);
    expect(screen.getByText('1111111Asset Rental Offering')).toBeInTheDocument();

    await waitFor(() => {
        // Step 1: Click a row
        const aCellOfFirstRow = document.querySelector("#row-0 div[data-column-id='1']"); // Must be a "cell", otherwise fireEvent.click() won't work
        expect(aCellOfFirstRow).not.toBeNull();
        fireEvent.click(aCellOfFirstRow);

        // Step 2: The Object Fields part should appear
        expect(screen.getByText('Object Fields')).toBeInTheDocument();

        // Step 3: There should be at least one record in the list in the Object Fields section.
        const rowsObjectFields = document.querySelectorAll('div.rdt_TableRow');
        expect(rowsObjectFields.length).toBeGreaterThanOrEqual(1);
    });
});

test('Check Button.', async () => {
    const refetch = jest.fn();
    useLazyQuery.mockImplementation(() => [mockUseLazyQuery, { data: null, error: null }]);
    useQuery.mockReturnValue({ data: mockListData, error: null, refetch });
    useLocation.mockReturnValue({ state: { refreshPage: false } });
    useMutation.mockImplementation(() => [
        async (options) => {
            return {
                data: {
                    DeleteValidationObject: [{
                        objectMasterId: '1'
                    }]
                },
                error: null
            };
        },
        { data: { DeleteValidationObject: { objectMasterId: 1 } }, error: null }
    ]);
    const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);

    const { container } = render(<ViewObjectMaster />);

    fireEvent.change(screen.getByPlaceholderText('Filter By Object Name'), { target: { value: '1111111Asset Rental Offering' } });

    const buttons = container.querySelectorAll('button');
    for (const button of buttons) {
        if (button.textContent === 'Refresh') {
            fireEvent.click(button);
            expect(refetch).toHaveBeenCalled();
        }
        if (button.textContent === 'Delete') {
            const rowElement = button.closest('div[role="row"]');
            expect(rowElement).not.toBeNull();
            const specificCell = rowElement.querySelector('div#cell-3-undefined');
            expect(specificCell).not.toBeNull();
            expect(specificCell).toHaveTextContent('Yes');
            fireEvent.click(button);
            expect(confirmSpy).toHaveBeenCalled();
            await waitFor(() => {
                expect(specificCell).toHaveTextContent('No');
            });
            break;
        }
    };
    confirmSpy.mockRestore();
});

test('should update filterText and dialectCode on change', () => {
    const refetch = jest.fn();
    useLazyQuery.mockImplementation(() => [mockUseLazyQuery, { data: null, error: null }]);
    useQuery.mockReturnValue({ data: mockListData, error: null, refetch });
    useMutation.mockImplementation(() => [mockUseMutation, { data: null, error: null }]);
    useLocation.mockReturnValue({ state: { refreshPage: false } });
    render(<ViewObjectMaster />);

    const input = screen.getByPlaceholderText('Filter By Object Name');
    fireEvent.change(input, { target: { value: 'new filter text' } });
    expect(input.value).toBe('new filter text');

    const selectElement = document.querySelector('select[name="select_dialectCode"]');
    selectElement.selectedIndex = 1;
    expect(selectElement).toBeInTheDocument();
    act(() => {
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
        expect(selectElement.value).toBe('ca_en');
        expect(input.value).toBe('');
    });
});

test('Check Delete Button and get error.', async () => {
    const refetch = jest.fn();
    useLazyQuery.mockImplementation(() => [mockUseLazyQuery, { data: null, error: null }]);
    useQuery.mockReturnValue({ data: mockListData, error: null, refetch });
    useMutation.mockImplementation(() => [mockUseMutation, { data: null, error: 'error' }]);
    useLocation.mockReturnValue({ state: { refreshPage: false } });
    const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    const { container } = render(<ViewObjectMaster />);

    fireEvent.change(screen.getByPlaceholderText('Filter By Object Name'), { target: { value: '1111111Asset Rental Offering' } });

    const buttons = container.querySelectorAll('button');

    for (const button of buttons) {
        if (button.textContent === 'Delete') {
            const rowElement = button.closest('div[role="row"]');
            expect(rowElement).not.toBeNull();
            fireEvent.click(button);
            expect(confirmSpy).toHaveBeenCalled();
            await waitFor(() => {
                expect(consoleLogSpy).toHaveBeenCalledWith('Error from GraphQL API: ', "error");
            });
            break;
        }
    };
    confirmSpy.mockRestore();
    consoleLogSpy.mockRestore();
});

test('Check Edit Button and go to update page.', async () => {

    useLazyQuery.mockImplementation(() => [mockUseLazyQuery, { data: null, error: null }]);
    useQuery.mockReturnValue({ data: mockListData, error: null });
    useMutation.mockImplementation(() => [mockUseMutation, { data: null, error: 'error' }]);
    useLocation.mockReturnValue({ state: { refreshPage: false } });
    useNavigate.mockReturnValue(jest.fn());
    const navigate = useNavigate();

    const { container } = render(<ViewObjectMaster />);

    fireEvent.change(screen.getByPlaceholderText('Filter By Object Name'), { target: { value: '1111111Asset Rental Offering' } });

    const buttons = container.querySelectorAll('button');
    for (const button of buttons) {
        if (button.textContent === 'Edit') {
            fireEvent.click(button);
            await waitFor(() => {
                expect(navigate).toHaveBeenCalledWith('/updatemasterobject/object/test');
            });
            break;
        }
    };
});

test('Check Row and get error.', async () => {
    useLazyQuery.mockImplementation(() => [mockUseLazyQuery, { data: null, error: 'error' }]);
    useQuery.mockReturnValue({ data: mockListData, error: null });
    useMutation.mockImplementation(() => [mockUseMutation, { data: null, error: null }]);
    useLocation.mockReturnValue({ state: { refreshPage: false } });
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    render(<ViewObjectMaster />);
    expect(screen.getByText('1111111Asset Rental Offering')).toBeInTheDocument();

    await waitFor(() => {
        const aCellOfFirstRow = document.querySelector("#row-0 div[data-column-id='1']"); // Must be a "cell", otherwise fireEvent.click() won't work
        expect(aCellOfFirstRow).not.toBeNull();
        fireEvent.click(aCellOfFirstRow);
        expect(consoleLogSpy).toHaveBeenCalledWith('Error from GraphQL API: ', "error");
    });
    consoleLogSpy.mockRestore();
});