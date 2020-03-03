import React, { Component } from "react";
import API from "../../Service/API";
import { Link } from "react-router-dom";
import Footer from "../Menu/Footer";

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coupons: [],
      messages: [],
      menuState: "coupons"
    };

    this.handleSignout = this.handleSignout.bind(this);
    this.couponNumber = this.couponNumber.bind(this);
    this.API = new API();
  }

  componentDidMount() {
    let token = localStorage.getItem("jwt");
    //should validate
    if (!token) {
      this.props.history.replace("/");
    } else {
      let profile = this.API.getProfile();
      this.API.getCompanyCoupons(profile.id).then(res => {
        //            console.log('coupons', res);

        if (res.data.message === "Successful Responce.")
          this.setState({ coupons: res.data.items }, () => {
            //                  console.log('coupons', this.state)
          });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <Link to="/" className="active">
            понпон
          </Link>{" "}
          <Link to="/profile">Acount and Profile </Link>
          <Link to="/Service">Services and Discounts</Link>
          <Link to="/report">Reports and Messages</Link>
          <Link to="#Signout" className="topright" onClick={this.handleSignout}>
            выйти <i className="icon-signout" />
          </Link>
        </div>

        <div className="content">
          {this.state.menuState === "coupons" ? (
            <div className="pcard">
              <div className="container" id="guide">
                <div className="grouplist">
                  <h3>Certificates Issued on Behalf of You:</h3>

                  <ul>
                    {this.state.coupons.map(function(item, index) {
                      return (
                        <li key={index}>
                          <h3>
                            Certificate No. :{" "}
                            {this.couponNumber(
                              item.userid,
                              item.itemid,
                              item.expiry
                            )}
                          </h3>
                          <p>
                            <span>
                              {" "}
                              <strong>Service Description: </strong>
                            </span>
                            <span> {item.description} </span>
                          </p>
                          <p>
                            <span>
                              {" "}
                              <strong>Original Price: </strong>
                            </span>
                            <span> {item.price} &nbsp;&nbsp;</span>
                            <span>
                              {" "}
                              <strong>Discount Price: </strong>
                            </span>
                            <span> {item.dprice} </span>
                          </p>
                          <p>
                            <span>
                              {" "}
                              <strong> Bought at: </strong>
                            </span>
                            <span> {item.datecreated} &nbsp;&nbsp;</span>
                            <span>
                              {" "}
                              <strong> Expire at: </strong>
                            </span>
                            <span> {item.expiry} </span>
                          </p>
                        </li>
                      );
                    }, this)}
                  </ul>
                  {this.state.coupons.length
                    ? null
                    : "You dont have issued cerificate"}
                </div>
              </div>
            </div>
          ) : (
            <div className="pcard">
              <div className="card-header">You Messages </div>
              <div className="container" id="guide">
                <ul />
                {this.state.messages.length
                  ? null
                  : "You dont have any messages"}
              </div>
            </div>
          )}
          <Footer />
        </div>
      </div>
    );
  }

  handleSignout() {
    localStorage.removeItem("jwt");
    this.props.history.replace("/");
  }

  couponNumber(itemId, profileId, couponDate) {
    let coupon = new Date(couponDate).valueOf() + itemId + profileId;
    return coupon;
  }
}

export default Reports;
