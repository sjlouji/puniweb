import React, { Component } from 'react';
import construction from '../../media/construction.gif';

export default class UnderConstruction extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#2d3241', height: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <img src={construction} style={{ marginTop: '100px' }}/>
                    <h1 style={{ color: '#ffffff' }}>Web site Under Construction</h1>

                </div>
            </div>
        )
    }
}
