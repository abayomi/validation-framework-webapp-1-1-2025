const mockFieldMasterList = [
    {
        "fieldName": "Subtype",
        "fieldMasterId": "0",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Subtype",
        "enterpriseFieldInd": true,
        "rules": null,
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "dan",
        "fieldMasterId": "1",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Dealer Assign Number",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "1",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Dealer assignment number valid",
            "shortDescription": "DAN valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "166",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "165",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "dan,corp_cd,cli_no",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "cli_no",
        "fieldMasterId": "2",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Client Number",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "2",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Corp code / client number valid",
            "shortDescription": "Corp cd/cli no valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "170",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "3",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "cli_no,corp_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "corp_cd",
        "fieldMasterId": "3",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Corp Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "3",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Corporation code, valid values are: FA, CA, MX",
            "shortDescription": "Corp code (FA/CA/MX)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "5",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(FA|CA|MX)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "bkdn",
        "fieldMasterId": "4",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Breakdown",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "4",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Corp code / client number / breakdown valid",
            "shortDescription": "CC/cli no/bkdn valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "171",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "6",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "bkdn,corp_cd,cli_no",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "date",
        "fieldMasterId": "6",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Date",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "6",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Date (ccyy-mm-dd)",
            "shortDescription": "Date (ccyy-mm-dd)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "10",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "time",
        "fieldMasterId": "7",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Time",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "7",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Time (hh:mm:ss)",
            "shortDescription": "Time (hh:mm:ss)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "11",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])?$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "spin_asset_id",
        "fieldMasterId": "8",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Spin Asset Id",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "8",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "SPIN asset ID valid",
            "shortDescription": "SPIN asset ID valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "37",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "12",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "spin_asset_id",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Passthru",
        "fieldMasterId": "9",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Passthru - no validation",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "18",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Passthru",
            "shortDescription": "Passthru",
            "type": "3",
            "errorMessage": "%f: Value is invalid, based on the function code validation.",
            "errorCode": "3",
            "conditions": [{
                "id": "44",
                "longDescription": "Javascript Function Body",
                "shortDescription": "Function Body",
                "type": "4",
                "value": "return true;",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "model_yr",
        "fieldMasterId": "10",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Model year",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "9",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Model year (ccyy)",
            "shortDescription": "Model year (ccyy)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "14",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^\\d{4}$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "timestamp",
        "fieldMasterId": "11",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Timestamp",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "10",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Timestamp (ccyy-mm-dd hh:mm:ss.zzz)",
            "shortDescription": "Timestamp",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "29",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(19\\d{2}|2\\d{3})-((0[13578]|1[02])-([0-2]\\d|3[01])|02-[0-2]\\d|(0[469]|11)-([0-2]\\d|30)) ([01]\\d|2[0-4])(:[0-5]\\d){2}(\\.\\d{3})$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "cntry_cd",
        "fieldMasterId": "12",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Country Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "11",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Country code (US)",
            "shortDescription": "Country cd (US)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "24",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(US)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "currency_typ_cd",
        "fieldMasterId": "13",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Currency Type Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "13",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Currency code (USD)",
            "shortDescription": "Currency cd (USD)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "28",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(USD)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "ata_ctgy_cd",
        "fieldMasterId": "14",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "ATA Category Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "14",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the ata code table",
            "shortDescription": "ATA cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "172",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "42",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "ata_ctgy_cd,ata_sub_ctgy_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "YN indicator",
        "fieldMasterId": "16",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "YN indicator",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "16",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Y/N indicator",
            "shortDescription": "Y/N ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "40",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[YNyn]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "133",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Active indicator",
        "fieldMasterId": "17",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Active indicator",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "17",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Active indicator (a/A/i/I)",
            "shortDescription": "Active ind (a/A/i/I)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "41",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[IAia]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "spin_psn_id",
        "fieldMasterId": "18",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "SPIN person id",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "19",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Spin person id valid",
            "shortDescription": "Spin_psn_id valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "46",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "45",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "spin_psn_id",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "spin_org_id",
        "fieldMasterId": "19",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "SPIN organization id",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "20",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Spin organization valid",
            "shortDescription": "Spin_org_id valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "48",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "47",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "spin_org_id",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "empl_id",
        "fieldMasterId": "20",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Employee id",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "21",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Employee ID exists",
            "shortDescription": "Employee ID",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "49",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[A-Za-z0-9]{0,50}$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "22",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Spin organization/employee valid",
            "shortDescription": "Empl_id valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "51",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "50",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "empl_id,spin_org_id",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Gender code",
        "fieldMasterId": "21",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Gender code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "23",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Gender code (f/F/m/M)",
            "shortDescription": "Gender cd (f/F/m/M)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "52",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[MFmf]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "empl_veh_elig_cd",
        "fieldMasterId": "22",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Employee vehicle eligibility code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "24",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the employee veh elig code table",
            "shortDescription": "emp veh elg cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "54",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "53",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "empl_veh_elig_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "State/province/district abbr",
        "fieldMasterId": "23",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "State/province/district abbreviation",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "25",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the state province abbr table",
            "shortDescription": "state prv abbr check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "56",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "55",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "st_prov_abbr",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "134",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "empl_stat_cd",
        "fieldMasterId": "24",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Employee status code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "26",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the employee status code table",
            "shortDescription": "empl status cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "58",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "57",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "empl_stat_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "0/1 indicator",
        "fieldMasterId": "25",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "0/1 indicator",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "27",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "0/1 indicator",
            "shortDescription": "0/1 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "59",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[01]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "105",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "psn_role_cd",
        "fieldMasterId": "26",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Person role code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "28",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the person role code table",
            "shortDescription": "person role cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "61",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "60",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "psn_role_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Email address",
        "fieldMasterId": "27",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Email address",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "29",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Email address",
            "shortDescription": "Email address",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "62",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Phone number",
        "fieldMasterId": "28",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Phone number",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "30",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Phone number (10 digits)",
            "shortDescription": "Phone no (10 digits)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "63",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[0-9]{10}$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Postal address",
        "fieldMasterId": "29",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Address validation",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "31",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Postal address valid",
            "shortDescription": "Postal address valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "65",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-addressvalidation",
                "__typename": "RuleCondition"
            }, {
                "id": "64",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "addr_line1,addr_line2,city_nm,st_prov_abbr_cd,postcode,iso_cntry_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Login",
        "fieldMasterId": "30",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Login",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "32",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Login valid (Security 2.5 login profile)",
            "shortDescription": "Login valid",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "67",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-security",
                "__typename": "RuleCondition"
            }, {
                "id": "66",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "login",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "seq_no",
        "fieldMasterId": "31",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Person custom data seq_no",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "33",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Person data sequence number between 1 and 26",
            "shortDescription": "psn data seq no",
            "type": "3",
            "errorMessage": "%f: Value is invalid, based on the function code validation.",
            "errorCode": "3",
            "conditions": [{
                "id": "68",
                "longDescription": "Javascript Function Body",
                "shortDescription": "Function Body",
                "type": "4",
                "value": "return (seq_no >= 1 && seq_no <= 26);",
                "__typename": "RuleCondition"
            }, {
                "id": "70",
                "longDescription": "Argument Parameters",
                "shortDescription": "ARG Params",
                "type": "6",
                "value": "seq_no",
                "__typename": "RuleCondition"
            }, {
                "id": "69",
                "longDescription": "Argument Names",
                "shortDescription": "ARG Names",
                "type": "5",
                "value": "seq_no",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "boolean_val",
        "fieldMasterId": "32",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Boolean",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "34",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Boolean (true/false/TRUE/FALSE)",
            "shortDescription": "Boolean value",
            "type": "3",
            "errorMessage": "%f: Value is invalid, based on the function code validation.",
            "errorCode": "3",
            "conditions": [{
                "id": "73",
                "longDescription": "Argument Parameters",
                "shortDescription": "ARG Params",
                "type": "6",
                "value": "boolean_val",
                "__typename": "RuleCondition"
            }, {
                "id": "72",
                "longDescription": "Argument Names",
                "shortDescription": "ARG Names",
                "type": "5",
                "value": "boolean_val",
                "__typename": "RuleCondition"
            }, {
                "id": "71",
                "longDescription": "Javascript Function Body",
                "shortDescription": "Function Body",
                "type": "4",
                "value": "return (boolean_val.toLowerCase() === \"true\" || boolean_val.toLowerCase() === \"false\");",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "cli_stat_cd",
        "fieldMasterId": "33",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Client status code",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "35",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Client status code (A/D/I)",
            "shortDescription": "Cli stat cd (A/D/I)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "74",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(A|D|I)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "fiscal_yr_end",
        "fieldMasterId": "34",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Fiscal year end (MMDD)",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "36",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Fiscal year end (MMDD)",
            "shortDescription": "Fiscal yr end (MMDD)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "75",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(1[0-2]|0?[1-9])(3[01]|[12][0-9]|0?[1-9])$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Acct/Sales Exec Init",
        "fieldMasterId": "35",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Account/Sales executive initials",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "37",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the acct or sales exec name table",
            "shortDescription": "acc sls exc nm check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "77",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "76",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "acct_or_sales_exec_init",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "eeo_cd",
        "fieldMasterId": "36",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Equal employment opportunity code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "38",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Equal Employment Opportunity code (N/C/0/1)",
            "shortDescription": "EEO cd (N/C/0/1)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "78",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(N|C|0|1)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": ">0",
        "fieldMasterId": "37",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Greater than zero",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "39",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Integer > 0",
            "shortDescription": "Integer > 0",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "79",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[1-9][0-9]*$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "137",
            "isMandatory": false,
            "ruleGroupNumber": 2,
            "longDescription": "Allow NULL",
            "shortDescription": "Allow NULL",
            "type": "5",
            "errorMessage": "%f: Value can be NULL.",
            "errorCode": "5",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "bkdn_typ_cd",
        "fieldMasterId": "38",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "bkdn_typ_cd",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "40",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Breakdown type code (BLG|RPT)",
            "shortDescription": "Bkd typ cd (BLG|RPT)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "80",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(BLG|RPT)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "bkdn_stat_ind",
        "fieldMasterId": "39",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "bkdn_stat_ind",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "41",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Breakdown status indicator (A/C/I/P/X)",
            "shortDescription": "Bkdn sta (A/C/I/P/X)",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "81",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(A|C|I|P|X)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Acct Mgr Init",
        "fieldMasterId": "40",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Account manager initials",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "42",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the account manager name table",
            "shortDescription": "acct mgr nm check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "83",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "82",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "acct_mgr_init",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "internal_cntct_typ_cd",
        "fieldMasterId": "41",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Internal contact type code",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "43",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the intrnl contact type code table",
            "shortDescription": "intrnl cntc cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "85",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "84",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "internal_cntct_typ_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "decimal_val",
        "fieldMasterId": "42",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Validate value is > 0.0",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "44",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Numeric > 0.0",
            "shortDescription": "Numeric > 0.0",
            "type": "3",
            "errorMessage": "%f: Value is invalid, based on the function code validation.",
            "errorCode": "3",
            "conditions": [{
                "id": "88",
                "longDescription": "Argument Parameters",
                "shortDescription": "ARG Params",
                "type": "6",
                "value": "decimal_val",
                "__typename": "RuleCondition"
            }, {
                "id": "87",
                "longDescription": "Argument Names",
                "shortDescription": "ARG Names",
                "type": "5",
                "value": "decimal_val",
                "__typename": "RuleCondition"
            }, {
                "id": "86",
                "longDescription": "Javascript Function Body",
                "shortDescription": "Function Body",
                "type": "4",
                "value": "return (decimal_val > 0.0);",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Year is 19yy/20yy",
        "fieldMasterId": "43",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Year value is 19yy or 20yy",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "45",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Century part of the year (ccyy) must be 19 or 20",
            "shortDescription": "Year century = 19/20",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "89",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(19|20)[0-9]{2}$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "70",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "invy_stat_cd",
        "fieldMasterId": "44",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Inventory Status Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "46",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the inventory status code table",
            "shortDescription": "invy status cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "91",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "90",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "invy_stat_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "prod_class_cd",
        "fieldMasterId": "45",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Product Class Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "47",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the product class code table",
            "shortDescription": "prod class cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "93",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "92",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "prod_class_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "make",
        "fieldMasterId": "46",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Make",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "48",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the make table",
            "shortDescription": "make check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "95",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "94",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "make",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "71",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "engine_cd",
        "fieldMasterId": "47",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Engine Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "49",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the engine code table",
            "shortDescription": "engine cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "97",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "96",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "engine_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "72",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "contract_cd",
        "fieldMasterId": "48",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Contract Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "50",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the contract code table",
            "shortDescription": "contract cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "99",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "98",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "contract_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "73",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "hvut_cd",
        "fieldMasterId": "49",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Heavy Vehicle Use Tax Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "51",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the hvut code table",
            "shortDescription": "hvut cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "101",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "100",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "hvut_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "74",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "curr_odom_src_cd",
        "fieldMasterId": "50",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Current Odometer Source Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "52",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the current odom source code table",
            "shortDescription": "cur odo src cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "103",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "102",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "curr_odom_src_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "138",
            "isMandatory": false,
            "ruleGroupNumber": 2,
            "longDescription": "Allow NULL",
            "shortDescription": "Allow NULL",
            "type": "5",
            "errorMessage": "%f: Value can be NULL.",
            "errorCode": "5",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "asgn_stat_cd",
        "fieldMasterId": "51",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Assignment Status Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "53",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the assignment status code table",
            "shortDescription": "asgn status cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "105",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "104",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "asgn_stat_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "139",
            "isMandatory": false,
            "ruleGroupNumber": 2,
            "longDescription": "Allow NULL",
            "shortDescription": "Allow NULL",
            "type": "5",
            "errorMessage": "%f: Value can be NULL.",
            "errorCode": "5",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "vin_decode_stat_cd",
        "fieldMasterId": "52",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "VIN Decode Status Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "54",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the vin decode status code table",
            "shortDescription": "vin dcd sta cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "107",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "106",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "vin_decode_stat_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "135",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "battery_typ_cd",
        "fieldMasterId": "53",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Battery Type Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "55",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the battery type code table",
            "shortDescription": "battery typ cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "108",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "battery_typ_cd",
                "__typename": "RuleCondition"
            }, {
                "id": "109",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "engine_typ_cd",
        "fieldMasterId": "54",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Engine Type Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "56",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the engine type code table",
            "shortDescription": "engine type cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "111",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "110",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "engine_typ_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "fuel_typ_cd",
        "fieldMasterId": "55",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Fuel Type Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "57",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the fuel type code table",
            "shortDescription": "fuel type cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "113",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "112",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "fuel_typ_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "vin_decode_provider_id",
        "fieldMasterId": "56",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "VIN Decode Provider ID",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "58",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the vin decode provider table",
            "shortDescription": "vin dcd prvdr check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "115",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "114",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "vin_decode_provider_id",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "st_loc_cd",
        "fieldMasterId": "57",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "State Location Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "59",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the state location code table",
            "shortDescription": "state loc cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "116",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "st_loc_cd",
                "__typename": "RuleCondition"
            }, {
                "id": "117",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "75",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "County/Province Location Code",
        "fieldMasterId": "58",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "County/Province Location Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "60",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the county province loc code table",
            "shortDescription": "cnt prv loc cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "119",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "118",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "cnty_prov_loc_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "76",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "city_loc_cd",
        "fieldMasterId": "59",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "City Location Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "61",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the city location code table",
            "shortDescription": "city loc cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "121",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "120",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "city_loc_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "77",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "spin_competitor_org_id",
        "fieldMasterId": "60",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "SPIN Competitor Organization ID",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "62",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Spin competitor organization id valid",
            "shortDescription": "Spin comp id check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "123",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }, {
                "id": "122",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "spin_competitor_org_id",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "140",
            "isMandatory": false,
            "ruleGroupNumber": 2,
            "longDescription": "Allow NULL",
            "shortDescription": "Allow NULL",
            "type": "5",
            "errorMessage": "%f: Value can be NULL.",
            "errorCode": "5",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "Letters/Digits Only",
        "fieldMasterId": "61",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Letters/Digits Only (A-Z/a-z/0-9)",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "63",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Aplphanumeric characters only",
            "shortDescription": "Alphanum only",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "124",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[a-zA-Z0-9]+$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "78",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }, {
            "id": "141",
            "isMandatory": false,
            "ruleGroupNumber": 2,
            "longDescription": "Allow NULL",
            "shortDescription": "Allow NULL",
            "type": "5",
            "errorMessage": "%f: Value can be NULL.",
            "errorCode": "5",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "contract_no",
        "fieldMasterId": "62",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Contract Number",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "64",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Contract Number valid",
            "shortDescription": "Contract no check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "125",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "contract_no",
                "__typename": "RuleCondition"
            }, {
                "id": "126",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-coredomain",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "79",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": ">= 0",
        "fieldMasterId": "63",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Greater Than or Equal to 0",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "65",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Integer must be greater than or equal to 0",
            "shortDescription": "Integer >= 0",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "127",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^\\d*$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "80",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "A/C/D indicator",
        "fieldMasterId": "64",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "A/C/D indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "88",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "A/C/D indicator",
            "shortDescription": "A/C/D ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "135",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[ACD]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "89",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }, {
            "id": "521",
            "isMandatory": false,
            "ruleGroupNumber": 10,
            "longDescription": null,
            "shortDescription": "short ",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }, {
            "id": "522",
            "isMandatory": false,
            "ruleGroupNumber": 10,
            "longDescription": null,
            "shortDescription": "short ",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "N/S indicator",
        "fieldMasterId": "65",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "N/S indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "67",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "N/S indicator",
            "shortDescription": "N/S ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "129",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[NS]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "0/1/2/3 indicator",
        "fieldMasterId": "66",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "0/1/2/3 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "68",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "0/1/2/3 indicator",
            "shortDescription": "0/1/2/3 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "130",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[0123]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "136",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "deliv_pkg_hold_cd",
        "fieldMasterId": "67",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Delivery Package Hold Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "103",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the delivery pkg hold code table",
            "shortDescription": "Dlv pkg hld cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "146",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "145",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "deliv_pkg_hold_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "104",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "A/D/DR/F/P/T/V indicator",
        "fieldMasterId": "68",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "A/D/DR/F/P/T/V indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "106",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "A/D/DR/F/P/T/V indicator",
            "shortDescription": "A/D/DR/F/P/T/V ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "147",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(A|D|DR|F|P|T|V)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "CC/DI/FI/P/T indicator",
        "fieldMasterId": "69",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "CC/DI/FI/P/T indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "107",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "CC/DI/FI/P/T indicator",
            "shortDescription": "CC/DI/FI/P/T ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "148",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(CC|DI|FI|P|T)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "108",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "N/P/V indicator",
        "fieldMasterId": "70",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "N/P/V indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "109",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "N/P/V indicator",
            "shortDescription": "N/P/V ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "149",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[NPV]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "110",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "1/2 indicator",
        "fieldMasterId": "71",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "1/2 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "82",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "1/2 indicator",
            "shortDescription": "1/2 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "132",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[12]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "83",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "0/1/2/3/4 indicator",
        "fieldMasterId": "72",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "0/1/2/3/4 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "84",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "0/1/2/3/4 indicator",
            "shortDescription": "0/1/2/3/4 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "133",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[01234]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "85",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "1/3 indicator",
        "fieldMasterId": "73",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "1/3 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "90",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "1/3 indicator",
            "shortDescription": "1/3 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "136",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[13]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "91",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "0/1/2/4 indicator",
        "fieldMasterId": "74",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "0/1/2/4 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "92",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "0/1/2/4 indicator",
            "shortDescription": "0/1/2/4 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "137",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[0124]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "93",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "E indicator",
        "fieldMasterId": "75",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "E indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "94",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "E indicator",
            "shortDescription": "E ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "138",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[E]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "95",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "tag_typ_cd",
        "fieldMasterId": "76",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Tag Type Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "96",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the tag type code table",
            "shortDescription": "tag type cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "140",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "139",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "tag_typ_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "99",
            "isMandatory": false,
            "ruleGroupNumber": 2,
            "longDescription": "Allow NULL",
            "shortDescription": "Allow NULL",
            "type": "5",
            "errorMessage": "%f: Value can be NULL.",
            "errorCode": "5",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "source_of_funds_cd",
        "fieldMasterId": "77",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Source of Funds Code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "97",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Lookup value in the source of funds code table",
            "shortDescription": "src of fnds cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "142",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "141",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "source_of_funds_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "98",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "A/N/P/Y indicator",
        "fieldMasterId": "79",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "A/N/P/Y indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "111",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "A/N/P/Y indicator",
            "shortDescription": "A/N/P/Y ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "150",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[ANPY]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "112",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "0/1/2 indicator",
        "fieldMasterId": "80",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "0/1/2 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "113",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "0/1/2 indicator",
            "shortDescription": "0/1/2 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "151",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[012]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "A/D/I/P/R/S/T indicator",
        "fieldMasterId": "81",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "A/D/I/P/R/S/T indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "114",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "A/D/I/P/R/S/T indicator",
            "shortDescription": "A/D/I/P/R/S/T ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "152",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[ADIPRST]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "115",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "C/D/U indicator",
        "fieldMasterId": "82",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "C/D/U indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "116",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "C/D/U indicator",
            "shortDescription": "C/D/U ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "153",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[CDU]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "117",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "C/D/E/F/P indicator",
        "fieldMasterId": "83",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "C/D/E/F/P indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "118",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "C/D/E/F/P indicator",
            "shortDescription": "C/D/E/F/P ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "154",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[CDEFP]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "1/2/4 indicator",
        "fieldMasterId": "84",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "1/2/4 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "120",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "1/2/4 indicator",
            "shortDescription": "1/2/4 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "155",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[124]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "0/2/3/4 indicator",
        "fieldMasterId": "85",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "0/2/3/4 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "121",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "0/2/3/4 indicator",
            "shortDescription": "0/2/3/4 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "156",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[0234]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "PCT/PTS indicator",
        "fieldMasterId": "86",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "PCT/PTS indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "122",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "PCT/PTS indicator",
            "shortDescription": "PCT/PTS ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "157",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^(PCT|PTS)$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "130",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "A/B/C/D/O/P/R/T/U/V indicator",
        "fieldMasterId": "87",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "A/B/C/D/O/P/R/T/U/V indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "123",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "A/B/C/D/O/P/R/T/U/V indicator",
            "shortDescription": "A/B/C/D/O/P/R/T/U/V",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "158",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[ABCDOPRTUV]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "124",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "A/B/C/D/U indicator",
        "fieldMasterId": "88",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "A/B/C/D/U indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "125",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "A/B/C/D/U indicator",
            "shortDescription": "A/B/C/D/U ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "159",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^[ABCDU]$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "126",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "1 indicator",
        "fieldMasterId": "89",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "1 indicator",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "127",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "1 indicator",
            "shortDescription": "1 ind",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "160",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "^1$",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "128",
            "isMandatory": false,
            "ruleGroupNumber": 1,
            "longDescription": "Allow blank",
            "shortDescription": "Allow blank",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "odom_reading_typ_cd",
        "fieldMasterId": "90",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Odometer reading type code",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "142",
            "isMandatory": true,
            "ruleGroupNumber": 5,
            "longDescription": "Lookup value in the odometer reading code table",
            "shortDescription": "Odom rdng cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "162",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "161",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "odom_reading_typ_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "mileage_rpt_source_cd",
        "fieldMasterId": "91",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Mileage reporting source code",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": "144",
            "isMandatory": true,
            "ruleGroupNumber": 5,
            "longDescription": "Lookup the mileage reporting source code table",
            "shortDescription": "Mlg rpt src cd check",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "164",
                "longDescription": "API Unique Id",
                "shortDescription": "API Id",
                "type": "3",
                "value": "enterprise-apis-referencedata",
                "__typename": "RuleCondition"
            }, {
                "id": "163",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "mileage_rpt_source_cd",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "test",
        "fieldMasterId": "679",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "test",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "928",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "test",
            "shortDescription": "test",
            "type": "1",
            "errorMessage": "%f: Value is invalid, based on the regular expression.",
            "errorCode": "1",
            "conditions": [{
                "id": "677",
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "type": "1",
                "value": "test",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "test1122",
        "fieldMasterId": "682",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "test",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": null,
            "isMandatory": null,
            "ruleGroupNumber": null,
            "longDescription": null,
            "shortDescription": null,
            "type": null,
            "errorMessage": null,
            "errorCode": null,
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "test",
        "fieldMasterId": "683",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "test_de",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": null,
            "isMandatory": null,
            "ruleGroupNumber": null,
            "longDescription": null,
            "shortDescription": null,
            "type": null,
            "errorMessage": null,
            "errorCode": null,
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "test_dan927",
        "fieldMasterId": "685",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "Enterprise field DAN for Testing purpose",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": "954",
            "isMandatory": true,
            "ruleGroupNumber": 10,
            "longDescription": "Test Long",
            "shortDescription": "Test Short",
            "type": "2",
            "errorMessage": "%f: Value is invalid, based on the API lookup.",
            "errorCode": "2",
            "conditions": [{
                "id": "698",
                "longDescription": "API query parameters name",
                "shortDescription": "API Parameters",
                "type": "2",
                "value": "dlr_asgn_no,corp_cd,cli_no",
                "__typename": "RuleCondition"
            }],
            "__typename": "FieldRule"
        }, {
            "id": "955",
            "isMandatory": false,
            "ruleGroupNumber": 10,
            "longDescription": "testlong",
            "shortDescription": "test12",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }, {
            "id": "956",
            "isMandatory": false,
            "ruleGroupNumber": 10,
            "longDescription": "testlong",
            "shortDescription": "test12",
            "type": "4",
            "errorMessage": "%f: Value can be blank.",
            "errorCode": "4",
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "test688",
        "fieldMasterId": "686",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "test",
        "enterpriseFieldInd": true,
        "rules": [{
            "id": null,
            "isMandatory": null,
            "ruleGroupNumber": null,
            "longDescription": null,
            "shortDescription": null,
            "type": null,
            "errorMessage": null,
            "errorCode": null,
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "test689",
        "fieldMasterId": "687",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "test",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": null,
            "isMandatory": null,
            "ruleGroupNumber": null,
            "longDescription": null,
            "shortDescription": null,
            "type": null,
            "errorMessage": null,
            "errorCode": null,
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }, {
        "fieldName": "test aba",
        "fieldMasterId": "691",
        "fieldMasterInUseInd": true,
        "fieldDefinition": "test aba",
        "enterpriseFieldInd": false,
        "rules": [{
            "id": null,
            "isMandatory": null,
            "ruleGroupNumber": null,
            "longDescription": null,
            "shortDescription": null,
            "type": null,
            "errorMessage": null,
            "errorCode": null,
            "conditions": null,
            "__typename": "FieldRule"
        }],
        "__typename": "FieldMetaData"
    }
];

export {mockFieldMasterList};