import { gql } from '@apollo/client';

export const CREATE_ENTERPRISE_FIELD = gql`
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
    fieldDefinition
  }
}
`;

export const REMOVE_RULE_FROM_ENTERPRISE_FIELD = gql`
mutation RemoveRuleFromEnterpriseField($field_valid_rule_id: Int!) {
  RemoveRuleFromEnterpriseField(field_valid_rule_id: $field_valid_rule_id) {
    status
  }
}
`;

