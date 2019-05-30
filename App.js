import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone,faNewspaper} from "@fortawesome/free-solid-svg-icons";

import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { Form, InputGroup, } from "react-bootstrap";

import validator, { field } from './validator';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: field({value:'', name: 'name', minLength: 2}),
      phone:    field({value: '', name: 'phone', pattern: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/}),
      how:  field({value: '', name: 'how',isRequired:true}),
      course:   field({value: '', name: 'course'})
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    console.log(name, value);

    this.setState({
      [name]: {
        ...this.state[name],
        value,
        ...validator(value, name, this.state[name].validations)
      }
    });
  }

  onSubmit(e) {
    
    const ContactUS = Object.assign({}, this.state);

    for(let key in ContactUS){
        const { value, validations } = ContactUS[key];

        const { valid, errors } = validator(value, key, validations);

        if(!valid){
            ContactUS[key].valid = valid;
            ContactUS[key].errors = errors;
        }
        else{

        }
    }

    this.setState({...ContactUS});
   
    e.preventDefault();
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h1>contact us</h1>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="formControlname">
                      <Form.Label>name</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name="name"
                          placeholder="Enter your name  "
                          aria-label="name"
                          defaultValue={this.state.name.value}
                          onBlur={this.onInputChange}
                        />
                      </InputGroup>
                      {this.state.name.errors.map((err, i) => (
                        <Form.Text key={i} className="text-danger">
                          {err}
                        </Form.Text>
                      ))}
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                    <Form.Group controlId="formControlEmail">
                      <Form.Label>phone</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faPhone} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name="phone"
                          placeholder="Enter your phone number"
                          aria-label="phone"
                          defaultValue={this.state.phone.value}
                          onBlur={this.onInputChange}
                        />
                      </InputGroup>
                      {this.state.phone.errors.map((err, i) => (
                        <Form.Text key={i} className="text-danger">
                          {err}
                        </Form.Text>
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formControlCourse">
                      <Form.Label>How did you reached us?</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faNewspaper} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="select"
                          name="how"
                          defaultValue={this.state.how.value}
                          onBlur={this.onInputChange}
                        >
                          <option value="">Select How did you reached us?</option>
                          <option value="Advertisment">Advertisment</option>
                          <option value="News">News</option>
                          <option value="Friends">Friends</option>
                          <option value="Social Media">Social Media</option>
                        </Form.Control>
                      </InputGroup>
                    </Form.Group>
                    {this.state.how.errors.map((err, i) => (
                        <Form.Text key={i} className="text-danger">
                          {err}
                        </Form.Text>
                      ))}
                  </Col>
                  </Row>
               
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
