// 주문 상세 스크립트
const orderDetail = {
    id: 1,
    customer: '홍길동',
    date: '2026-07-01',
    total: 15000,
    items: [
        { name: '아메리카노', price: 4000 },
        { name: '카페라떼', price: 4500 },
        { name: '딸기 스무디', price: 5500 },
    ],
};
<!DOCTYPE html>
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('order-id').textContent = orderDetail.id;
    document.getElementById('customer-name').textContent = orderDetail.customer;
    document.getElementById('order-date').textContent = orderDetail.date;
    document.getElementById('total-amount').textContent = `${orderDetail.total.toLocaleString()}원`;

    const orderItemsList = document.getElementById('order-items');
    orderDetail.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price.toLocaleString()}원`;
        orderItemsList.appendChild(listItem);
    });
});
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>주문 상세</title>
    <link rel="stylesheet" href="detail.css">
</head>
<body>
    <h1>주문 상세</h1>
    <div id="order-detail">
        <p>주문 번호: <span id="order-id"></span></p>
        <p>고객 이름: <span id="customer-name"></span></p>
        <p>주문 날짜: <span id="order-date"></span></p>
        <p>총 금액: <span id="total-amount"></span></p>
        <ul id="order-items">
            <!-- 주문 아이템이 여기에 추가됩니다 -->
        </ul>
    </div>
    <script src="detail.js"></script>
</body>
</html>

