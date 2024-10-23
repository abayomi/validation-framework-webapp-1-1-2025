const data = {
    "data": {
        "FetchObjectMetaData": [
            {
                "objectMasterId": "1",
                "objectName": "1111111Asset Rental Offering",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Dealer Assign Number",
                        "fieldMasterId": "1",
                        "fieldMasterName": "dan",
                        "fieldName": "dlr_asgn_no",
                        "fieldXrefId": "1",
                        "rules": [
                            {
                                "id": "1",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "26",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "1",
                                        "type": "2",
                                        "value": "dlr_asgn_no,corp_cd,cli_no",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Client Number",
                        "fieldMasterId": "2",
                        "fieldMasterName": "cli_no",
                        "fieldName": "cli_no",
                        "fieldXrefId": "2",
                        "rules": [
                            {
                                "id": "2",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "27",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "3",
                                        "type": "2",
                                        "value": "cli_no,corp_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Corp Code",
                        "fieldMasterId": "3",
                        "fieldMasterName": "corp_cd",
                        "fieldName": "corp_cd",
                        "fieldXrefId": "3",
                        "rules": [
                            {
                                "id": "3",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "5",
                                        "type": "1",
                                        "value": "^(FA|CA|MX)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Breakdown",
                        "fieldMasterId": "4",
                        "fieldMasterName": "bkdn",
                        "fieldName": "rntl_bkdn",
                        "fieldXrefId": "4",
                        "rules": [
                            {
                                "id": "4",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "28",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "6",
                                        "type": "2",
                                        "value": "bkdn,corp_cd,cli_no",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "rntl_start_dt",
                        "fieldXrefId": "6",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "rntl_start_tm",
                        "fieldXrefId": "7",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "rntl_end_dt",
                        "fieldXrefId": "8",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "rntl_end_tm",
                        "fieldXrefId": "9",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "rntl_future_end_dt",
                        "fieldXrefId": "10",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "rntl_future_end_tm",
                        "fieldXrefId": "11",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Spin Asset Id",
                        "fieldMasterId": "8",
                        "fieldMasterName": "spin_asset_id",
                        "fieldName": "spin_asset_id",
                        "fieldXrefId": "12",
                        "rules": [
                            {
                                "id": "8",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "29",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "12",
                                        "type": "2",
                                        "value": "spin_asset_id,corp_cd,cli_no",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Client Number",
                        "fieldMasterId": "2",
                        "fieldMasterName": "cli_no",
                        "fieldName": "rntl_client_no",
                        "fieldXrefId": "13",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Corp Code",
                        "fieldMasterId": "3",
                        "fieldMasterName": "corp_cd",
                        "fieldName": "rntl_corp_cd",
                        "fieldXrefId": "14",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "objectMasterId": "2",
                "objectName": "Asset Reservation",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Dealer Assign Number",
                        "fieldMasterId": "1",
                        "fieldMasterName": "dan",
                        "fieldName": "dlr_asgn_no",
                        "fieldXrefId": "15",
                        "rules": [
                            {
                                "id": "1",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "26",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "1",
                                        "type": "2",
                                        "value": "dlr_asgn_no,corp_cd,cli_no",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Client Number",
                        "fieldMasterId": "2",
                        "fieldMasterName": "cli_no",
                        "fieldName": "cli_no",
                        "fieldXrefId": "16",
                        "rules": [
                            {
                                "id": "2",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "27",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "3",
                                        "type": "2",
                                        "value": "cli_no,corp_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Corp Code",
                        "fieldMasterId": "3",
                        "fieldMasterName": "corp_cd",
                        "fieldName": "corp_cd",
                        "fieldXrefId": "17",
                        "rules": [
                            {
                                "id": "3",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "5",
                                        "type": "1",
                                        "value": "^(FA|CA|MX)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "resrv_start_dt",
                        "fieldXrefId": "18",
                        "rules": [
                            {
                                "id": "6",
                                "type": "1",
                                "isMandatory": false,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "10",
                                        "type": "1",
                                        "value": "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "resrv_start_tm",
                        "fieldXrefId": "19",
                        "rules": [
                            {
                                "id": "7",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "11",
                                        "type": "1",
                                        "value": "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])?$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "resrv_creation_dt",
                        "fieldXrefId": "20",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "resrv_creation_tm",
                        "fieldXrefId": "21",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "resrv_end_dt",
                        "fieldXrefId": "22",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "resrv_end_tm",
                        "fieldXrefId": "23",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "resrv_stat_dt",
                        "fieldXrefId": "24",
                        "rules": [
                            {
                                "id": "6",
                                "type": "1",
                                "isMandatory": false,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "10",
                                        "type": "1",
                                        "value": "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "resrv_stat_tm",
                        "fieldXrefId": "25",
                        "rules": [
                            {
                                "id": "7",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "11",
                                        "type": "1",
                                        "value": "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])?$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "scheduled_end_dt",
                        "fieldXrefId": "26",
                        "rules": [
                            {
                                "id": "6",
                                "type": "1",
                                "isMandatory": false,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "10",
                                        "type": "1",
                                        "value": "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "scheduled_end_tm",
                        "fieldXrefId": "27",
                        "rules": [
                            {
                                "id": "7",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "11",
                                        "type": "1",
                                        "value": "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])?$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "scheduled_start_dt",
                        "fieldXrefId": "28",
                        "rules": [
                            {
                                "id": "6",
                                "type": "1",
                                "isMandatory": false,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "10",
                                        "type": "1",
                                        "value": "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "scheduled_start_tm",
                        "fieldXrefId": "29",
                        "rules": [
                            {
                                "id": "7",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "11",
                                        "type": "1",
                                        "value": "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])?$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "objectMasterId": "3",
                "objectName": "Asset Data",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "model_yr",
                        "fieldXrefId": "30",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "client_contact_level",
                        "fieldXrefId": "31",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "combined_weight",
                        "fieldXrefId": "32",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "curb_weight",
                        "fieldXrefId": "33",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "do_not_repair_ind",
                        "fieldXrefId": "34",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dot_unit_number",
                        "fieldXrefId": "35",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ep_migrated_assets",
                        "fieldXrefId": "36",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ffc_phh_ownership_in",
                        "fieldXrefId": "37",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "group_id",
                        "fieldXrefId": "38",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ifta_service_ind",
                        "fieldXrefId": "39",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "jci_contract_number",
                        "fieldXrefId": "40",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "make",
                        "fieldXrefId": "41",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "master_id",
                        "fieldXrefId": "42",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "model",
                        "fieldXrefId": "43",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "number_of_axles",
                        "fieldXrefId": "44",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "owner_name_non_lse",
                        "fieldXrefId": "45",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "profile_name",
                        "fieldXrefId": "46",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "profile_number",
                        "fieldXrefId": "47",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "revised_fuel_cap",
                        "fieldXrefId": "48",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "schedule_id",
                        "fieldXrefId": "49",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vehicle_service_ind",
                        "fieldXrefId": "50",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_decode_id",
                        "fieldXrefId": "51",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_decode_make",
                        "fieldXrefId": "52",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_decode_model",
                        "fieldXrefId": "53",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_decode_provider_id",
                        "fieldXrefId": "54",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "engine_type_cd",
                        "fieldXrefId": "55",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "engine_kw",
                        "fieldXrefId": "56",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "fuel_type_cd_1",
                        "fieldXrefId": "57",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "fuel_type_cd_2",
                        "fieldXrefId": "58",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "battery_type_cd",
                        "fieldXrefId": "59",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "battery_amps",
                        "fieldXrefId": "60",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "battery_voltage",
                        "fieldXrefId": "61",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "battery_kwh",
                        "fieldXrefId": "62",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "charger_type_cd",
                        "fieldXrefId": "63",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "charger_power_kw",
                        "fieldXrefId": "64",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "all_electric_range",
                        "fieldXrefId": "65",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "objectMasterId": "4",
                "objectName": "mast_unit",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "client_no",
                        "fieldXrefId": "66",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "corp_cd",
                        "fieldXrefId": "67",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "unit_no",
                        "fieldXrefId": "68",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cli_ast_no",
                        "fieldXrefId": "69",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "repl_client_no",
                        "fieldXrefId": "70",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "repl_unit_no",
                        "fieldXrefId": "71",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "repl_cli_ast_no",
                        "fieldXrefId": "72",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cur_evt_seq_no",
                        "fieldXrefId": "73",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cur_evt",
                        "fieldXrefId": "74",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cur_evt_dt_c",
                        "fieldXrefId": "75",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cur_evt_dt_yr",
                        "fieldXrefId": "76",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cur_evt_dt_mo",
                        "fieldXrefId": "77",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cur_evt_dt_da",
                        "fieldXrefId": "78",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "reqsn_no",
                        "fieldXrefId": "79",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cont_typ_cd",
                        "fieldXrefId": "80",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "mo_reqd",
                        "fieldXrefId": "81",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "emr_ind",
                        "fieldXrefId": "82",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_cert_st",
                        "fieldXrefId": "83",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "bkdn",
                        "fieldXrefId": "84",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_own",
                        "fieldXrefId": "85",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_co_nm",
                        "fieldXrefId": "86",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_own_1st",
                        "fieldXrefId": "87",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_own_mi",
                        "fieldXrefId": "88",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_own_midrest",
                        "fieldXrefId": "89",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_own_lst",
                        "fieldXrefId": "90",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_addr1",
                        "fieldXrefId": "91",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_addr2",
                        "fieldXrefId": "92",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_city",
                        "fieldXrefId": "93",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_cnty",
                        "fieldXrefId": "94",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_st",
                        "fieldXrefId": "95",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_zip",
                        "fieldXrefId": "96",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_no",
                        "fieldXrefId": "97",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_loc",
                        "fieldXrefId": "98",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_iss_dt_c",
                        "fieldXrefId": "99",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_iss_dt_yr",
                        "fieldXrefId": "100",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_iss_dt_mo",
                        "fieldXrefId": "101",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ttl_iss_dt_da",
                        "fieldXrefId": "102",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "tag_no",
                        "fieldXrefId": "103",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "tag_iss_st",
                        "fieldXrefId": "104",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "reg_xpir_dt_c",
                        "fieldXrefId": "105",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "reg_xpir_dt_yr",
                        "fieldXrefId": "106",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "reg_xpir_dt_mo",
                        "fieldXrefId": "107",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "reg_xpir_dt_da",
                        "fieldXrefId": "108",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_decode_stat_cd",
                        "fieldXrefId": "109",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cli_drv_no",
                        "fieldXrefId": "110",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vndr_market_id",
                        "fieldXrefId": "111",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "uvc",
                        "fieldXrefId": "112",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "group_cd",
                        "fieldXrefId": "113",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "drv_strt_dt_c",
                        "fieldXrefId": "114",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "drv_strt_dt_yr",
                        "fieldXrefId": "115",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "drv_strt_dt_mo",
                        "fieldXrefId": "116",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "drv_strt_dt_da",
                        "fieldXrefId": "117",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dlr_asgn_no",
                        "fieldXrefId": "118",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "fac_ord_no",
                        "fieldXrefId": "119",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_1st_9",
                        "fieldXrefId": "120",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_10_11",
                        "fieldXrefId": "121",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vin_lst_6",
                        "fieldXrefId": "122",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "phh_ast_id",
                        "fieldXrefId": "123",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "invy_sta_ind",
                        "fieldXrefId": "124",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "prod_clas",
                        "fieldXrefId": "125",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "prod_line",
                        "fieldXrefId": "126",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "mod_yr",
                        "fieldXrefId": "127",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "nmpl",
                        "fieldXrefId": "128",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "series",
                        "fieldXrefId": "129",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "model",
                        "fieldXrefId": "130",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "mod_cd",
                        "fieldXrefId": "131",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "cyl",
                        "fieldXrefId": "132",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "pwr_seat_cd",
                        "fieldXrefId": "133",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "pwr_str_cd",
                        "fieldXrefId": "134",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "pwr_brk_cd",
                        "fieldXrefId": "135",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "pwr_lck_cd",
                        "fieldXrefId": "136",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "pwr_wndw_cd",
                        "fieldXrefId": "137",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "tnt_gls_cd",
                        "fieldXrefId": "138",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "crz_cntrl_cd",
                        "fieldXrefId": "139",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "tlt_whl_cd",
                        "fieldXrefId": "140",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "radio_cd",
                        "fieldXrefId": "141",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "trans_typ_cd",
                        "fieldXrefId": "142",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "trans_spds",
                        "fieldXrefId": "143",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "eng_cd",
                        "fieldXrefId": "144",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "doors",
                        "fieldXrefId": "145",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ac_cd",
                        "fieldXrefId": "146",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dfrst_cd",
                        "fieldXrefId": "147",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "vt_cd",
                        "fieldXrefId": "148",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "no_of_comp",
                        "fieldXrefId": "149",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "mfg_sell_dlr",
                        "fieldXrefId": "150",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "sell_dlr_eeo",
                        "fieldXrefId": "151",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "sell_dlr_fee",
                        "fieldXrefId": "152",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "mfg_dlv_dlr",
                        "fieldXrefId": "153",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dlv_dlr_eeo",
                        "fieldXrefId": "154",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dlv_dlr_fee",
                        "fieldXrefId": "155",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dlv_phh_dlr_no",
                        "fieldXrefId": "156",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "sel_phh_dlr_no",
                        "fieldXrefId": "157",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dlv_dlr_dlan",
                        "fieldXrefId": "158",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "dlv_typ",
                        "fieldXrefId": "159",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "trk_key_no",
                        "fieldXrefId": "160",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "ign_key_no",
                        "fieldXrefId": "161",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "hvut_cd",
                        "fieldXrefId": "162",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "hp",
                        "fieldXrefId": "163",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "shp_wt",
                        "fieldXrefId": "164",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "gvwr",
                        "fieldXrefId": "165",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "whl_bas",
                        "fieldXrefId": "166",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Passthru - no validation",
                        "fieldMasterId": "9",
                        "fieldMasterName": "Passthru",
                        "fieldName": "brk_cd",
                        "fieldXrefId": "167",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": null,
                                "errorMessage": null,
                                "longDescription": null,
                                "shortDescription": null,
                                "conditions": [
                                    {
                                        "id": null,
                                        "type": null,
                                        "value": null,
                                        "shortDescription": null,
                                        "longDescription": null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "objectMasterId": "5",
                "objectName": "Get Order Response",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Timestamp",
                        "fieldMasterId": "11",
                        "fieldMasterName": "timestamp",
                        "fieldName": "ord_stat_last_update_dt_tm",
                        "fieldXrefId": "168",
                        "rules": [
                            {
                                "id": "10",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "21",
                                        "type": "1",
                                        "value": "^(19\\d{2}|2\\d{3})-((0[13578]|1[02])-([0-2]\\d|3[01])|02-[0-2]\\d|(0[469]|11)-([0-2]\\d|30)) ([01]\\d|2[0-4])(:[0-5]\\d){2}(\\.\\d{3})$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Country Code",
                        "fieldMasterId": "12",
                        "fieldMasterName": "cntry_cd",
                        "fieldName": "bill_to_cntry_cd",
                        "fieldXrefId": "170",
                        "rules": [
                            {
                                "id": "11",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "16",
                                        "type": "1",
                                        "value": "^(US)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Country Code",
                        "fieldMasterId": "12",
                        "fieldMasterName": "cntry_cd",
                        "fieldName": "sold_to_cntry_cd",
                        "fieldXrefId": "172",
                        "rules": [
                            {
                                "id": "11",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "16",
                                        "type": "1",
                                        "value": "^(US)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Country Code",
                        "fieldMasterId": "12",
                        "fieldMasterName": "cntry_cd",
                        "fieldName": "ship_to_cntry_cd",
                        "fieldXrefId": "174",
                        "rules": [
                            {
                                "id": "11",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "16",
                                        "type": "1",
                                        "value": "^(US)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "objectMasterId": "6",
                "objectName": "Invoice Response",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Timestamp",
                        "fieldMasterId": "11",
                        "fieldMasterName": "timestamp",
                        "fieldName": "inv_dt_tm",
                        "fieldXrefId": "176",
                        "rules": [
                            {
                                "id": "10",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "21",
                                        "type": "1",
                                        "value": "^(19\\d{2}|2\\d{3})-((0[13578]|1[02])-([0-2]\\d|3[01])|02-[0-2]\\d|(0[469]|11)-([0-2]\\d|30)) ([01]\\d|2[0-4])(:[0-5]\\d){2}(\\.\\d{3})$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Timestamp",
                        "fieldMasterId": "11",
                        "fieldMasterName": "timestamp",
                        "fieldName": "inv_due_dt",
                        "fieldXrefId": "177",
                        "rules": [
                            {
                                "id": "10",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "21",
                                        "type": "1",
                                        "value": "^(19\\d{2}|2\\d{3})-((0[13578]|1[02])-([0-2]\\d|3[01])|02-[0-2]\\d|(0[469]|11)-([0-2]\\d|30)) ([01]\\d|2[0-4])(:[0-5]\\d){2}(\\.\\d{3})$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Currency Type Code",
                        "fieldMasterId": "13",
                        "fieldMasterName": "currency_typ_cd",
                        "fieldName": "iso_currency_typ_cd",
                        "fieldXrefId": "179",
                        "rules": [
                            {
                                "id": "13",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "20",
                                        "type": "1",
                                        "value": "^(USD)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Country Code",
                        "fieldMasterId": "12",
                        "fieldMasterName": "cntry_cd",
                        "fieldName": "bill_to_cntry_cd",
                        "fieldXrefId": "180",
                        "rules": [
                            {
                                "id": "11",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "16",
                                        "type": "1",
                                        "value": "^(US)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "objectMasterId": "7",
                "objectName": "BTI Rule",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Corp Code",
                        "fieldMasterId": "3",
                        "fieldMasterName": "corp_cd",
                        "fieldName": "corp_cd",
                        "fieldXrefId": "182",
                        "rules": [
                            {
                                "id": "3",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "5",
                                        "type": "1",
                                        "value": "^(FA|CA|MX)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Client Number",
                        "fieldMasterId": "2",
                        "fieldMasterName": "cli_no",
                        "fieldName": "client_no",
                        "fieldXrefId": "183",
                        "rules": [
                            {
                                "id": "2",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "27",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "3",
                                        "type": "2",
                                        "value": "cli_no,corp_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "ATA Category Code",
                        "fieldMasterId": "14",
                        "fieldMasterName": "ata_ctgy_cd",
                        "fieldName": "ata_cat_cd",
                        "fieldXrefId": "184",
                        "rules": [
                            {
                                "id": "14",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "35",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "34",
                                        "type": "2",
                                        "value": "ata_ctgy_cd,ata_sub_ctgy_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "bti_rule_eff_from_dt",
                        "fieldXrefId": "185",
                        "rules": [
                            {
                                "id": "6",
                                "type": "1",
                                "isMandatory": false,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "10",
                                        "type": "1",
                                        "value": "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "bti_rule_eff_from_tm",
                        "fieldXrefId": "186",
                        "rules": [
                            {
                                "id": "7",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "11",
                                        "type": "1",
                                        "value": "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])?$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Date",
                        "fieldMasterId": "6",
                        "fieldMasterName": "date",
                        "fieldName": "bti_rule_eff_to_dt",
                        "fieldXrefId": "187",
                        "rules": [
                            {
                                "id": "6",
                                "type": "1",
                                "isMandatory": false,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "10",
                                        "type": "1",
                                        "value": "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Time",
                        "fieldMasterId": "7",
                        "fieldMasterName": "time",
                        "fieldName": "bti_rule_eff_to_tm",
                        "fieldXrefId": "188",
                        "rules": [
                            {
                                "id": "7",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "11",
                                        "type": "1",
                                        "value": "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])?$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "YN indicator",
                        "fieldMasterId": "16",
                        "fieldMasterName": "YN indicator",
                        "fieldName": "is_tax",
                        "fieldXrefId": "189",
                        "rules": [
                            {
                                "id": "16",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "32",
                                        "type": "1",
                                        "value": "^[YNyn]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "YN indicator",
                        "fieldMasterId": "16",
                        "fieldMasterName": "YN indicator",
                        "fieldName": "is_taxable",
                        "fieldXrefId": "190",
                        "rules": [
                            {
                                "id": "16",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "32",
                                        "type": "1",
                                        "value": "^[YNyn]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "YN indicator",
                        "fieldMasterId": "16",
                        "fieldMasterName": "YN indicator",
                        "fieldName": "ovrd_chrg_cd_ind",
                        "fieldXrefId": "191",
                        "rules": [
                            {
                                "id": "16",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "32",
                                        "type": "1",
                                        "value": "^[YNyn]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "YN indicator",
                        "fieldMasterId": "16",
                        "fieldMasterName": "YN indicator",
                        "fieldName": "ovrd_bkdn_ind",
                        "fieldXrefId": "192",
                        "rules": [
                            {
                                "id": "16",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "32",
                                        "type": "1",
                                        "value": "^[YNyn]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Active indicator",
                        "fieldMasterId": "17",
                        "fieldMasterName": "Active indicator",
                        "fieldName": "bti_rule_stat_cd",
                        "fieldXrefId": "193",
                        "rules": [
                            {
                                "id": "17",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "33",
                                        "type": "1",
                                        "value": "^[IAia]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "ATA Sub Category Code",
                        "fieldMasterId": "15",
                        "fieldMasterName": "ata_sub_ctgy_cd",
                        "fieldName": "ata_sub_cat_cd",
                        "fieldXrefId": "202",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "35",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "34",
                                        "type": "2",
                                        "value": "ata_ctgy_cd,ata_sub_ctgy_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "objectMasterId": "8",
                "objectName": "BTI Override",
                "fields": [
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Corp Code",
                        "fieldMasterId": "3",
                        "fieldMasterName": "corp_cd",
                        "fieldName": "corp_cd",
                        "fieldXrefId": "194",
                        "rules": [
                            {
                                "id": "3",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "5",
                                        "type": "1",
                                        "value": "^(FA|CA|MX)$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Client Number",
                        "fieldMasterId": "2",
                        "fieldMasterName": "cli_no",
                        "fieldName": "client_no",
                        "fieldXrefId": "195",
                        "rules": [
                            {
                                "id": "2",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "27",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "3",
                                        "type": "2",
                                        "value": "cli_no,corp_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "ATA Category Code",
                        "fieldMasterId": "14",
                        "fieldMasterName": "ata_ctgy_cd",
                        "fieldName": "ata_cat_cd",
                        "fieldXrefId": "196",
                        "rules": [
                            {
                                "id": "14",
                                "type": "2",
                                "isMandatory": true,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "35",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "34",
                                        "type": "2",
                                        "value": "ata_ctgy_cd,ata_sub_ctgy_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "ATA Sub Category Code",
                        "fieldMasterId": "15",
                        "fieldMasterName": "ata_sub_ctgy_cd",
                        "fieldName": "ata_sub_cat_cd",
                        "fieldXrefId": "197",
                        "rules": [
                            {
                                "id": null,
                                "type": null,
                                "isMandatory": null,
                                "errorCode": "2",
                                "errorMessage": "%f",
                                "longDescription": "Call to enterprise API to validation value",
                                "shortDescription": "Rest API Call",
                                "conditions": [
                                    {
                                        "id": "35",
                                        "type": "3",
                                        "value": "enterprise-apis-cache-service",
                                        "shortDescription": "API Id",
                                        "longDescription": "API Unique Id"
                                    },
                                    {
                                        "id": "34",
                                        "type": "2",
                                        "value": "ata_ctgy_cd,ata_sub_ctgy_cd",
                                        "shortDescription": "API Parameters",
                                        "longDescription": "API query parameters name"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "Active indicator",
                        "fieldMasterId": "17",
                        "fieldMasterName": "Active indicator",
                        "fieldName": "bti_rule_stat_cd",
                        "fieldXrefId": "198",
                        "rules": [
                            {
                                "id": "17",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "33",
                                        "type": "1",
                                        "value": "^[IAia]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "YN indicator",
                        "fieldMasterId": "16",
                        "fieldMasterName": "YN indicator",
                        "fieldName": "bti_rule_chrg_ind",
                        "fieldXrefId": "199",
                        "rules": [
                            {
                                "id": "16",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "32",
                                        "type": "1",
                                        "value": "^[YNyn]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "YN indicator",
                        "fieldMasterId": "16",
                        "fieldMasterName": "YN indicator",
                        "fieldName": "bti_rule_bkdn_ind",
                        "fieldXrefId": "200",
                        "rules": [
                            {
                                "id": "16",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "32",
                                        "type": "1",
                                        "value": "^[YNyn]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "enterpriseFieldInd": true,
                        "fieldMasterDefinition": "YN indicator",
                        "fieldMasterId": "16",
                        "fieldMasterName": "YN indicator",
                        "fieldName": "is_taxable",
                        "fieldXrefId": "201",
                        "rules": [
                            {
                                "id": "16",
                                "type": "1",
                                "isMandatory": true,
                                "errorCode": "1",
                                "errorMessage": "%f Value is invalid",
                                "longDescription": "Regex expression",
                                "shortDescription": "Regex",
                                "conditions": [
                                    {
                                        "id": "32",
                                        "type": "1",
                                        "value": "^[YNyn]$",
                                        "shortDescription": "Regex",
                                        "longDescription": "Regex expression"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export default data;