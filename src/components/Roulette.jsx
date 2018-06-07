import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import roulette from './roulette.json'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });



class Roulette extends Component {
    
    state = {
        colorBet: 0,
        evenOddBet: 0,
        halfBet: 0,
        passes: 0,
        result: 0
    }

    simulate = () => {
        console.log(this.state)
    }

    handleChange = (event) => {
        this.setState({colorBet: event.target.value});
    }

    render() {
        const { classes } = this.props;
        return (
        <div>
            <br/>
            <p>Starting bets</p>
            <TextField
                id="colorBet"
                label="color"
                value={this.state.colorBet}
                onChange={this.handleChange}
                margin="normal"
            />
            <TextField
                id="evenOddBet"
                label="Even/Odd"
                value={this.state.evenOddBet}
                onChange={console.log('changed')}
                margin="normal"
            />
            <TextField
                id="lowHighBet"
                label="Low/High"
                value={this.state.halfBet}
                onChange={console.log('changed')}
                margin="normal"
            />
            <div>
            <TextField
                id="passes"
                label="passes"
                value={this.state.passes}
                onChange={console.log('changed')}
                margin="normal"
            />
            <Button onClick={this.simulate} variant="raised" color="primary" className={classes.button}>
                Simulate
            </Button>
            </div>

            <div>
                {}
            </div>

        </div>
        )
    }
}

export default withStyles(styles)(Roulette);