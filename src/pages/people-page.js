import React from 'react';

import LocationForm from '../components/people/location';
import IdentificationForm from '../components/people/identification';
import ContactForm from '../components/people/contact';

class PeoplePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormFilling = this.handleFormFilling.bind(this);
  }

  render() {
    return (
      <div className="people-page-wrapper">

        <IdentificationForm onFilled={this.handleFormFilling}/>
        <LocationForm onFilled={this.handleFormFilling}/>
        <ContactForm onFilled={this.handleFormFilling}/>

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
