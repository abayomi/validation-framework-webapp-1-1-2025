import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateFieldMasterObject from '../app/components/createobject/createFieldMaster';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import '@testing-library/jest-dom';
import { useMutation } from '@apollo/client';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

jest.mock('../app/graphql/fieldMasterMutations', () => ({
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

const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
const mockMutationFunction = jest.fn();

it('renders CreateFieldMasterObject and submits form', async () => {
  const variables = {
    dialectCode: "us_en",
    fieldName: 'Test Field',
    fieldDefinition: 'This is a test field',
    enterpriseFieldInd: true,
    fieldMasterInUseInd: true,
  };
  useMutation.mockImplementation((query) => {
    const [attributes, setAttributes] = useState({});

    const useMutationMock = ({ variables: passedVariables } = {}) => {
      console.log(passedVariables);
      setAttributes({
        data: {
          CreateEnterpriseField: [passedVariables]
        }
      })
    };
    return [useMutationMock, attributes];
  });
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

  render(<CreateFieldMasterObject location={{ pathname: '/createmasterobject/field' }} />);

  // Check if the form is rendered
  expect(screen.getByLabelText(/Dialect Code \*/i)).toBeInTheDocument();

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Field Name/i), { target: { value: variables.fieldName } });
  fireEvent.change(screen.getByLabelText(/Field Definition/i), { target: { value: variables.fieldDefinition } });
  fireEvent.click(screen.getByLabelText(/Enterprise Field Indicator/i));

  await act(async () => {
   // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));
  });

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith('Field Master added successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('/updatemasterobject/field', expect.anything());
    expect(screen.getByLabelText(/Field Name/i)).toHaveValue(variables.fieldName);
    expect(screen.getByLabelText(/Field Definition/i)).toHaveValue(variables.fieldDefinition);
    expect(screen.getByLabelText(/Enterprise Field Indicator/i)).toBeChecked();
    expect(screen.getByLabelText(/Field Master In-Use Indicator/i)).toBeChecked();
  });
  
  alertSpy.mockRestore();
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
  expect(screen.getByLabelText(/Dialect Code \*/i)).toBeInTheDocument();

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Field Name/i), { target: { value: variables.fieldName } });
  fireEvent.change(screen.getByLabelText(/Field Definition/i), { target: { value: variables.fieldDefinition } });

  const createFieldSpy = jest.spyOn({ mockCreateEnterpriseField }, 'mockCreateEnterpriseField').mockImplementation((...args) => {
    throw new Error('Submission failed');
  });
  // Submit the form
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  await act(async () => {
    fireEvent.click(screen.getByText(/Submit/i));
  });
  expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting form:', expect.any(Error));
  createFieldSpy.mockRestore();
  consoleErrorSpy.mockRestore();
});

it('renders updateMasterObject and add a rule then delete', async () => {
  useMutation.mockReturnValue([mockMutationFunction, { data: null, loading: false, error: null }]);
  const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdateWithoutRule }} />);

  // Add the rule
  fireEvent.click(screen.getByText(/Add Rules/i));

  await waitFor(() => {
    expect(screen.getByText(/Rule - New/i)).toBeInTheDocument();
  });

  const buttonElements = screen.getAllByRole('button');
  const deleteButtons = buttonElements.filter(button => button.textContent === 'Delete');
  expect(deleteButtons.length).toBe(1);

  // Delete the rule
  await act(async () => {
    fireEvent.click(deleteButtons[0]);
  });
  await waitFor(async () => {
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this rule?');
  });

  const buttonElementsAfterDelete = screen.getAllByRole('button');
  const deleteButtonsAfterDelete = buttonElementsAfterDelete.filter(button => button.textContent === 'Delete');
  expect(deleteButtonsAfterDelete.length).toBe(0);
  confirmSpy.mockRestore();
});

it('Without EnterpriseFieldInd is valid', () => {
  useMutation.mockReturnValue([mockMutationFunction, { data: null, loading: false, error: null }]);

  const variables = {
    'fieldMasterId': 682,
    'fieldName': 'test682',
    'fieldDefinition': 'testDefinition',
    'dialectCode': 'us_en',
  };

  const mockFieldUpdateWithoutEnterpriseFieldInd = {
    updateFieldData: variables
  };
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdateWithoutEnterpriseFieldInd }} />);
});

