import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import StudyFieldForm from './StudyFieldForm';

class StudyFieldModal extends Component {

    state = {
        modal: false
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }

    render() {
        const isNew = this.props.isNew;

        let title = 'Edit Study Field';
        let button = '';

        if (isNew) {
            title = 'Add Study Field';
            button = <Button color="success" onClick={this.toggle} style={{ minWidth: "200px" }}>Add</Button>;
        } else {
            button = <Button color="warning" onClick={this.toggle}>Edit</Button>;
        }

        return <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    <StudyFieldForm
                        addStudyFieldToState={this.props.addStudyFieldToState}
                        updateStudyFieldIntoState={this.props.updateStudyFieldIntoState}
                        toggle={this.toggle}
                        studyfield={this.props.studyfield} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}

export default StudyFieldModal;
