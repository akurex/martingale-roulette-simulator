import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import data from './data.json'

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
        cash : 1000,
        colorBet : 5,
        evenOddBet : 5,
        halfBet : 5,
        passes : 400,
        result : '',
        balance : 0
    }

    simulate = () => {
        this.setState({ result : '' })

        let balance = this.state.cash
        let bets = {
            red : this.state.colorBet*2,
            black : this.state.colorBet,
            even : this.state.evenOddBet*2,
            odd : this.state.evenOddBet,
            low : this.state.halfBet*2,
            high : this.state.halfBet,
        }
        let totals = {
            zero : 0,
            black : 0,
            red : 0,
            even : 0,
            odd : 0,
            low : 0,
            high : 0,
        }

        const min = Math.ceil(0);
        const max = Math.floor(36);
        const passes = this.state.passes

        // const reducer = (accumulator, currentValue) => accumulator + currentValue

        for (let index = 0; index < passes; index++) {
            console.log(bets)
            let sumOfBets = Object.keys(bets).reduce((sum, next) => sum + bets[next],0)
            console.log('sum of bets: '+sumOfBets)
            balance = balance - bets.red - bets.black - bets.even - bets.odd - bets.low - bets.high
            // console.log(balance)
            const spinNumber = Math.floor(Math.random() * (max - min + 1)) + min
            const spin = data[spinNumber]
            // console.log(spin)
            // Zero
            if (spinNumber == 0) {
                Object.keys(bets).map( e => bets[e] = bets[e]*2 )
                totals.zero++
                // console.log(bets)
                continue
            }
            // Color
            if (spin.color == 'black') {
                balance += bets.black*2
                bets.black = this.state.colorBet
                bets.red += bets.red
                totals.black++
            } else if (spin.color == 'red') {
                balance += bets.red*2
                bets.red = this.state.colorBet
                bets.black += bets.black
                totals.red++
            }
            // Even/Odd
            if (spinNumber % 2 == 0) {
                balance += bets.even*2
                bets.even = this.state.evenOddBet
                bets.odd += bets.odd
                totals.even++
            } else {
                balance += bets.odd*2
                bets.odd = this.state.evenOddBet
                bets.even += bets.even
                totals.odd++
            }

            // Low/High
            if (spinNumber >= 1 && spinNumber <= 18) {
                balance += bets.low*2
                bets.low = this.state.halfBet
                bets.high += bets.high
                totals.low++
            } else if (spinNumber >= 19 && spinNumber <= 36){
                balance += bets.high*2
                bets.high = this.state.halfBet
                bets.low += bets.low
                totals.high++
            }
            // console.log(balance)
            this.setState({ balance })
            if (balance <= 0) {
                console.log('LOSE')
                this.setState({ result: `LOSE (spin #${index})`})
                break
            }
            
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value});
    }

    render() {
        const { classes } = this.props;
        return (
        <div>
            <br/>
            <p>Starting Cash</p>
            <TextField
                id="cash"
                label="Cash"
                value={this.state.cash}
                onChange={this.handleChange}
                margin="normal"
            />
            <p>Starting Bets</p>
            <TextField
                id="colorBet"
                label="Color"
                value={this.state.colorBet}
                onChange={this.handleChange}
                margin="normal"
            />
            <TextField
                id="evenOddBet"
                label="Even/Odd"
                value={this.state.evenOddBet}
                onChange={this.handleChange}
                margin="normal"
            />
            <TextField
                id="halfBet"
                label="Low/High"
                value={this.state.halfBet}
                onChange={this.handleChange}
                margin="normal"
            />
            <div>
            <TextField
                id="passes"
                label="passes"
                value={this.state.passes}
                onChange={this.handleChange}
                margin="normal"
            />
            <Button onClick={this.simulate} variant="raised" color="primary" className={classes.button}>
                Simulate
            </Button>
            </div>
            <br/>
            <div>
                <h2>{this.state.balance}</h2>
                <h1>{this.state.result}</h1>
            </div>

        </div>
        )
    }
}

export default withStyles(styles)(Roulette);