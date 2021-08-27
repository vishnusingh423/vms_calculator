import React, { useRef, useState } from "react";
import LOGO from "../../Assets/images/app-logo.png";
import LOGO1 from "../../Assets/images/Codingada-removebg-preview.png";
import "antd/dist/antd.css";

import { FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineShopping } from "react-icons/ai";
import { MdLanguage } from "react-icons/md";
import Popup from "reactjs-popup";
import { Sidebar, Input } from "../index";
import { slideInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";
import CART from "../../Assets/images/cart.png";
import { Button } from "../index";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  signOut,
  delete_cart,
  buy_now,
  buy_membership,
} from "../../Store/Actions";
import "./style.css";
import { changeSettings } from "../../Store/Actions/menu";
import { Popconfirm, message, Menu, Dropdown, Table, Tag, Space } from "antd";

import { DownOutlined } from "@ant-design/icons";

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const columns = [
  {
    title: "Cources",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Intro",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["reactJs", "springboot"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["c++"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["java", "python"],
  },
];
const menu = (
  <Menu>
    <Table columns={columns} dataSource={data} pagination={false} />
  </Menu>
);

const text = "Are you sure to delete this task?";

function confirm() {
  message.info("Clicked on Yes.");
}
const styles = {
  slideInDown: {
    animation: "x 0.8s",
    animationName: Radium.keyframes(slideInDown, "slideInDown"),
  },
};

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const LangauagePopup = () => {
  const lang = ["English", "Punjabi"];
  const popupRef = useRef();

  const dispatch = useDispatch();
  const onItemClick = (language) => {
    dispatch(changeSettings(language));
    popupRef.current.closePopup();
  };
  return (
    <div>
      <Popup
        className="popup-div"
        ref={popupRef}
        closeOnDocumentClick={true}
        contentStyle={{ maxWidth: 150 }}
        trigger={
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
            }}
          >
            <MdLanguage size={23} style={{ color: "#5f6368" }} />
          </button>
        }
        position="bottom right"
      >
        <div style={{ marginTop: 12 }}>
          {lang?.map((language) => (
            <div className="text-style">
              <h6 onClick={() => onItemClick(language)}>{language}</h6>
            </div>
          ))}
        </div>
      </Popup>
    </div>
  );
};

const UserPopup = ({ history, user, signOut, credit }) => (
  <Popup
    className="popup-div"
    // on="hover"
    trigger={
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          outline: "none",
        }}
      >
        <FiUser size={20} style={{ color: "#5f6368" }} />
      </button>
    }
    position="bottom right"
  >
    {Object.keys(user).length ? (
      <div>
        <div>
          <span className="user-name">
            {jsUcfirst(user.firstName)}' Account
          </span>
          <h6>
            {credit !== false
              ? `(${credit}) credits available`
              : "Not Enrolled"}
          </h6>
        </div>
        <hr />
        <div className="text-style">
          <h6 onClick={() => history.push("/account/setting")}>
            Manage account
          </h6>
        </div>
        <div className="text-style">
          <h6 onClick={() => history.push("/account/membership")}>
            Manage membership
          </h6>
        </div>
        <div className="text-style">
          <h6 onClick={() => history.push("/account/library")}>My Library</h6>
        </div>
        <div className="text-style">
          <h6 onClick={() => signOut(history)}>Logout</h6>
        </div>
      </div>
    ) : (
      <div>
        <div onClick={() => history.push("/login")}>
          <span>Sign In </span>
        </div>
        <hr />
        <div onClick={() => history.push("/signup")}>
          <span>Register</span>
        </div>
      </div>
    )}
  </Popup>
);

