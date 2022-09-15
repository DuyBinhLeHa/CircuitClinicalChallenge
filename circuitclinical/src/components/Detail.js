import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import StudyFieldData from './features/StudyFieldData';
import StudyFieldModal from './features/StudyFieldModal';

import { USERS_API_URL } from '../constants';

class Detail extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        fetch('https://localhost:44304/api/StudyField/Get')
            .then(res => res.json())
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }

    addUserToState = user => {
        this.setState(previous => ({
            items: [...previous.items, user]
        }));
    }

    updateState = (id) => {
        this.getItems();
    }

    deleteItemFromState = id => {
        const updated = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updated })
    }

    render() {
        return <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <h3>My First React + ASP.NET CRUD React</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <StudyFieldData
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <StudyFieldModal isNew={true} addUserToState={this.addUserToState} />
                </Col>
            </Row>
        </Container>;
    }
}

export default Detail;