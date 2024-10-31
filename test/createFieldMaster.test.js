import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CreateFieldMasterObject from '../app/components/createobject/createFieldMaster';
import { BrowserRouter as Router } from 'react-router-dom';
import { gql } from '@apollo/client';

const CREATE_ENTERPRISE_FIELD = gql`
  mutation CreateEnterpriseField(
    $fieldName: String!
    $fieldDefinition: String!
    $dialectCode: DialectCodes!
    $fieldMasterInUseInd: Boolean!
    $enterpriseFieldInd: Boolean!
    $rule: FieldMasterRule
  ) {
    CreateEnterpriseField(field: {
      dialectCode: $dialectCode, 
      enterpriseFieldInd: $enterpriseFieldInd, 
      fieldDefinition: $fieldDefinition, 
      fieldMasterInUseInd: $fieldMasterInUseInd, 
      fieldName: $fieldName
      rule: $rule
    }) {
      fieldMasterId
      fieldName
    }
  }
`;

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
        rule: {
          validationRuleCode: 'RULE_CODE',
          validationErrorCode: 'ERROR_CODE',
          mandatoryRuleInd: 'true',
          description: {
            shortDescription: 'Short Description',
            longDescription: 'Long Description',
          },
          ruleGroupNumber: 1,
        },
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
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router>
        <CreateFieldMasterObject location={{ pathname: '/createmasterobject/field', state: null }} />
      </Router>
    </MockedProvider>
  );

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Dialect code/i), { target: { value: 'us_en' } });
  fireEvent.change(screen.getByLabelText(/Field Name/i), { target: { value: 'Test Field' } });
  fireEvent.change(screen.getByLabelText(/Field Definition/i), { target: { value: 'Test Definition' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Submit/i));

  // Wait for the mutation to complete
  await waitFor(() => {
    expect(screen.getByText(/Field Master added successfully!/i)).toBeInTheDocument();
  });
});
