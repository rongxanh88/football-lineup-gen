import React, { Component } from 'react';
//import CSS

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'CSV Filepath'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    //make post api call here
    debugger
    event.preventDefault();
  }

  render() {
    return (
      <form className="upload-form" onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="file" name="salaryData" id="fileToUpload" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Upload File"/>
      </form>
    );
  }
}

export default UploadForm;