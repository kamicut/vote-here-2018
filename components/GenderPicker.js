import {h, Component} from 'preact';

class GenderPicker extends Component {
  getInitialState() {
    return {
      'male': false,
      'female': false
    };
  }

  toggle(e, gender) {
    e.preventDefault();
    var newState = {};
    Object.keys(this.state).forEach((key) => {
      newState[key] = false;
    });
    newState[gender] = true;
    this.setState(newState);
    this.props.onClick((gender === 'female'? 'F': 'M'));
  }

  render(props, state) {
    return h(
      'div', {id: 'genderpicker'},
      h('label', {}, 'Gender:'),
      h('br'),
      h('input', {
        type: 'radio',
        value: 'F',
        checked: state.female,
        onClick: (e) => this.toggle.call(this, e, 'female')
      }),
      'Female',
      h('br'),
      h('input', {
        type: 'radio',
        value: 'M',
        checked: state.male,
        onClick: (e) => this.toggle.call(this, e, 'male')
      }, 'Male'),
      'Male',
      h('br')
    );
  }
}

export default GenderPicker;