const CartPopup = ({ history, cart, delete_cart, buy_now, sum }) => (
  <Popup
    style={{ width: 500 }}
    className="popup-div-cart"
    // on="hover"
    trigger={
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          outline: "none",
        }}
      >
        <AiOutlineShopping size={24} style={{ color: "#5f6368" }} />
      </button>
    }
    position="bottom right"
  >
    {!cart.length ? (
      <div className="empty">
        <img src={CART} alt="" width="200" />
      </div>
    ) : (
      <div className="cart-scroll">
        <div className="cart-popup">
          {cart.map((v, i) => {
            return (
              <div key={i} className="cart-item">
                <div>
                  <img src={v.image} alt="" width="70" />
                </div>
                <div style={{ flex: 2, marginLeft: 5 }}>
                  <span className="bold">{v.title}</span>
                  <br />
                  <span className="f-10">{v.author}</span>
                  <br />
                  <span className="f-10">${v.price}</span>
                </div>
                <div onClick={() => delete_cart(i)} className="dlt-btn">
                  <AiOutlineDelete size={22} />
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 20 }}>
            <div>
              <span>Total: ${sum}</span>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button onClick={() => buy_now([], history)} title="Checkout" />
          </div>
        </div>
      </div>
    )}
  </Popup>
);

function Header({
  title,
  history,
  user,
  signOut,
  cart,
  delete_cart,
  buy_now,
  subscription,
  contact,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [search_value, setSearchValue] = useState("");
  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const search_data = (e) => {
    if (e.keyCode === 13) {
      history.push(`/shop/All Categories/${search_value}`);
    }
  };

  let sum = null;

  cart.forEach(function (value) {
    sum += value.price;
  });

  const get_credit = () => {
    const month = `${new Date(
      subscription.current_period_start * 1000
    ).getMonth()}_${new Date(
      subscription.current_period_start * 1000
    ).getFullYear()}`;
    if (Object.keys(subscription).length) {
      if (user.credit_used[month]) {
        return user.credit - user.credit_used[month];
      } else {
        return user.credit;
      }
    } else {
      return false;
    }
  };
  const { locale } = useSelector(({ menu }) => menu);

  return (
    <StyleRoot>
      <nav className="navbar navbar-light  navbar-expand-md header-bar fixed-top ">
        <span onClick={() => history.push("/")} className="navbar-brand mr-0">
          <img src={LOGO1} alt="" className="logo" />
        </span>
        <Sidebar
          signOut={signOut}
          user={user}
          history={history}
          toggleDrawer={toggleDrawer}
          open={open}
        />
        <button
          onClick={() => toggleDrawer(true)}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse collapse justify-content-between align-items-center w-100"
          id="collapsingNavbar2"
        >
          {console.log(title, "title")}
          {!search ? (
            <ul className="navbar-nav mx-auto text-center">
              {title === "Home" ||
              title === "Shop" ||
              title === "About" ||
              title === "Subscription" ? (
                <>
                  <li
                    onClick={() => history.push("/")}
                    className="nav-item main-head"
                  >
                    <span
                      style={{ color: title === "Home" && "#f7c168" }}
                      className="nav-link"
                    >
                      {locale?.home?.name}
                    </span>
                  </li>

                  <li
                    onClick={() => history.push("/shop")}
                    className="nav-item main-head"
                  >
                    <span
                      style={{ color: title === "Shop" && "#f7c168" }}
                      className="nav-link"
                    >
                      <Dropdown overlay={menu}>
                        <a onClick={(e) => e.preventDefault()}>
                          {locale?.browse?.name}
                        </a>
                      </Dropdown>
                    </span>
                  </li>
                  <li
                    onClick={() => history.push("/about")}
                    className="nav-item main-head"
                  >
                    <span
                      style={{ color: title === "About" && "#f7c168" }}
                      className="nav-link"
                    >
                      {locale?.about?.name}
                    </span>
                  </li>
                  <li
                    onClick={() => history.push("/subscription")}
                    className="nav-item main-head"
                  >
                    <span
                      style={{ color: title === "Subscription" && "#f7c168" }}
                      className="nav-link"
                    >
                      {locale?.subscription?.name}
                    </span>
                  </li>
                </>
              ) : (
                <li className="nav-item main-head single-item">
                  <span className="nav-link">{title}</span>
                </li>
              )}
            </ul>
          ) : (
            <ul
              style={styles.slideInDown}
              className="navbar-nav mx-auto text-center"
            >
              <li className="nav-item main-head search-bar">
                <span className="nav-link">
                  <Input
                    onkeydown={search_data}
                    hideSearch={() => setSearch(false)}
                    autoFocus={true}
                    placeholder="Search for greate punjabi audibles"
                    value={search_value}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </span>
              </li>
            </ul>
          )}
          <ul className="" style={{ marginRight: 195 }}>
            <li className="">
              <span className="nav-link">
                <UserPopup
                  credit={get_credit()}
                  signOut={signOut}
                  user={user}
                  history={history}
                />
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </StyleRoot>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    subscription: state.auth.subscription,
    cart: state.main.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (history) => dispatch(signOut(history)),
    delete_cart: (i) => dispatch(delete_cart(i)),
    buy_now: (item, history) => dispatch(buy_now(item, history)),
    buy_membership: (item, history) => dispatch(buy_membership(item, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
