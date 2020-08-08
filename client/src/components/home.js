import React, { Component } from "react";

import UserService from "../services/user-service";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    let arr = [];
    UserService.getPublicContent().then(
      (response) => {
        arr = Object.values(response.data);
        for (let key in arr) {
          this.setState({
            content: [...this.state.content, arr[key]],
          });
        }
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container row ">
        {this.state.content.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card card-block">
              <img
                src={"data:image/jpeg;base64," + product.image}
                alt="product-img"
                height="150"
                width="150"
                style={({ marginLeft: "60px" }, { marginTop: "10px" })}
              />
              <div>
                <p style={{ marginLeft: "60px" }}>
                  <strong>
                    {product.name}:${product.price}
                  </strong>
                </p>
              </div>
              <div className="offset-md-4">
                <button className="btn btn-primary btn-sm">Add To Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
