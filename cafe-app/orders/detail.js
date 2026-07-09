import { formatPrice } from '../js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const container = document.getElementById('order-detail-content');
    const subtitle = document.getElementById('order-date-subtitle');

    if (!orderId) {
        showError('유효하지 않은 접근입니다.');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('cafe_orders') || '[]');
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        showError('주문 정보를 찾을 수 없습니다.');
        return;
    }

    const dateObj = new Date(order.orderDate);
    const dateString = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
    
    subtitle.textContent = `주문 일시: ${dateString}`;

    let itemsHtml = '';
    order.items.forEach(item => {
        itemsHtml += `
            <li class="item-card">
                <div class="item-main">
                    <div class="item-icon">
                        <i class="fa-solid ${item.icon || 'fa-mug-hot'}"></i>
                    </div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${formatPrice(item.price || 0)} x ${item.quantity || 1}개</p>
                    </div>
                </div>
                <div class="item-price-total">
                    ${formatPrice((item.price || 0) * (item.quantity || 1))}
                </div>
            </li>
        `;
    });

    container.innerHTML = `
        <div class="glass-panel">
            <div class="order-info-section">
                <h3 class="section-title">주문 정보</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">주문 번호</span>
                        <span class="info-value">${order.id}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">주문 상태</span>
                        <span class="info-value" style="color: var(--primary-color);">${order.status || '주문완료'}</span>
                    </div>
                </div>
            </div>

            <div class="order-items-section">
                <h3 class="section-title">주문 메뉴</h3>
                <ul class="item-list">
                    ${itemsHtml}
                </ul>
            </div>

            <div class="order-summary-section">
                <div class="summary-row">
                    <span>상품 금액</span>
                    <span>${formatPrice(order.subtotal || order.totalAmount || 0)}</span>
                </div>
                <div class="summary-row">
                    <span>할인 금액</span>
                    <span class="highlight">-${formatPrice(order.discount || 0)}</span>
                </div>
                <div class="summary-row total">
                    <span>총 결제 금액</span>
                    <span>${formatPrice(order.totalAmount || 0)}</span>
                </div>
            </div>
        </div>
    `;

    function showError(message) {
        subtitle.textContent = '오류 발생';
        container.innerHTML = `
            <div class="glass-panel error-state">
                <h3><i class="fa-solid fa-circle-exclamation"></i></h3>
                <p>${message}</p>
                <a href="list.html" class="back-btn" style="position:static; justify-content:center; margin-top:20px;">
                    목록으로 돌아가기
                </a>
            </div>
        `;
    }
});