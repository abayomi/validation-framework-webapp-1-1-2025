import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewObjectMaster from '../app/components/homepage/viewObjectMaster';
import mockData from '../app/components/homepage/data';

jest.mock('@apollo/client', () => ({
    useQuery: jest.fn(),
    gql: jest.fn(),
}));

jest.mock('../app/components/withAuth', () => (Component) => (props) => <Component {...props} />);

jest.mock('../app/components/homepage/formHomeSlice', () => ({
    ...jest.requireActual('../app/components/homepage/formHomeSlice'),
    rulesDataChange: jest.fn(),
}));


jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

beforeEach(() => {
    useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: mockData,
    });
});

afterEach(() => {
    
});

test('The list of Object Master is rendered correctly', async () => {
    render(<ViewObjectMaster />);

    await waitFor(() => {
        // The first row in the list renders correctly
        expect(screen.getByText('1111111Asset Rental Offering')).toBeInTheDocument();
    });
});

test('Click the first row in the list and display the corresponding Object Fields information.', async () => {
    useDispatch.mockReturnValue(jest.fn());

    render(<ViewObjectMaster />);

    await waitFor(() => {
        // Step 1: Click a row
        const aCellOfFirstRow = document.querySelector("#row-0 div[data-column-id='1']"); // Must be a "cell", otherwise fireEvent.click() won't work
        expect(aCellOfFirstRow).not.toBeNull();
        fireEvent.click(aCellOfFirstRow);

        // Step 2: The Object Fields part should appear
        expect(screen.getByText('Object Fields')).toBeInTheDocument();
        
        // TODO Step 3: There should be at least one record in the list in the Object Fields section.
        // const rowsObjectFields = document.querySelectorAll("#object-fields-table .rdt_TableHead div[role='row']");
        // expect(rowsObjectFields.length).toBeGreaterThanOrEqual(1);
    });
});