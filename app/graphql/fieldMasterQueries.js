/* istanbul ignore file */
import {gql} from '@apollo/client'

export const loadFetchFieldMetaData = gql`
query MyQuery($dialectCode: DialectCodes!) {
  FetchFieldMetaData(dialectCode: $dialectCode) {
    fieldName
    fieldMasterId
    fieldMasterInUseInd
    fieldDefinition
    enterpriseFieldInd
    rules {
      id
      isMandatory
      ruleGroupNumber
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

