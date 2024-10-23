import {gql} from '@apollo/client'

export const loadFetchObjectMasterList = gql`
query MyQuery {
  FetchObjectMasterList(dialectCode: us_en) {
    objectMasterId
    objectName
  }
}
`;

export const loadFetchFieldMetaData = gql`
query MyQuery {
  FetchFieldMetaData(dialectCode: us_en) {
    fieldName
    fieldMasterId
    fieldMasterInUseInd
    fieldDefinition
    enterpriseFieldInd
    rules {
      id
      isMandatory
      longDescription
      shortDescription
      type
      errorMessage
      errorCode
      conditions {
        id
        longDescription
        shortDescription
        type
        value
      }
    }
  }
}
`;

