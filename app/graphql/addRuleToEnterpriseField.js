import { gql } from '@apollo/client';

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
      id
      isMandatory
      type
      }
  }
}
`;