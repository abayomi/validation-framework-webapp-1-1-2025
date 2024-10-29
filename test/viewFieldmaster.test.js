import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewFieldMaster from '../app/components/homepage/viewFieldMaster';
import { rulesDataChange } from '../app/components/homepage/formHomeSlice';

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

const mockData = {
  FetchFieldMetaData: [
    { fieldMasterId: '123', fieldName: 'Name1', fieldDefinition: 'Definition1', rules: ['Rule1'] },
    { fieldMasterId: '456', fieldName: 'Name2', fieldDefinition: 'Definition2', rules: ['Rule2'] },
    { fieldMasterId: '789', fieldName: 'Name3', fieldDefinition: 'Definition3', rules: ['Rule3'] },
  ],
};

test('renders loading state', async () => {
  useQuery.mockReturnValue({ loading: true });
  render(<ViewFieldMaster />);
  await waitFor(() => {
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });
});

test('logs error when error state is true', async () => {
  useQuery.mockReturnValue({ error: 'Test error message' });
  render(<ViewFieldMaster />);
  await waitFor(() => {
    expect(screen.getByText((content, element) => {
      return content.includes('Error data:') && content.includes('Test error message');
    })).toBeInTheDocument();
  });
});

test('filters items based on filterText', async () => {

  useQuery.mockReturnValue({
    loading: false,
    error: null,
    data: mockData,
  });

  render(<ViewFieldMaster />);

  // Check that all items are rendered initially
  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.getByText('456')).toBeInTheDocument();
  expect(screen.getByText('789')).toBeInTheDocument();

  // Simulate entering filter text
  fireEvent.change(screen.getByPlaceholderText('Filter By Id'), { target: { value: '123' } });

  // Check that only the filtered item is rendered
  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.queryByText('456')).not.toBeInTheDocument();
  expect(screen.queryByText('789')).not.toBeInTheDocument();
});

it('calls refetch when Refresh button is clicked', async () => {
  const refetch = jest.fn();
  useQuery.mockReturnValue({
    loading: false,
    error: null,
    data: mockData,
    refetch,
  });

  render(<ViewFieldMaster />);

  fireEvent.click(screen.getByText('Refresh'));

  expect(refetch).toHaveBeenCalled();
});

it('calls rowUpdate when Edit button is clicked', async () => {
  useQuery.mockReturnValue({
    loading: false,
    error: null,
    data: mockData,
  });

  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  render(<ViewFieldMaster />);

  const editButtons = screen.getAllByText('Edit');

  fireEvent.click(editButtons[0]);

  expect(mockNavigate).toHaveBeenCalledWith('/updatemasterobject/field', { state: { fieldData: mockData.FetchFieldMetaData[0] } });
});

it.only('calls onRowClicked and updates state when a row is clicked', async () => {

  useQuery.mockReturnValue({
    loading: false,
    error: false,
    data: false,
  });

  const mockReturn = jest.fn();
  const setRulesDataMock = jest.fn();
  useDispatch.mockReturnValue(mockReturn);
  useSelector.mockReturnValue(mockReturn);
  rulesDataChange.mockReturnValue(mockReturn);

  jest.spyOn(React, 'useEffect')
    .mockImplementationOnce(() => ['', setRulesTableMock]);
  jest.spyOn(React, 'useState')
    .mockImplementationOnce(() => [[], setRulesDataMock]) // rulesData
    .mockImplementationOnce(() => [mockData, setFilterTextMock]);

  render(<ViewFieldMaster />);
  screen.debug();
  // const rowElement = screen.getByRole('row', { name: /row-123/i });

  // expect(rowElement).not.toBeNull();
  // fireEvent.click(rowElement);
  // expect(useDispatch).toHaveBeenCalled();
  // expect(setRulesTableMock).toHaveBeenCalledWith(true);
  // expect(mockDispatch).toHaveBeenCalledWith(rulesDataChange(mockData.FetchFieldMetaData[0]));

});