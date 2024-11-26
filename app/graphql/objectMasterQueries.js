import {gql} from '@apollo/client'

const graphqlForObjectMaster = {
  FetchObjectMasterList: gql`
    query MyQuery($dialectCode: DialectCodes!) {
      FetchObjectMasterList(dialectCode: $dialectCode) {
        cliRelRequiredInd
        objMasterInUseInd
        objectLabelName
        objectMasterId
        objectName
      }
    }
  `,

  FetchObjectMetaDataByLabel: gql`
    query MyQuery($dialectCode: DialectCodes!, $objectLabelName: String!) {
      FetchObjectMetaDataByLabel(objectLabelName: $objectLabelName, dialectCode: $dialectCode) {
        fields {
          rules {
            conditions {
              id
              longDescription
              shortDescription
              type
              value
            }
            errorCode
            errorMessage
            id
            isMandatory
            ruleGroupNumber
            longDescription
            shortDescription
            type
          }
          enterpriseFieldInd
          fieldMasterDefinition
          fieldMasterId
          fieldMasterName
          fieldName
          fieldXrefId
        }
        objMasterInUseInd
        objectLabelName
        objectMasterId
        objectName
      }
    }
  `,

  CreateValidationObject: gql`
    mutation MyMutation(
      $dialectCode: DialectCodes!
      $objectDefinition: String
      $objectLabelName: String!
      $objectName: String!
      $objectField: [ObjectFieldXref!]
    ) {
      CreateValidationObject(object: {
        objectInUseInd: true, 
        dialectCode: $dialectCode, 
        objectDefinition: $objectDefinition,
        objectLabelName: $objectLabelName,
        objectName: $objectName,
        objectField: $objectField
      }) {
        fields {
          enterpriseFieldInd
          fieldMasterDefinition
          fieldMasterId
          fieldMasterName
          fieldName
          rules {
            errorCode
            errorMessage
            id
            isMandatory
            longDescription
            shortDescription
            type
          }
          fieldXrefId
        }
        objMasterInUseInd
        objectLabelName
        objectMasterId
        objectName
      }
    }
  `,

  DeleteValidationObject: gql`
    mutation MyMutation($field: DeletionObjectFilter!) {
      DeleteValidationObject(field: $field) {
        objectLabelName
        objectMasterId
        objectMasterInUseIndicator
      }
    }
  `,

  RemoveValidationFromObjectField: gql`
    mutation MyMutation($removeValidations: [ObjectFieldValidation!]!) {
      RemoveValidationFromObjectField(
        rules: $removeValidations
      ) {
        objectFieldXrefId
        fieldValidRuleId
        validFromDateTime
        validToDateTime
      }
    }
  `,

  AddValidationToObjectField: gql`
    mutation MyMutation($addValidations: [ObjectFieldValidation!]!) {
      AddValidationToObjectField(
        rules: $addValidations
      ) {
        objectFieldXrefId
        fieldValidRuleId
        validFromDateTime
        validToDateTime
      }
  }
  `,

  AddFieldToObject: gql`
    mutation MyMutation($addFields: [ObjectFieldXrefRecord]!) {
      AddFieldToObject(
        fields: $addFields
      ) {
        objectFieldXrefId
        objectMasterId
        fieldMasterId      
      }
  }
  `,

  RemoveFieldFromObject: gql`
    mutation MyMutation {
        RemoveFieldFromObject(objectFieldXrefIds: ["1197","1198"]) {
        fieldMasterId
        objectFieldXrefId
        objectMasterId
      }
    }
  `,

  UpdateValidationObjectInUseInd: gql`
    mutation MyMutation {
      UpdateValidationObjectInUseInd(field: {objectInUseInd: true, objectMasterId: "232"}) {
        objectMasterId
        objectMasterInUseIndicator
      }
    }
  `,

  UpdateValidationObjectName: gql`
    mutation MyMutation($addField: ValidationObjectName!) {
      UpdateValidationObjectName(field: $addField) {
        objectDefinition
        objectMasterId
        objectName
      }
    }
  `
};

export default graphqlForObjectMaster;