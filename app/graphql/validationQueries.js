/* istanbul ignore file */
import {gql} from '@apollo/client';

export const LOAD_VALIDATE_RECORDS = gql`
query MyQuery($batch: Batch!) {
    ValidateRecords(batch: $batch) {
        batchId
        failedCount
        receivedCount
        records {
            fields {
                errorMessage
                name
                status
            }
            recordId
            status
        }
        skippedCount
        status
        successCount
  }
}
`;