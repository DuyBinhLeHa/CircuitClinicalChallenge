import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import StudyFieldModal from './StudyFieldModal';

import { API_URL } from '../../constants';

class StudyFieldData extends Component {

    deleteItem = id => {
        let confirmDeletion = window.confirm('Do you really wish to delete it?');

        if (confirmDeletion) {
            fetch(`${API_URL}/Delete/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => { this.props.deleteItemFromState(id); }).catch(err => console.log(err));
        }
    }

    render() {
        const items = this.props.items;
        return <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>Rank</th>
                    <th>NCT Id</th>
                    <th>Lead Sponsor Name</th>
                    <th>Brief Title</th>
                    <th>Condition</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!items || items.length <= 0 ?
                    <tr>
                        <td colSpan="6" align="center"><b>No datas yet</b></td>
                    </tr>
                    : items.map(item => (
                        <tr key={item.id}>
                            <th scope="row">
                                {item.rank}
                            </th>
                            <td>{item.nctId}</td>
                            <td>{item.leadSponsorName}</td>
                            <td>{item.briefTitle}</td>
                            <td>{item.condition}</td>
                            <td align="center">
                                <div>
                                    <StudyFieldModal
                                        isNew={false}
                                        studyfield={item}
                                        updateStudyFieldIntoState={this.props.updateState} />
                                    &nbsp;&nbsp;&nbsp;
                                    <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>;
    }
}

export default StudyFieldData;
