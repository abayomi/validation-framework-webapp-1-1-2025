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
  `
};

export default graphqlForObjectMaster;