import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateFieldMasterObject from '../app/components/createobject/createFieldMaster';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { gql, useMutation } from '@apollo/client';
import { CREATE_ENTERPRISE_FIELD, REMOVE_RULE_FROM_ENTERPRISE_FIELD } from '../app/graphql/fieldMasterMutations';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

jest.mock('../app/graphql/fieldmasterMutations', () => ({
  CREATE_ENTERPRISE_FIELD: jest.fn(),
  REMOVE_RULE_FROM_ENTERPRISE_FIELD: jest.fn(),
}));


const mockFieldUpdate = {
  updateFieldData: {
    'fieldMasterId': 682,
    'fieldName': 'test682',
    'enterpriseFieldInd': false,
    'fieldMasterInUseInd': true,
    'fieldDefinition': 'testDefinition',
    'dialectCode': 'us_en',
    'rules': [{
      id: 1,
      eventkey: 1,
      isUpdate: true,
      ruleGroupNumberList: [],
      item: {
        id: 2,
        type: '2',
        errorCode: '2',
        errorMessage: 'Error message',
        ruleGroupNumber: '123',
        mandatoryRuleInd: true,
        shortDescription: 'Short description test',
        longDescription: 'Long description test',
        conditions: [{ id: 1, type: '1', value: 'Condition 1' }]
      }
    }]
  }
};

const mockFieldUpdateWithoutRule = {
  updateFieldData: {
    'fieldMasterId': 682,
    'fieldName': 'test682',
    'enterpriseFieldInd': false,
    'fieldMasterInUseInd': true,
    'fieldDefinition': 'testDefinition',
    'dialectCode': 'us_en',
  }
};

const mocks = [
  {
    request: {
      query: CREATE_ENTERPRISE_FIELD,
      variables: {
        dialectCode: 'en-US',
        fieldName: 'Test Field',
        fieldDefinition: 'This is a test field',
        enterpriseFieldInd: false,
        fieldMasterInUseInd: true,
      },
    },
    result: {
      data: {
        CreateEnterpriseField: [
          {
            fieldMasterId: '1',
            fieldName: 'Test Field',
            fieldDefinition: 'This is a test field',
          },
        ],
      },
    },
  },
  {
    request: {
      query: REMOVE_RULE_FROM_ENTERPRISE_FIELD,
      variables: {
        field_valid_rule_id: 1,
      },
    },
    result: {
      data: {
        RemoveRuleFromEnterpriseField: {
          status: true,
        },
      },
    },
  },
];

useNavigate.mockReturnValue(jest.fn());
const mockUseMutation = useMutation;
const mockCreateField = jest.fn();
const mockRemoveRuleField = jest.fn();
useMutation.mockReturnValue([mockCreateField, { data: null, loading: false, error: null }]);
useMutation.mockReturnValue([mockRemoveRuleField, { data: null, loading: false, error: null }]);

it('renders CreateFieldMasterObject and submits form', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const variables = {
    fieldMasterId: 678,
    dialectCode: "en_us",
    fieldName: 'Test Field',
    fieldDefinition: 'This is a test field',
    enterpriseFieldInd: false,
    fieldMasterInUseInd: true,
  };

  useMutation.mockReturnValue([mockCreateEnterpriseField, { data: null, loading: false, error: null }]);
  render(<CreateFieldMasterObject location={{ pathname: '/createmasterobject/field' }} />);

  // Check if the form is rendered
  expect(screen.getByLabelText('Dialect Code')).toBeInTheDocument();

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Field Name/i), { target: { value: variables.fieldName } });
  fireEvent.change(screen.getByLabelText(/Field Definition/i), { target: { value: variables.fieldDefinition } });

  const createFieldSpy = jest.spyOn({ mockCreateEnterpriseField }, 'mockCreateEnterpriseField').mockImplementation((...args) => {
    return { data: { CreateEnterpriseField: [variables] } };
  });
  // Submit the form
  fireEvent.click(screen.getByText(/Submit/i));

  createFieldSpy.mockRestore();
});

it('should log an error when form submission fails', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const variables = {
    fieldMasterId: 678,
    dialectCode: "en_us",
    fieldName: 'Test Field',
    fieldDefinition: 'This is a test field',
    enterpriseFieldInd: false,
    fieldMasterInUseInd: true,
  };

  useMutation.mockReturnValue([mockCreateEnterpriseField, { data: null, loading: false, error: null }]);
  render(<CreateFieldMasterObject location={{ pathname: '/createmasterobject/field' }} />);

  // Check if the form is rendered
  expect(screen.getByLabelText('Dialect Code')).toBeInTheDocument();

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Field Name/i), { target: { value: variables.fieldName } });
  fireEvent.change(screen.getByLabelText(/Field Definition/i), { target: { value: variables.fieldDefinition } });

  const createFieldSpy = jest.spyOn({ mockCreateEnterpriseField }, 'mockCreateEnterpriseField').mockImplementation((...args) => {
    throw new Error('Submission failed');
  });
  // Submit the form
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  fireEvent.click(screen.getByText(/Submit/i));
  expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting form:', expect.any(Error));
  createFieldSpy.mockRestore();
});

