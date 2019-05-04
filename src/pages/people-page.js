import React from 'react';

import LocationForm from '../components/location-form';


class PeoplePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormFilling = this.handleFormFilling.bind(this);
  }

  render() {
    return (
      <div className="people-page-wrapper">

        <LocationForm onFilled={this.handleFormFilling}/>

      </div>
    );
  }

  handleFormFilling(formKey, formValue) {
    this.setState({
      [formKey]: formValue
    });

    console.log('PeoplePage state after handlingFormFilling -> ', this.state);
  }

}

export default PeoplePage;
