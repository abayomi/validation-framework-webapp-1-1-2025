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

export const ADD_RULE_TO_ENTERPRISE_FIELD = gql`
mutation AddRuleToEnterpriseField(
  $fieldMasterId: ID!
  $dialectCode: DialectCodes!
  $validationRuleCode: ID!
  $validationErrorCode: ID!
  $mandatoryRuleInd: Boolean!
  $description: FieldMasterRuleDescription!
  $ruleGroupNumber: Int!
  $condition: [FieldMasterRuleCondition!]
) {
  AddRuleToEnterpriseField(rule: {
    fieldMasterId: $fieldMasterId, 
    dialectCode: $dialectCode, 
    validationRuleCode: $validationRuleCode, 
    validationErrorCode: $validationErrorCode, 
    mandatoryRuleInd: $mandatoryRuleInd
    description: $description
    ruleGroupNumber: $ruleGroupNumber
    condition: $condition
  }) {
    fieldMasterId
    fieldName
    fieldDefinition
    rules {
      conditions {
          id
          type
          value
      }
      errorCode
      errorMessage
      longDescription
      shortDescription
      ruleGroupNumber
      id
      isMandatory
      type
      }
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

