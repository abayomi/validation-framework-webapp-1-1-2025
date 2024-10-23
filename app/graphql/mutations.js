import { gql } from '@apollo/client';

export const CREATE_ENTERPRISE_FIELD = gql`
  mutation CreateEnterpriseField(
    $fieldName: String!
    $fieldDefinition: String!
    $dialectCode: DialectCodes!
    $fieldMasterInUseInd: Boolean!
    $enterpriseFieldInd: Boolean!
  ) {
    CreateEnterpriseField(field: {
      dialectCode: $dialectCode, 
      enterpriseFieldInd: $enterpriseFieldInd, 
      fieldDefinition: $fieldDefinition, 
      fieldMasterInUseInd: $fieldMasterInUseInd, 
      fieldName: $fieldName
    }) {
      fieldMasterId
      fieldName
    }
  }
`;