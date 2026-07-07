// 주문 목록 스크립트
const orders = [
    { id: 1, customer: '홍길동', date: '2026-07-07', total: 15000, status: 'completed', items: [{ name: '아메리카노', qty: 2 }] },
    { id: 2, customer: '김철수', date: '2026-07-07', total: 20000, status: 'pending', items: [{ name: '카페라떼', qty: 1 }, { name: '케이크', qty: 1 }] },
    { id: 3, customer: '이영희', date: '2026-07-06', total: 25000, status: 'cancelled', items: [{ name: '카푸치노', qty: 3 }] },
    { id: 4, customer: '박민수', date: '2026-07-06', total: 10000, status: 'completed', items: [{ name: '녹차', qty: 1 }] },
    { id: 5, customer: '최수진', date: '2026-07-05', total: 30000, status: 'pending', items: [{ name: '샌드위치', qty: 2 }, { name: '아이스티', qty: 1 }] },
];

const orderListGrid = document.getElementById('order-list-grid');
const noOrdersMessage = document.getElementById('no-orders');

function displayOrders(orderArray) {
    orderListGrid.innerHTML = ''; // Clear existing orders

    if (orderArray.length === 0) {
        noOrdersMessage.style.display = 'block';
        return;
    }

    noOrdersMessage.style.display = 'none';
    orderArray.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <h3>주문 번호: ${order.id}</h3>
            <p><strong>고객:</strong> ${order.customer}</p>
            <p><strong>날짜:</strong> ${order.date}</p>
            <p><strong>총 금액:</strong> ${order.total.toLocaleString()}원</p>
            <p><strong>상태:</strong> <span class="status ${order.status}">${order.status}</span></p>
            <p><strong>아이템:</strong> ${order.items.map(item => `${item.name} (${item.qty})`).join(', ')}</p>
            <a href="detail.html?orderId=${order.id}">상세 보기</a>
        `;
        orderListGrid.appendChild(orderItem);
    });
}

// Display only the 2-3 most recent orders initially
const recentOrders = orders.slice(0, 3); // Get the 3 most recent orders
displayOrders(recentOrders);

// In a real application, you would fetch data from a backend
// Example: fetch('/api/admin/orders').then(res => res.json()).then(data => displayOrders(data));

