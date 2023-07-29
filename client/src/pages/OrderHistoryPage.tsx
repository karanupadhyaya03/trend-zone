import { useNavigate } from 'react-router-dom';
import { useGetOrderHistoryQuery } from '../hooks/orderHooks';
import MessageBox from '../components/MessageBox';
import getError from '../utils/getError';
import { ApiError } from '../types/ApiError';
import LoadingBox from '../components/LoadingBox';
import { Button } from 'react-bootstrap';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">DATE</th>
          <th scope="col">TOTAL</th>
          <th scope="col">PAID</th>
          <th scope="col">DELIVERED</th>
          <th scope="col">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {orders!.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>${order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
            <td>
              {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}
            </td>
            <td>
              <Button
                type="button"
                variant="light"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderHistoryPage;
