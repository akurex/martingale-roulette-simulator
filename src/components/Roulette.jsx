import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Roulette extends Component {
    state = {
        name: ''
    }
    render() {
        return (
        <div>
            <TextField
                id="name"
                label="Name"
                value={this.state.name}
                onChange={console.log('changed')}
                margin="normal"
            />
        </div>
        )
    }
}

export default Roulette;