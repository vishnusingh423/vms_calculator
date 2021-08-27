import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi";
import { connect, useSelector } from "react-redux";
import {
  get_user,
  buy_audible_withcredit,
  stripe_payment_audibles,
} from "../../Store/Actions";
import { CustomizedSnackbars, Image } from "../index";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiMinus } from "react-icons/ti";

import Rating from "react-rating";
import "./style.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function Audible({
  history,
  audible,
  stripe_payment_audibles,
  add_cart,
  buy_now,
  user,
  subscription,
  buy_loading,
  get_user,
  buy_audible_withcredit,
  tracks,
  setTracks,
}) {
  const classes = useStyles();
  const audio = useRef(null);
  const [alertType, setAlertType] = useState("error");
  const alert = useRef(null);

  const show_alert = (message, type) => {
    let Alert = alert.current;
    setAlertType(type);
    Alert.handleClick(message);
  };

  const playAudio = () => audio.current.play();

  const pauseAudio = () => audio.current.pause();

  const _audio = () => {
    if (!tracks[audible.id] || !tracks[audible.id].playing) {
      playAudio();
    } else if (tracks[audible.id].playing) {
      pauseAudio();
    }
  };

  const _update = () => {
    let currTime = audio.current.duration - audio.current.currentTime;
    if (currTime === 0) {
      audio.current.pause();
      setTracks({
        [audible.id]: {
          playing: false,
          time: currTime,
        },
      });
    } else {
      setTracks({
        [audible.id]: {
          playing: !audio.current.paused,
          time: currTime,
        },
      });
    }
  };
  const formatTime = (seconds) => {
    return seconds > 3600
      ? [
          parseInt(seconds / 60 / 60),
          parseInt((seconds / 60) % 60),
          parseInt(seconds % 60),
        ]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1")
      : [parseInt((seconds / 60) % 60), parseInt(seconds % 60)]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1");
  };

  const add_to_cart = () => {
    let obj = {
      image: audible.image,
      title: audible.title,
      author: "Punjabi audibles",
      price: 9,
      id: audible.id,
    };
    add_cart(obj);
  };
  const buy_item = () => {
    let obj = {
      image: audible.image,
      title: audible.title,
      author: "Punjabi audibles",
      price: 11,
      id: audible.id,
    };
    buy_now([obj], history);
  };
  const buy_with_credit = async (audible) => {
    if (Object.keys(user).length) {
      let credit = await get_credit();
      var alredy_buy = user.purchased_audibles
        ? user.purchased_audibles.indexOf(audible.id) !== -1
        : false;
      if (credit) {
        if (alredy_buy) {
          show_alert("You already buy the item!", "error");
        } else {
          buy_audible_withcredit(audible, user, show_alert, subscription);
        }
      } else {
        show_alert("You don't have credit!", "error");
      }
    } else {
      history.push("/about");
    }
  };

  const get_credit = async () => {
    const _user = await get_user(user.uid);
    const month = `${new Date(
      subscription.current_period_start * 1000
    ).getMonth()}_${new Date(
      subscription.current_period_start * 1000
    ).getFullYear()}`;
    if (Object.keys(subscription).length) {
      if (_user.credit_used[month]) {
        return _user.credit - _user.credit_used[month];
      } else {
        return _user.credit;
      }
    } else {
      return 0;
    }
  };
  const { locale } = useSelector(({ menu }) => menu);

  const getCost = () => {
    // aud
    const foundCostObject = audible?.price?.find(
      (aud) => aud.currencyCode.toLowerCase() === "aud"
    );
    if (foundCostObject) {
      return `${foundCostObject.currencyCode} ${foundCostObject.currencySymbol}${foundCostObject.cost}`;
    }
    return audible?.price?.[0]?.cost
      ? `${audible?.price?.[0]?.currencyCode} ${audible?.price?.[0]?.currencySymbol}${audible?.price?.[0]?.cost}`
      : null;
  };

  return (
    <Card className={classes.root}>
      <CustomizedSnackbars ref={alert} severity={alertType} />
      <div>
        <div>
          <Image
            image={{
              src: audible.image,
              alt: "",
              onClick: () => history.push(`/view/audible/${audible.id}`),
            }}
          />
          {/* <img
            onClick={() => history.push(`/view/audible/${audible.id}`)}
            src={audible.image}
            alt=""
            className="card-image"
          /> */}
        </div>
        <div className="btn-card">
          <button
            onClick={_audio}
            style={{
              justifyContent: "center",
              backgroundColor: "#e9eaea",
              color: "#000",
              fontWeight: "normal",
            }}
          >
            {tracks[audible.id] && tracks[audible.id].playing ? (
              <FiPauseCircle size={22} style={{ marginRight: 5 }} />
            ) : (
              <FiPlayCircle size={22} style={{ marginRight: 5 }} />
            )}
            {tracks[audible.id]
              ? formatTime(tracks[audible.id].time)
              : "Sample"}
          </button>
          <audio
            id={audible.id}
            preload="none"
            onTimeUpdate={_update}
            ref={audio}
          ></audio>
        </div>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <h5 className="color bold">{audible.title}</h5>
          <h6 className="color">
            {locale?.browse?.section3?.bookInfo?.author}
          </h6>
          <h6 className="color">
            {locale?.browse?.section3?.bookInfo?.category}
            {audible.category}
          </h6>
          <div>
            <Rating
              readonly={true}
              initialRating={audible.rating}
              emptySymbol={<AiOutlineStar size={24} color="#f7c168" />}
              fullSymbol={<AiFillStar size={24} color="#f7c168" />}
            />
          </div>
        </CardContent>
      </div>

      <div className="audible-buttons">
        <div className="p-20">
          <div className="btn-card mt-10">
            <span className="f-12">
              {/* Price to show from database */}

              {getCost() || "NOT AVAILABLE"}
            </span>
          </div>
          <div className="btn-card mt-10">
            <button onClick={add_to_cart}>
              {" "}
              {locale?.browse?.section3?.button?.buttonTitle1}
            </button>
          </div>
          <div className="btn-card mt-10">
            <button onClick={buy_item}>
              {" "}
              {locale?.browse?.section3?.button?.buttonTitle2}
            </button>
          </div>
          <div className="btn-card mt-10 credit-btn">
            <button
              disabled={buy_loading}
              onClick={() => buy_with_credit(audible)}
            >
              {locale?.browse?.section3?.button?.buttonTitle3}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    subscription: state.auth.subscription,
    buy_loading: state.main.buy_loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    get_user: (uid) => dispatch(get_user(uid)),
    buy_audible_withcredit: (item, user, Alert, subscription) =>
      dispatch(buy_audible_withcredit(item, user, Alert, subscription)),

    stripe_payment_audibles: (
      data,
      item,
      amount,
      user,
      Alert,
      cardElement,
      detail
    ) =>
      dispatch(
        stripe_payment_audibles(
          data,
          item,
          amount,
          user,
          Alert,
          cardElement,
          detail
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Audible);