it('should render the checkbox', () => {
  useMutation.mockReturnValue([mockMutationFunction, { data: null, loading: false, error: null }]);
  const variables = {
    'fieldMasterId': 682,
    'fieldName': 'test682',
    'fieldDefinition': 'testDefinition',
    'dialectCode': 'us_en',
  };
  const mockFieldUpdateWithoutEnterpriseFieldInd = {
    updateFieldData: variables
  };
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdateWithoutEnterpriseFieldInd }} />);
  const checkbox = screen.getByLabelText(/Enterprise Field Indicator/i);
  expect(checkbox).not.toBeChecked();
  expect(checkbox).toBeDisabled();
  const checkboxInUse = screen.getByLabelText(/Field Master In-Use Indicator/i);
  expect(checkboxInUse).not.toBeChecked();
});

it('renders CreateFieldMasterObject and do not want to delete rule', async () => {
  useMutation.mockReturnValue([mockMutationFunction, { data: null, loading: false, error: null }]);

  const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => false);
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdate }} />);
  expect(screen.getByText(/Delete/i)).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByText(/Delete/i));
  });

  waitFor(() => {
    expect(confirmSpy).toHaveBeenCalledWith();
  });
  confirmSpy.mockRestore();
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
  alertSpy.mockRestore();
});

it('renders UpdateFieldMasterObject and fieldData is empty', async () => {
  const mockCreateEnterpriseField = jest.fn().mockResolvedValue({ data: null });
  const mockRemoveRuleFromEnterpriseField = jest.fn().mockResolvedValue({ data: null });

  useMutation
    .mockReturnValueOnce([mockCreateEnterpriseField, { data: null, loading: false, error: null }])
    .mockReturnValueOnce([mockRemoveRuleFromEnterpriseField, { data: null, loading: false, error: null }]);

  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: {} }} />);

  const fieldNameInput = screen.getByRole('textbox', { name: /Field Name \*/i });
  expect(fieldNameInput).toBeInTheDocument();
  expect(fieldNameInput).toHaveValue('');
});

it('should navigate to the correct route when back button is clicked', () => {
  useMutation.mockReturnValue([mockMutationFunction, { data: null, loading: false, error: null }]);
  const confirmSpy = jest.spyOn(window, 'confirm')
    .mockImplementationOnce(() => false)
    .mockImplementationOnce(() => true);
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: {} }} />);


  fireEvent.click(screen.getByText(/Back/i));
  waitFor(() => {
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to return the list page');
  });
  fireEvent.click(screen.getByText(/Back/i));
  waitFor(() => {
    expect(useNavigate).toHaveBeenCalledWith('/', { state: { tabKey: 'viewFieldMaster' } });
  });
  confirmSpy.mockRestore();
});

it('renders UpdateFieldMasterObject and deletes a rule', async () => {
  useMutation.mockImplementation((query) => {
    const [attributes, setAttributes] = useState({});

    const useMutationMock = ({ variables: passedVariables } = {}) => {
      console.log(passedVariables);
      setAttributes({
        data: {
          RemoveRuleFromEnterpriseField: { status: true }
        },
        error: null,
        loading: null
      })
    };
    return [useMutationMock, attributes];
  });

  const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => true);
  render(<CreateFieldMasterObject location={{ pathname: '/updatemasterobject/field', state: mockFieldUpdate }} />);

  const buttonElements = screen.getAllByRole('button');
  const deleteButtons = buttonElements.filter(button => button.textContent === 'Delete');
  expect(deleteButtons.length).toBe(1);

  // Delete the rule
  await act(async () => {
    fireEvent.click(screen.getByText(/Delete/i));
  });

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith('Deleted successfully: 1');
  });

  await act(async () => {
    // Ensure all state updates are processed
    const buttonElementsAfterDelete = screen.getAllByRole('button');
    const deleteButtonsAfterDelete = buttonElementsAfterDelete.filter(button => button.textContent === 'Delete');
    expect(deleteButtonsAfterDelete.length).toBe(0);
  });

  confirmSpy.mockRestore();
  alertSpy.mockRestore();
});
