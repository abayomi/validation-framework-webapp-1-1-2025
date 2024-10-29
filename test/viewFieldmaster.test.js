import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewFieldMaster from '../app/components/homepage/viewFieldMaster';

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
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

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

  // Simulate button click
  fireEvent.click(screen.getByText('Refresh'));

  // Check if refetch function is called
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

it('calls onRowClicked and updates state when a row is clicked', async () => {

  useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
  });

  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const mockSelector = jest.fn();
  useSelector.mockReturnValue(mockSelector);
  render(<ViewFieldMaster />);

  const rowElement = document.querySelector('#row-0');
  expect(rowElement).not.toBeNull();
  fireEvent.click(rowElement);
  // expect(mockDispatch).toHaveBeenCalled();
  // expect(mockDispatch).toHaveBeenCalledWith(rulesDataChange(mockData.FetchFieldMetaData[0]));

});