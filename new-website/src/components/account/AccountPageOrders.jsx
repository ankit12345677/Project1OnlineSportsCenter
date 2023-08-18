// react
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// third-party
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Helmet } from "react-helmet-async";
import { GetOrderHistory } from "../../store/order";

// application
import Pagination from "../shared/Pagination";

// data stubs
import theme from "../../data/theme";
function AccountPageOrders({ orderlist, GetOrderHistory }) {
  const [orders, setOrderList] = useState([]);
  useEffect(() => {
    let canceled = false;
    GetOrderHistory();
    if (orderlist) {
      if (canceled) {
        return;
      }
      setOrderList(orderlist.data);
    }

    return () => {
      canceled = true;
    };
  }, []);
  return (
    <div className="card">
      <Helmet>
        <title>{`Order History — ${theme.name}`}</title>
      </Helmet>

      <div className="card-header">
        <h5>Order History</h5>
      </div>
      <div className="card-divider" />
      <div className="card-table">
        <div className="table-responsive-sm">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                {/* <th>Status</th> */}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* {ordersList} */}
              {orders.items?.map((order) => (
                <tr key={order.OrderNo}>
                  <td>
                    <Link
                      to={`/account/orders/${order.id}`}
                    >{`#${order.OrderNo}`}</Link>
                  </td>
                  <td>
                    <span className="delivery-time">
                      <Moment format="MMMM Do YYYY">{order.OrderDate}</Moment>
                    </span>
                    <span className="delivery-time">
                      <Moment format=" h:mm:ss a">{order.OrderDate}</Moment>
                    </span>
                  </td>

                  {/* <td>{order.status}</td> */}
                  <td>
                    Rs.{order.Total} for {order.count} items{" "}
                  </td>
                </tr>
              ))}
              ;
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-divider" />
      <div className="card-footer">
        <Pagination current={orderlist.pages} total={orderlist.count} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  orderlist: state.order.orders,
});

const mapDispatchToProps = {
  GetOrderHistory,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPageOrders);
