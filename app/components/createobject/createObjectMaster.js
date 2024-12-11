"use client";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useMutation, useQuery} from "@apollo/client";
import {defaultDialectCode} from "@/app/components/config/dialectCodeMap";
import graphqlForObjectMaster from "@/app/graphql/objectMasterQueries";
import variableHelper from "@/app/lib/variableHelper";
import {loadFetchFieldMetaData} from '@/app/graphql/fieldMasterQueries'
import CreateObjectFields from "@/app/components/createobject/createObjectFields";
import {
    checkUserChanges,
    formatFieldRules,
    formatFormData,
    newEmptyFieldItem,
    updateFieldItems,
    updateHandlerLogic,
    useMultipleMutations,
    updateFiledRule
} from "@/app/components/createobject/createObjectMasterLogic";

/**
 * Component: create or edit an object master
 * @returns {void}
 */
const CreateObjectMaster = () => {
    const { objLabelName } = useParams();
    const navigate = useNavigate();
    const isUpdating = undefined !== objLabelName;
    const initialFormData = formatFormData(null);
    const [formData, setFormData] = useState(initialFormData);
    const [formDataSnapshot, setFormDataSnapshot] = useState(variableHelper.deepCopy(formData));
    const [fieldMasterList, setFieldMasterList] = useState([]);
    const mutationQueryList = useMultipleMutations();

    /**
     * Return to homepage (the list of object master)
     * @param {boolean} isRefresh - Whether to force refresh the page after returning to homepage
     * @returns {void}
     */
    const goToHomepage = (isRefresh = false) => {
        const navOptions = {
            state: {
                refreshPage: isRefresh
            }
        };
        navigate('/', navOptions);
    }

    const rawFieldMasterList = useQuery(loadFetchFieldMetaData, {
        variables: { dialectCode: defaultDialectCode }
    });

    /**
     * Renders form fields for filling in "Object Field Name" and "Field Master Name".
     * @returns {JSX.Element}
     */
    const showAddMoreObjectFieldsSection = function() {
        const addOneObjectField = () => {
            const newFieldItems = [...formData.fieldItems, newEmptyFieldItem()];
            setFormData({...formData, fieldItems: newFieldItems});
        };

        const deleteOneRow = (targetRowId) => {
            const newFieldItems = formData.fieldItems.filter(item => targetRowId !== item.id);
            setFormData({...formData, fieldItems: newFieldItems});
        };

        const removeIsNotMandatoryRule = (rules) => {
            return rules.filter(r => r.isMandatory);
        }

        const dropDownItemClickHandler = (uuid) => {
            return function (item) {
                const newItemValue = {
                    id: uuid,
                    fieldMasterName: item.value,
                    fieldMasterId: `${item.key}`,
                    fieldXrefId: '0', // TODO
                    rules: removeIsNotMandatoryRule(formatFieldRules(item.rules))
                };

                updateFieldItems(setFormData, formData, newItemValue);
            };
        };

        const fieldRuleCheckboxCallback = (fieldUUID, fieldMasterId, checkedRule) => {
            const updatedFormData = updateFiledRule(formData, fieldUUID, fieldMasterId, checkedRule);
            setFormData(updatedFormData);
        }

        const inputBoxListForAddMore = formData.fieldItems.map(item => (
            <CreateObjectFields
                key={item.id}
                item={item}
                onInputChangeHandler={ inputChangeHandler }
                onDeleteHandler={ () => deleteOneRow(item.id) }
                onDropDownItemClick={ dropDownItemClickHandler(item.id) }
                fieldMasterList={ fieldMasterList }
                fieldRuleCheckboxCallback={ fieldRuleCheckboxCallback }
                isUpdating={ isUpdating }
            />
        ));

        return (
            <>
                <Button className="mb-3" variant="info" onClick={ addOneObjectField }>
                    Add more object fields
                </Button>

                <Row>
                    <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                        <Form.Label>
                            Object Field Name <b>*</b>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                        <Form.Label>
                            Field Master Name <b>*</b>
                        </Form.Label>
                    </Form.Group>
                </Row>

                { inputBoxListForAddMore }
            </>
        );
    };

    /**
     * Handling input changes
     * @returns {void}
     */
    const inputChangeHandler = (e) => {
        if ('checkbox' === e.target.type) {
            const newObjMasterInUseInd = !formData.objMasterInUseInd;
            setFormData({...formData, objMasterInUseInd: newObjMasterInUseInd});
            return;
        }

        if ('text' === e.target.type) {
            const name = e.target.name;

            if (name.startsWith('fields-')) {
                // User changed an item of Object Field Name or Field Master Name
                const newItemValue = {
                    id: name.replace('fields-objfieldname-', ''), // The name's format is "fields-objfieldname-<UUID string>"
                    objectFieldName: e.target.value,
                };

                updateFieldItems(setFormData, formData, newItemValue);
            } else {
                // User changed other input box: 
                //   - Object Name
                //   - Object Definition
                setFormData({ ...formData, [name]: e.target.value });
            }
        }
    };

    const [createValidationObject, createValidationObjectResponse] = useMutation(graphqlForObjectMaster.CreateValidationObject);

    /**
     * Handle form submission
     * @param event
     * @returns {Promise<void>}
     */
    const submitHandler = async (event) => {
        event.preventDefault();

        const submitData = {
            dialectCode: defaultDialectCode,
            objectDefinition: formData.objectDef,
            objectLabelName: formData.labelName,
            objectName: formData.objectName,
            objectField: formData.fieldItems.map(field => {
                return {
                    fieldMasterId: field.fieldMasterId,
                    objectFieldName: field.objectFieldName,
                    fieldValidation: field.rules.map(rule => {
                        return {
                            fieldValidRuleId: rule.id
                        };
                    })
                };
            })
        };

        try {
            const response = await createValidationObject({ variables: submitData });
            console.log('response', JSON.stringify(response));
        } catch (error) {
            console.log(error.name, JSON.stringify(error));
            window.alert(`${error.name}: ${error.message}`);
        }

        goToHomepage(true);
    }

    /**
     * Handling form update operations
     * @param event
     * @returns {Promise<void>}
     */
    const updateHandler = async (event) => {
        event.preventDefault();

        if (0 === formData.fieldItems.length) {
            window.alert('You cannot delete all object fields.');
            return;
        }

        // Check what the user changes
        const apisToBeCalledFirstGroup = checkUserChanges(formData, formDataSnapshot);

        if (0 === apisToBeCalledFirstGroup.length) {
            console.log('The user made no changes, no API call needed.');
            goToHomepage();
        }

        const firstGroupResponseList = await updateHandlerLogic.runMutationQuery(apisToBeCalledFirstGroup, mutationQueryList);
        const addedObjectFieldList = updateHandlerLogic.getAddedObjectFieldList(firstGroupResponseList);

        // If there are new object fields, need to call the API to add validation rules for them. Otherwise, these new fields cannot be displayed.
        if (addedObjectFieldList.length) {
            const validationsToBeAdded = updateHandlerLogic.getValidationsToBeAdded(addedObjectFieldList, apisToBeCalledFirstGroup);
            if (validationsToBeAdded.length > 0) {
                const apisToBeCalledSecondGroup = [
                    {
                        apiName: 'AddValidationToObjectField',
                        variables: {
                            addValidations: validationsToBeAdded
                        }
                    }
                ];
                const secondGroupResponseList = await updateHandlerLogic.runMutationQuery(apisToBeCalledSecondGroup, mutationQueryList);
                console.log('queryResponseList from apisToBeCalledSecondGroup', JSON.stringify(secondGroupResponseList));
            }
        }

        goToHomepage(true);
    }

    /**
     * Handling form cancellation
     * @returns {void}
     */
    const cancelHandler = () => {
        const apisToBeCalled = checkUserChanges(formData, formDataSnapshot);

        const nothingWasChanged = 0 === apisToBeCalled.length;
        if (nothingWasChanged) {
            goToHomepage(true);
        } else {
            if (window.confirm('Do you confirm to discard changes?')) {
                goToHomepage();
            }
        }
    }

    /**
     * Reset the form
     * @returns {void}
     */
    const resetFormData = () => {
        setFormData(initialFormData);
        setFormDataSnapshot(variableHelper.deepCopy(initialFormData));
    }

    const objMetaDataResponse = useQuery(graphqlForObjectMaster.FetchObjectMetaDataByLabel, {
        variables: {
            objectLabelName: objLabelName,
            dialectCode: defaultDialectCode
        },
        skip: false === isUpdating /* The query operation will be executed only when "Updating". */
    });

    useEffect(() => {
        objMetaDataResponse.refetch();
    }, [objLabelName]);

    useEffect(() => {
        // Render the list of Object Master
        if (isUpdating) {
            if (objMetaDataResponse.error) {
                console.log('Error from GraphQL API: ', objMetaDataResponse.error.message);
            }
            if (objMetaDataResponse.data) {
                const rawObjMetaData = objMetaDataResponse.data.FetchObjectMetaDataByLabel;
                const formattedFormData = formatFormData(rawObjMetaData[0]);
                setFormData(formattedFormData);
                setFormDataSnapshot(variableHelper.deepCopy(formattedFormData));
            }
        } else {
            resetFormData();
        }
    }, [isUpdating, objMetaDataResponse, setFormData, setFormDataSnapshot]);

    // Submit the form and get the API response
    useEffect(() => {
        if (createValidationObjectResponse.error) {
            console.log('Failed to save Object Master.', createValidationObjectResponse.error.message);
        }
        if (createValidationObjectResponse.data) {
            goToHomepage();
        }
    }, [createValidationObjectResponse]);

    useEffect(() => {
        if (rawFieldMasterList.error) {
            console.error('Failed to obtain the Object Master list: ', rawFieldMasterList.error);
        }
        if (rawFieldMasterList.data) {
            const fieldMetaData = rawFieldMasterList.data.FetchFieldMetaData;
            setFieldMasterList(fieldMetaData);
        }
    }, [rawFieldMasterList]);

    // React Forms, refer to https://www.w3schools.com/react/react_forms.asp
    return (
        <>
            <h2 className="title is-1">
                { isUpdating ? 'Update Object Master' : 'Create Object Master' }
            </h2>

            <Form onSubmit={ isUpdating ? updateHandler : submitHandler }>
                <Row>
                    <Form.Group className="mb-3 col-4" controlId="objectName">
                        <Form.Label>
                            Object Name <b>*</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="objectName"
                            required
                            value={ formData.objectName }
                            onChange={ inputChangeHandler }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-4" controlId="objMasterInUseInd">
                        <Form.Label>
                            In Use Indicator <b>*</b>
                        </Form.Label>
                        <Form.Check
                            type="checkbox"
                            name="objMasterInUseInd"
                            label="Check here to mark Object Master as 'In Use'"
                            className="mt-2"
                            checked={ formData.objMasterInUseInd }
                            onChange={ inputChangeHandler }
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 col-4" controlId="objectDefinition">
                    <Form.Label>
                        Object Definition <b>*</b>
                    </Form.Label>
                    <Form.Control 
                        type="text"
                        name="objectDef"
                        required
                        value={ formData.objectDef }
                        onChange={ inputChangeHandler }
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="labelName">
                    <Form.Label>
                        Label Name { !isUpdating && (<b>*</b>) }
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="labelName"
                        value={ formData.labelName }
                        onChange={ inputChangeHandler }
                        disabled={ isUpdating /* The label name cannot be edited. */}
                    />
                </Form.Group>

                { showAddMoreObjectFieldsSection() }

                <Button variant="primary" type="submit">
                    { isUpdating ? 'Update' : 'Submit' }
                </Button>

                { isUpdating && (
                    <Button variant="secondary" type="button" 
                            className="ms-4" 
                            onClick={ cancelHandler }>
                        Cancel
                    </Button>
                ) }
            </Form>
        </>
    );
};

export default CreateObjectMaster;