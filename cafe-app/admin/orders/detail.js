document.addEventListener('DOMContentLoaded', () => {
    // URL에서 주문 ID 파싱
    const params = new URLSearchParams(window.location.search);
    let orderId = params.get('id');

    // localStorage에서 데이터 로드
    let storedOrders = localStorage.getItem('cafe_orders');
    if (!storedOrders) {
        alert('주문 데이터가 없습니다. 목록으로 돌아갑니다.');
        window.location.href = 'list.html';
        return;
    }

    const orders = JSON.parse(storedOrders);
    
    // 만약 파라미터가 없으면 임의로 첫번째 주문을 선택 (직접 접근 시 에러 방지)
    if (!orderId) {
        orderId = orders[0].id;
    }

    const orderDetail = orders.find(o => o.id === orderId);

    if (!orderDetail) {
        alert('해당 주문을 찾을 수 없습니다.');
        window.location.href = 'list.html';
        return;
    }

    // 기본 정보 바인딩
    document.getElementById('order-id').textContent = orderDetail.id;
    document.getElementById('customer-name').textContent = orderDetail.customer;
    document.getElementById('order-date').textContent = orderDetail.date;
    document.getElementById('customer-request').textContent = orderDetail.request || '없음';
    
    // 금액 바인딩
    document.getElementById('sub-total').textContent = `${orderDetail.total.toLocaleString()}원`;
    document.getElementById('total-amount').textContent = `${orderDetail.total.toLocaleString()}원`;

    // 아이템 리스트 렌더링
    const orderItemsList = document.getElementById('order-items');
    orderItemsList.innerHTML = ''; // 초기화

    orderDetail.items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'item-row';
        listItem.style.animationDelay = `${0.1 * index}s`;
        
        listItem.innerHTML = `
            <div class="item-img">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.option}</p>
            </div>
            <div class="item-qty">
                <span>x${item.qty}</span>
            </div>
            <div class="item-price">
                ${item.price.toLocaleString()}원
            </div>
        `;
        orderItemsList.appendChild(listItem);
    });

    // 영수증 출력 이벤트
    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });

    // 상태에 따른 "준비 완료" 버튼 초기화 함수
    const btnReady = document.getElementById('btn-ready');
    const updateButtonState = () => {
        if (orderDetail.status === 'ready') {
            btnReady.innerHTML = '<i class="ph ph-check-circle-fill"></i> 준비 완료됨';
            btnReady.style.background = '#10b981'; // 초록색 변경
            btnReady.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            btnReady.disabled = true;
        }
    };
    
    // 페이지 로드 시 상태 확인하여 버튼 업데이트
    updateButtonState();

    // 준비 완료 이벤트 처리
    btnReady.addEventListener('click', () => {
        // 데이터 업데이트
        orderDetail.status = 'ready';
        
        // localStorage 업데이트
        const index = orders.findIndex(o => o.id === orderId);
        orders[index] = orderDetail;
        localStorage.setItem('cafe_orders', JSON.stringify(orders));

        updateButtonState();
        
        // 브라우저 렌더링 후 alert 띄우기 위해 약간의 지연
        setTimeout(() => {
            alert('주문이 준비 완료 처리되었습니다!');
        }, 10);
    });
});
