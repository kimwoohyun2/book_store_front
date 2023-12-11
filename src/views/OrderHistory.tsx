import { useState, useEffect } from "react";
import axios from "axios";
import jquery from "jquery";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { OrderHistoryType } from "../types/global";

function OrderHistory() {
  // useSelector  -------------------------------------------------------------------
  const { username } = useSelector((state: RootState) => state.common);

  // useState
  const [orderHistoryList, setOrderHistoryList] = useState([]);

  // useEffect
  useEffect(() => {
    axios
      .get(
        "http://52.79.177.224:8081/order/getBookOrderHistory",
        // "http://localhost:8081/order/getBookOrderHistory",
        { params: { username: username } }
      )
      .then((res) => {
        if (!res || !res.data || res.status !== 200) {
          alert("API 호출 중 에러가 발생했습니다.");
          return;
        }

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>  OrderHistory.tsx  28");
        console.log(res.data);

        setOrderHistoryList(res.data);

        jquery(function () {
          // 주문번호가 같은 셀끼리 병합처리(jquery 이용) (start)  ------------
          jquery(".order_no").each(function () {
            var rows = jquery(
              ".order_no:contains('" + jquery(this).text() + "')"
            );

            console.log(">>>>>>>>>>>>>>>>>>>>>  OrderHistory.tsx  40");
            if (rows.length > 1) {
              //동일한 rows값이 1개 이상이면 열을 합침
              rows.eq(0).attr("rowspan", rows.length);
              rows.not(":eq(0)").remove();
            }
          });
          // 주문번호가 같은 셀끼리 병합처리(jquery 이용) (end)  --------------
          // 주문일시가 같은 셀끼리 병합처리(jquery 이용) (start)  ------------
          jquery(".order_date").each(function () {
            var rows = jquery(
              ".order_date:contains('" + jquery(this).text() + "')"
            );

            console.log(">>>>>>>>>>>>>>>>>>>>>  OrderHistory.tsx  54");
            if (rows.length > 1) {
              //동일한 rows값이 1개 이상이면 열을 합침
              rows.eq(0).attr("rowspan", rows.length);
              rows.not(":eq(0)").remove();
            }
          });
          // 주문일시가 같은 셀끼리 병합처리(jquery 이용) (end)  --------------
        });
      })
      .catch((err) => {
        alert("API 호출 중 에러가 발생했습니다.");
        console.log("ContainerFilter.jsx > error:", err);
      });
  }, []);

  return (
    <div className="doc-order-history">
      <h1>주문 내역</h1>
      <div className="order-history-content">
        <table className="tbl_prod">
          <colgroup>
            <col className="col1" />
            <col className="col2" />
            <col className="col3" />
            <col className="col4" />
            <col className="col5" />
            <col className="col6" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">주문번호</th>
              <th scope="col">주문상세번호</th>
              <th scope="col">도서번호</th>
              <th scope="col">도서이름</th>
              <th scope="col">주문가격</th>
              <th scope="col">주문일시</th>
            </tr>
          </thead>
          <tbody>
            {orderHistoryList.map((item: OrderHistoryType, index: number) => {
              return (
                <tr key={item.orderDetailNo}>
                  {/* <td>
                    <span>{item.orderNo}</span>
                  </td> */}
                  <td className="order_no">{item.orderNo}</td>
                  {/* <td>
                    <span>{item.orderDetailNo}</span>
                  </td> */}
                  <td>{item.orderDetailNo}</td>
                  {/* <td>
                    <span>{item.bookNo}</span>
                  </td> */}
                  <td>{item.bookNo}</td>
                  {/* <td>
                    <span>{item.bookTitle}</span>
                  </td> */}
                  <td>{item.bookTitle}</td>
                  {/* <td>
                    <span>{Number(item.orderPrice).toLocaleString()} 원</span>
                  </td> */}
                  <td>{Number(item.orderPrice).toLocaleString()} 원</td>
                  {/* <td>
                    <span>{item.orderDate}</span>
                  </td> */}
                  {/* <td className="table_td">{item.orderDate}</td> */}
                  <td className="order_date">{item.orderDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