it('renders CreateFieldMasterObject and deletes a rule', async () => {
  const mockConfirm = jest.fn().mockReturnValue(true);
  const mockCreateField = jest.fn();
  const mockRemoveRuleFromEnterpriseField = jest.fn();

  useMutation
    .mockReturnValueOnce([mockCreateField, { data: null, loading: false, error: null }])
    .mockReturnValueOnce([mockRemoveRuleFromEnterpriseField, { data: null, loading: false, error: null }]);

  render(<CreateFieldMasterObject confirmFunction={mockConfirm} location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdate }} />);

  expect(screen.getByLabelText('Field Master ID')).toHaveValue('682');
  expect(screen.getByLabelText('Field Name')).toHaveValue('test682');
  expect(screen.getByLabelText('Field Definition')).toHaveValue('testDefinition');
  // expect(screen.getByLabelText('Enterprise Field Indicator').value).toBe('true');
  // expect(screen.getByLabelText('Field Master In-Use Indicator').value).toBe('true');

  // Delete the rule
  await act(async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
    fireEvent.click(screen.getByText(/Delete/i));
  });
  useMutation
    .mockReturnValueOnce([mockCreateField, { data: null, loading: false, error: null }])
    .mockReturnValueOnce([mockRemoveRuleFromEnterpriseField, { data: { 'RemoveRuleFromEnterpriseField': { status: test } }, loading: false, error: null }]);

  render(<CreateFieldMasterObject confirmFunction={mockConfirm} location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdate }} />);
});

it('renders CreateFieldMasterObject and add a rule', async () => {
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdateWithoutRule }} />);

  // Add the rule
  fireEvent.click(screen.getByText(/Add/i));

  // change Rule Validation Code
  fireEvent.change(screen.getByLabelText('Validation Code'), { target: { name: 'type', value: '1' } });

  //   // Wait for the success message
  //   await waitFor(() => {
  //     expect(screen.getByText(/Deleted successfully: 1/i)).toBeInTheDocument();
  //   });
});

it('renders CreateFieldMasterObject and submits form', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const variables = {
    fieldMasterId: 678,
    dialectCode: "en_us",
    fieldName: 'Test Field',
    fieldDefinition: 'This is a test field',
    enterpriseFieldInd: false,
    fieldMasterInUseInd: true,
  };
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
  useMutation
    .mockReturnValueOnce([mockCreateEnterpriseField, { data: { CreateEnterpriseField: [variables] }, loading: false, error: null }]);
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field' }} />);
});

it('renders CreateFieldMasterObject and after delete rule', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const mockRemoveRuleFromEnterpriseField = jest.fn().mockResolvedValue({ data: null });

  useMutation
    .mockReturnValueOnce([mockCreateEnterpriseField, { data: null, loading: false, error: null }])
    .mockReturnValueOnce([mockRemoveRuleFromEnterpriseField, { data: { RemoveRuleFromEnterpriseField: { status: true } }, loading: false, error: null }]);

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
  const mockConfirm = jest.fn().mockReturnValue(true);
  render(<CreateFieldMasterObject confirmFunction={mockConfirm} location={{ pathname: '/updatemasterobject/field' }} />);
});

it('renders CreateFieldMasterObject and do not want to delete rule', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const mockRemoveRuleFromEnterpriseField = jest.fn().mockResolvedValue({ data: null });

  useMutation
    .mockReturnValueOnce([mockCreateEnterpriseField, { data: null, loading: false, error: null }])
    .mockReturnValueOnce([mockRemoveRuleFromEnterpriseField, { data: null, loading: false, error: null }]);

  const mockConfirm = jest.fn().mockReturnValue(false);
  render(<CreateFieldMasterObject confirmFunction={mockConfirm} location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdate }} />);
  act(() => {
    fireEvent.click(screen.getByText(/Delete/i));
  });
});

it('renders CreateFieldMasterObject and encounter an error when attempting to delete a rule.', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const mockRemoveRuleFromEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const errorMessage = 'test delete error';
  useMutation
    .mockReturnValueOnce([mockCreateEnterpriseField, { data: null, loading: false, error: null }])
    .mockReturnValueOnce([mockRemoveRuleFromEnterpriseField, { data: null, loading: false, error: errorMessage }]);

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field' }} />);
  expect(alertSpy).toHaveBeenCalledWith(errorMessage);
});

it('renders UpdateFieldMasterObject and fieldData is empty', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const mockRemoveRuleFromEnterpriseField = jest.fn().mockResolvedValue({ data: null });

  useMutation
    .mockReturnValueOnce([mockCreateEnterpriseField, { data: null, loading: false, error: null }])
    .mockReturnValueOnce([mockRemoveRuleFromEnterpriseField, { data: null, loading: false, error: null }]);

  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: {} }} />);
});

it('should navigate to the correct route when back button is clicked', () => {
  const navigate = useNavigate();
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: {} }} />);

  fireEvent.click(screen.getByText(/Back/i));

  expect(navigate).toHaveBeenCalledWith('/', { state: { tabKey: 'viewFieldMaster' } });
});