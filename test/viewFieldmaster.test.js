import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import ViewFieldMaster from '../app/components/homepage/viewFieldMaster';
import RulesObject from '../app/components/homepage/RulesObject';
import Conditions from '../app/components/homepage/Conditions';

const mockData = {
  FetchFieldMetaData: [
    { fieldName: '', fieldMasterId: '123', fieldName: 'Name1', fieldDefinition: 'Definition1', dialectCode: 'us_en', rules: [{'id': 'a'}] },
    { fieldName: '', fieldMasterId: '456', fieldName: 'Name2', fieldDefinition: 'Definition2', dialectCode: 'us_en', rules: [{'id': 'b'}] },
    { fieldName: '', fieldMasterId: '789', fieldName: 'Name3', fieldDefinition: 'Definition3', dialectCode: 'us_en', rules: [{'id': 'c'}] },
  ],
};

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

jest.mock('../app/components/withAuth', () => (Component) => (props) => <Component {...props} />);

jest.mock('../app/lib/arrayHelper', () => {
  const actual = jest.requireActual('../app/lib/arrayHelper');
  return {
    ...actual,
    uniqueRecords: jest.fn((data) => data),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

it('renders loading state', async () => {
  useQuery.mockReturnValue({ loading: true });
  render(<ViewFieldMaster />);
  await waitFor(() => {
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });
});

it('logs error when error state is true', async () => {
  useQuery.mockReturnValue({ error: 'Test error message' });
  render(<ViewFieldMaster />);
  await waitFor(() => {
    expect(screen.getByText((content, element) => {
      return content.includes('Error data:') && content.includes('Test error message');
    })).toBeInTheDocument();
  });
});

it('filters items based on filterText', async () => {

  useQuery.mockReturnValue({
    loading: false,
    error: null,
    data: mockData,
  });

  render(<ViewFieldMaster />);

  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.getByText('456')).toBeInTheDocument();
  expect(screen.getByText('789')).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText('Filter By Field Master Name'), { target: { value: 'Name1' } });

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

  expect(mockNavigate).toHaveBeenCalledWith('/updatemasterobject/field', { state: { updateFieldData: mockData.FetchFieldMetaData[0] } });
});

it('calls onRowClicked and updates state when a row is clicked', async () => {

  useQuery.mockReturnValue({
    loading: false,
    error: null,
    data: mockData,
  });

  const mockSetRule = jest.fn();

  jest.spyOn(React, 'useState')
    .mockImplementationOnce((initial) => [initial, mockSetRule])

  render(<ViewFieldMaster />);

  const cellElements = screen.getAllByRole('cell');
  const targetCell = cellElements.find(cell => cell.id === 'cell-1-undefined');
  screen.debug(targetCell);
  expect(targetCell).not.toBeNull();
  fireEvent.click(targetCell);
  expect(mockSetRule).toHaveBeenCalled();
});

it('filters items based on dialectCode', async () => {

  useQuery.mockReturnValue({
    loading: false,
    error: null,
    data: mockData,
  });

  render(<ViewFieldMaster />);

  const selectElement = document.querySelector('select[name="select_dialectCode"]');
  const options = Array.from(selectElement.options).map(option => option.value);
  selectElement.selectedIndex = 1;
  expect(selectElement).toBeInTheDocument();
  act(() => {
    const event = new Event('change', { bubbles: true });
    selectElement.dispatchEvent(event);
    expect(selectElement.value).toBe('ca_en');
  });
});

it('calls onRowClicked and show RuleData', async () => {

  useQuery.mockReturnValue({
    loading: false,
    error: null,
    data: mockData,
  });
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockRestore();

  render(<ViewFieldMaster />);

  const cellElements = screen.getAllByRole('cell');
  const targetCell = cellElements.find(cell => cell.id === 'cell-1-undefined');
  
  expect(targetCell).not.toBeNull();
  fireEvent.click(targetCell);
  expect(screen.getByText('Rules')).toBeInTheDocument();
});

it('render RulesObject without ruleList', async () => {
    render(<RulesObject />);
});

it('render Conditions', async () => {
  const mockConditionData = [{
    id:1,
    value:1,
    shortDescription: 'test1',
    longDescription: 'testLong1'
  },{
    id:2,
    value:2,
    shortDescription: 'test2',
    longDescription: 'testLong2'
  }];
  render(<Conditions conditionData={mockConditionData}/>);
});