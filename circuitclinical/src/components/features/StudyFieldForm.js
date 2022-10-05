import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { USERS_API_URL1 } from '../../constants';

class StudyFieldForm extends Component {

    state = {
        id: 0,
        rank: 0,
        nctId: '',
        leadSponsorName: '',
        briefTitle: '',
        condition: '',
        isEdit: false
    }

    componentDidMount() {
        if (this.props.studyfield) {
            const { id, rank, nctId, leadSponsorName, briefTitle, condition } = this.props.studyfield
            this.setState({ id, rank, nctId, leadSponsorName, briefTitle, condition });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL1}Insert`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nctId: this.state.nctId,
                leadSponsorName: this.state.leadSponsorName,
                briefTitle: this.state.briefTitle,
                condition: this.state.condition
            })
        }).then(res => res.json()).then(data => {
                this.props.addStudyFieldToState(data);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL1}Update/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.nctId,
                document: this.state.leadSponsorName,
                email: this.state.briefTitle,
                phone: this.state.condition
            })
        }).then(() => {
                this.props.toggle();
                this.props.updateStudyFieldIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }

    render() {
        return <Form onSubmit={this.props.studyfield ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="name">NCT Id:</Label>
                <Input type="text" name="nctId" onChange={this.onChange} value={this.state.nctId === null ? '' : this.state.nctId} />
            </FormGroup>
            <FormGroup>
                <Label for="name">Lead Sponsor Name:</Label>
                <Input type="text" name="leadSponsorName" onChange={this.onChange} value={this.state.leadSponsorName === null ? '' : this.state.leadSponsorName} />
            </FormGroup>
            <FormGroup>
                <Label for="document">Brief Title:</Label>
                <Input type="text" name="briefTitle" onChange={this.onChange} value={this.state.briefTitle === null ? '' : this.state.briefTitle} />
            </FormGroup>
            <FormGroup>
                <Label for="document">Condition:</Label>
                <Input type="text" name="condition" onChange={this.onChange} value={this.state.condition === null ? '' : this.state.condition} />
            </FormGroup>
            <Button>{this.props.isEdit ? 'Edit' : 'Create'}</Button>
        </Form>;
    }
}

export default StudyFieldForm;
