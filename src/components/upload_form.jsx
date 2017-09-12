import React, { Component } from 'react';
import axios from 'axios';

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
    const form = document.getElementById('form');
    if (validateFile(form[1].value)) {
      const formData = new FormData(form);
      const postUrl = 'https://fantasy-football-api-1703.herokuapp.com/api/v1/salaries';
      
      axios.post(postUrl, formData)
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }
    event.preventDefault();
  }

  render() {
    return (
      <form id="form" className="upload-form" onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="file" name="salaryData" id="fileToUpload" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Upload File"/>
      </form>
    );
  }
}

const validateFile = (inputFile) => {
  const extErrorMessage = "Only image file with extension: .csv is allowed";
  const allowedExtension = "csv";
  const extName = inputFile.split('.').pop();
  let extError = false;

  if (extName !== allowedExtension) {extError = true;};

  if (extError) {
    window.alert(extErrorMessage);
    return false;
  } else {
    return true;
  }
}

export default UploadForm;