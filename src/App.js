import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const SegmentForm = () => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchemaValue, setNewSchemaValue] = useState('');
  const [newSchemaLabel, setNewSchemaLabel] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);


  const handleAddSchema = (value, label) => {
    if (!selectedSchemas.some(schema => schema.value === value)) {
      setSelectedSchemas([...selectedSchemas, { value, label }]);
    }
  };

  const handleAddNewSchema = () => {
    if (newSchemaValue && newSchemaLabel) {
      handleAddSchema(newSchemaValue, newSchemaLabel);
      setNewSchemaValue('');
      setNewSchemaLabel('');
    }
  };

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.label]: schema.value })),
    };

    console.log('Sending data:', data);

  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button onClick={handleShow}>Save Segment</Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>Save Segment</Modal.Header>
        <Modal.Body>
          <input type="text" className="form form-control" placeholder="Segment Name" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} />
          <Dropdown open={isOpen} onToggle={handleToggle} className="my-3">
            <Dropdown.Toggle>Add Schema to Segment</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleAddSchema('first_name', 'First Name')}>Label: First Name Value: first_name</Dropdown.Item>
              <Dropdown.Item onClick={handleAddNewSchema}>+Add new schema</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div>
            {selectedSchemas.map((schema, index) => (
              <li key={index}>
                {schema.label}: {schema.value}
              </li>
            ))}
          </div>
          <div>
            <input type="text" className='me-2' placeholder="First Name" value={newSchemaValue} onChange={(e) => setNewSchemaValue(e.target.value)} />
            <input type="text" placeholder="John" value={newSchemaLabel} onChange={(e) => setNewSchemaLabel(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleSaveSegment} disabled={!segmentName || selectedSchemas.length === 0}>Save Segment</Button>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SegmentForm;