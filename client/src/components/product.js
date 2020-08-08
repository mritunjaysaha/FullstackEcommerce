import React, { Component } from "react";
import UserService from "../services/user-service";
import CreateProduct from "./create-product";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      toggle: false,
    };
  }

  componentDidMount() {
    let arr = [];
    UserService.getProducts().then(
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

  handleClick() {
    this.setState((prevState) => ({ toggle: !prevState.toggle }));
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.handleClick()}
        >
          Add Product
        </button>
        <div className="container row" style={{ marginTop: "30px" }}>
          <div className="col-md-6">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.content.map((product) => (
                  <tr key={product.id}>
                    {<td>{product.id}</td>}
                    {<td>{product.name}</td>}
                    <td>
                      <button type="button" className="btn btn-primary">
                        Show Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            {this.state.toggle ? <CreateProduct /> : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Product;
