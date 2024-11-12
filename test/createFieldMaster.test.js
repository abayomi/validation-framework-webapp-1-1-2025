import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateFieldMasterObject from '../app/components/createobject/createFieldMaster';
import { useNavigate } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import { gql } from '@apollo/client';
import { CREATE_ENTERPRISE_FIELD } from '../app/graphql/filedmasterMutations';

jest.mock('../app/graphql/filedmasterMutations', () => ({
  CREATE_ENTERPRISE_FIELD: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: CREATE_ENTERPRISE_FIELD,
      variables: {
        dialectCode: 'us_en',
        fieldName: 'Test Field',
        fieldDefinition: 'Test Definition',
        enterpriseFieldInd: false,
        fieldMasterInUseInd: false,
      },
    },
    result: {
      data: {
        CreateEnterpriseField: {
          fieldMasterId: '1',
          fieldName: 'Test Field',
        },
      },
    },
  },
];

test('renders CreateFieldMasterObject and submits form', async () => {

  CREATE_ENTERPRISE_FIELD.mockResolvedValue({ data: { createEnterpriseField: { id: '1' } } });

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateFieldMasterObject location={{ pathname: '/createmasterobject/field', state: null }} />
    </MockedProvider>
  );
  screen.debug();
  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Dialect Code/i), { target: { value: 'us_en' } });
  fireEvent.change(screen.getByLabelText(/Field Name/i), { target: { value: 'Test Field' } });
  fireEvent.change(screen.getByLabelText(/Field Definition/i), { target: { value: 'Test Definition' } });
  fireEvent.click(screen.getByLabelText(/Enterprise Field Indicator/i));
  fireEvent.click(screen.getByLabelText(/Field Master In-Use Indicator/i));

  fireEvent.click(screen.getByText(/Submit/i));

  await screen.findByText(/Submit/i);

  expect(createEnterpriseField).toHaveBeenCalledWith({
    variables: {
      dialectCode: 'us_en',
      fieldName: 'Test Field',
      fieldDefinition: 'Test Definition',
      enterpriseFieldInd: false,
      fieldMasterInUseInd: false,
    },
  });
});
