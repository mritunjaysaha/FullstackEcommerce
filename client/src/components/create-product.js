import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user-service";

import axios from "axios";
import authHeader from "../services/auth-header";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      imageURL: null,
      price: "",
      selectedFile: [],
      successful: false,
    };
    this.handleCreateProduct = this.handleCreateProduct.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeFile(e) {
    let files = e.target.files;
    this.setState({ files: files[0] });
    this.setState(
      {
        imageURL: URL.createObjectURL(e.target.files[0]),
        selectedFile: files[0],
      },
      () => {
        console.log(this.state.selectedFile);
      }
    );
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  handleCreateProduct(e) {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append(
      "imageFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios
      .post("http://localhost:8080/api/product/upload", uploadData, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          UserService.addProduct(
            this.state.name,
            this.state.category,
            this.state.price
          );
        }
      })
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="card card-container">
        <Form
          onSubmit={this.handleCreateProduct}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChangeName}
              ></Input>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Input
                type="text"
                className="form-control"
                name="category"
                value={this.state.category}
                onChange={this.onChangeCategory}
              ></Input>
            </div>
            <div className="form-group">
              <Input type="file" onChange={(e) => this.onChangeFile(e)} />
              <img src={this.state.imageURL} height="200" width="200" alt="" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Price</label>
              <Input
                type="text"
                className="form-control"
                name="price"
                value={this.state.price}
                onChange={this.onChangePrice}
              ></Input>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Add Product</button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default CreateProduct;
