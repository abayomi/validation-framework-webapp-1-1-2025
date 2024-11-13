"use client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Options({data}) {
    const optionList = data.map(item => {
        return (
            <option key={ item.id } value={ item.id }>
                { item.name }
            </option>
        );
    });

    return (
        <>
            <option disabled selected>Choose:</option>
            { optionList }
        </>
    );
}

const CreateObjectFields = (props) => {
    const { name, fieldMasterNameList, onInputChangeHandler, onDeleteHandler } = props

    return (
        <>
          <Row>
                <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                    <Form.Control 
                        type="text"
                        name={ `fields-objfieldname-${name}` }
                        onChange={ onInputChangeHandler }
                    />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                    <Form.Select 
                        aria-label="Field master name" 
                        name={ `fields-fieldmastername-${name}` } 
                        onChange={ onInputChangeHandler }
                    >
                        <Options data={fieldMasterNameList} />
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 col-3">
                    <Button 
                        className="mb-3" 
                        variant="danger" 
                        size="sm" 
                        onClick={ onDeleteHandler }
                    >Delete</Button>
                </Form.Group>
            </Row>
        </>
    )
};

export default CreateObjectFields;