"use client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    alert('totally custom!'),
  );

  return (
      "Object Field - " + eventKey
  );
}

const CreateObjectFields = (props) => {
    const {deleteRow, eventKey} = props
    return (
        <div>
          <Row eventKey={ eventKey }>
                <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                    <Form.Select aria-label="Field master name">
                        <option></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 col-3" controlId="">
                    <Button className="mb-3" variant="danger" size="sm" onClick={(e) => deleteRow(eventKey)}>Delete</Button>
                </Form.Group>
            </Row>
        </div>
    )
};

export default CreateObjectFields;