import { formatPrice } from '../js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const ordersList = document.getElementById('orders-list');
    const orders = JSON.parse(localStorage.getItem('cafe_orders') || '[]');

    const renderOrders = () => {
        ordersList.innerHTML = '';

        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-state glass-panel">
                    <i class="fa-solid fa-receipt"></i>
                    <h3>주문 내역이 없습니다.</h3>
                    <p>아직 카페에서 주문하신 내역이 없네요!</p>
                </div>
            `;
            return;
        }

        // 최신 주문이 위로 오도록 정렬 (날짜 데이터가 없거나 유효하지 않은 경우 대비)
        orders.sort((a, b) => {
            const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
            const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
            return dateB - dateA;
        });

        orders.forEach(order => {
            const li = document.createElement('li');
            li.className = 'order-card glass-panel';
            
            const dateObj = new Date(order.orderDate);
            const dateString = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
            
            // 대표 메뉴 이름 생성 (예: 아메리카노 외 2건)
            let orderSummaryText = '';
            if (order.items && order.items.length > 0) {
                if (order.items.length === 1) {
                    orderSummaryText = `${order.items[0].name} ${order.items[0].quantity}개`;
                } else {
                    orderSummaryText = `${order.items[0].name} 외 ${order.items.length - 1}건`;
                }
            }

            li.innerHTML = `
                <div class="order-header">
                    <span class="order-date"><i class="fa-regular fa-calendar"></i> ${dateString}</span>
                    <span class="order-status">${order.status || '주문완료'}</span>
                </div>
                <div class="order-body">
                    <div class="order-summary">
                        <strong>${orderSummaryText}</strong>
                    </div>
                    <div class="order-total">
                        ${formatPrice(order.totalAmount || 0)}
                    </div>
                </div>
                <a href="detail.html?id=${order.id}" class="detail-btn">상세 보기</a>
            `;
            ordersList.appendChild(li);
        });
    };

    renderOrders();
});