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
  `
};

export default graphqlForObjectMaster;