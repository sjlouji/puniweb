import axios from 'axios';
import {
    PAYMENTLOADING,
    PAYMENTDONE
} from './types';


// REGISTER USER
export const payment = ({ razorpay_payment_id,razorpay_order_id, razorpay_signature, currency,amount }) => (dispatch) => {

  const body = { razorpay_payment_id,razorpay_order_id, razorpay_signature, currency,amount };
    console.log(body)
  axios
    .post('http://192.168.43.88:8000/youtube/api/payment', body)
    .then((res) => {
      dispatch({
        type: PAYMENTDONE,
        payload: res.data,
      });
    })
    .catch((err) => {
        console.log(err.response)
    });
};