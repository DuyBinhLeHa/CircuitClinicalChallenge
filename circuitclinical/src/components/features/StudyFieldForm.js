import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { USERS_API_URL } from '../../constants';

class StudyFieldForm extends Component {

    state = {
        rank: 0,
        nctid: '',
        leadsponsorname: '',
        brieftitle: '',
        condition: ''
    }

    componentDidMount() {
        if (this.props.studyfield) {
            const { rank, nctid, leadsponsorname, brieftitle, condition } = this.props.studyfield
            this.setState({ rank, nctid, leadsponsorname, brieftitle, condition });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/Insert`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nctid: this.state.nctid,
                leadsponsorname: this.state.leadsponsorname,
                brieftitle: this.state.brieftitle,
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
        fetch(`${USERS_API_URL}/Update/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.nctid,
                document: this.state.leadsponsorname,
                email: this.state.brieftitle,
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
                <Input type="text" name="nctid" onChange={this.onChange} value={this.state.nctid === null ? '' : this.state.nctid} />
            </FormGroup>
            <FormGroup>
                <Label for="name">Lead Sponsor Name:</Label>
                <Input type="text" name="leadsponsorname" onChange={this.onChange} value={this.state.leadsponsorname === null ? '' : this.state.leadsponsorname} />
            </FormGroup>
            <FormGroup>
                <Label for="document">Brief Title:</Label>
                <Input type="text" name="brieftitle" onChange={this.onChange} value={this.state.brieftitle === null ? '' : this.state.brieftitle} />
            </FormGroup>
            <FormGroup>
                <Label for="document">Condition:</Label>
                <Input type="text" name="condition" onChange={this.onChange} value={this.state.condition === null ? '' : this.state.condition} />
            </FormGroup>
            <Button>Create</Button>
        </Form>;
    }
}

export default StudyFieldForm;
