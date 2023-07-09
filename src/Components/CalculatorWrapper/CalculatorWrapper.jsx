import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

import './CalculatorWrapper.style.css';

class CalculatorWrapper extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      oldValue: '0',
      continueCalculation: true
    };
  }

  handleDigit = value => {
    const { displayValue, waitingForOperand, continueCalculation } = this.state;
    if (waitingForOperand) {
      this.setState({
        waitingForOperand: false,
        // oldValue: displayValue,
        displayValue: value
      });
    }
    else if (!continueCalculation) {
      this.setState({
        displayValue: value
      });
    }
    else {
      this.setState({
        displayValue: displayValue === '0' ? value : displayValue + value
      });
    }
  };

  handleDot = () => {
    const { displayValue, oldValue, operator } = this.state;
    if (operator !== null && oldValue === displayValue) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false,
        continueCalculation: true
      });
    } else {
      if (displayValue.indexOf('.') === -1) {
        //* indexOf returns the POSITION of first occurance of the value specified else returns -1
        this.setState({ displayValue: displayValue + '.', continueCalculation: true });
      }
    }
  };

  handleClear = () => {
    this.setState({
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      oldValue: '0'
    });
  };

  handleToggle = () => {
    const { displayValue } = this.state;
    if (displayValue !== '0')
      this.setState({
        displayValue:
          displayValue.charAt(0) === '-'
            ? displayValue.substr(1)
            : `-${displayValue}`
      });
  };

  handlePercentage = () => {
    const { displayValue } = this.state;
    const floatValue = parseFloat(displayValue);
    this.setState({
      displayValue: String(floatValue / 100)
    });
  };

  handleOperator = operatorType => {
    const { displayValue } = this.state;
    this.setState({
      oldValue: displayValue,
      operator: operatorType,
      waitingForOperand: true,
      continueCalculation: true
    });
  };

  handleEquals = () => {
    const { displayValue, oldValue, operator } = this.state;
    const arithemeticOperations = {
      '+': (x, y) => parseFloat(x) + parseFloat(y),
      '-': (x, y) => parseFloat(x) - parseFloat(y),
      '*': (x, y) => parseFloat(x) * parseFloat(y),
      '/': (x, y) => parseFloat(x) / parseFloat(y)
    };

    if (operator !== null)
      this.setState({
        displayValue: String(
          arithemeticOperations[`${operator}`](oldValue, displayValue)
        ),
        operator: null,
        continueCalculation:false
      });
  };

  render() {
    const { displayValue } = this.state;
    return (
        <div className="calc-wrapper">
          <div className="row">
            <Input
              input={displayValue}
              className={`${displayValue.length > 9 ? 'small-font' : ''}`}
            ></Input>
          </div>
          <div className="row">
            <Button className="red" handleClick={this.handleClear}>
              C
            </Button>
            <Button handleClick={this.handleToggle}>±</Button>
            <Button handleClick={this.handlePercentage}>%</Button>
            <Button handleClick={this.handleOperator}>/</Button>
          </div>
          <div className="row">
            <div className="column">
              <div>
                <Button handleClick={this.handleDigit}>7</Button>
                <Button handleClick={this.handleDigit}>8</Button>
                <Button handleClick={this.handleDigit}>9</Button>
                <Button handleClick={this.handleOperator}>*</Button>
              </div>
              <div>
                <Button handleClick={this.handleDigit}>4</Button>
                <Button handleClick={this.handleDigit}>5</Button>
                <Button handleClick={this.handleDigit}>6</Button>
                <Button handleClick={this.handleOperator}>-</Button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <div>
                <Button handleClick={this.handleDigit}>1</Button>
                <Button handleClick={this.handleDigit}>2</Button>
                <Button handleClick={this.handleDigit}>3</Button>
              </div>
              <div>
                <Button handleClick={this.handleDot}>.</Button>
                <Button handleClick={this.handleDigit}>0</Button>
                <Button className="green" handleClick={this.handleEquals}>
                  =
                </Button>
              </div>
            </div>
            <div className="column">
              <Button className="violet" handleClick={this.handleOperator}>
                +
              </Button>
            </div>
          </div>
        </div>
    );
  }
}
export default CalculatorWrapper;
