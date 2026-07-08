// 초기 더미 데이터
const initialOrders = [
    { 
        id: 'ORD-20260708-001', customer: '홍길동', date: '2026-07-08 09:24', total: 14000, status: 'pending',
        items: [
            { name: '아메리카노', option: 'HOT / Regular / 기본 샷', price: 4000, qty: 1, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80' },
            { name: '카페라떼', option: 'ICE / Large / 오트밀크 변경', price: 4500, qty: 1, img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=150&q=80' },
            { name: '딸기 스무디', option: 'ICE / Regular / 달게', price: 5500, qty: 1, img: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c70a?w=150&q=80' }
        ],
        request: "시럽 1번 빼주세요."
    },
    { 
        id: 'ORD-20260708-002', customer: '김철수', date: '2026-07-08 09:10', total: 20000, status: 'ready',
        items: [
            { name: '아메리카노', option: 'ICE / Large / 샷 추가', price: 5000, qty: 4, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80' }
        ],
        request: "빨대 많이 챙겨주세요."
    },
    { 
        id: 'ORD-20260708-003', customer: '이영희', date: '2026-07-08 08:45', total: 8500, status: 'ready',
        items: [
            { name: '바닐라 라떼', option: 'HOT / Regular', price: 4500, qty: 1, img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=150&q=80' },
            { name: '레몬 에이드', option: 'ICE / Regular', price: 4000, qty: 1, img: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c70a?w=150&q=80' }
        ],
        request: "픽업 바로 갈게요."
    },
    { 
        id: 'ORD-20260707-015', customer: '박민수', date: '2026-07-07 18:30', total: 12500, status: 'ready',
        items: [
            { name: '카라멜 마끼아또', option: 'ICE / Large', price: 5500, qty: 1, img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=150&q=80' },
            { name: '초코칩 프라푸치노', option: 'ICE / Large / 휘핑 많이', price: 7000, qty: 1, img: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c70a?w=150&q=80' }
        ],
        request: "없음"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // localStorage에서 데이터 가져오기 (없으면 초기 데이터 세팅)
    let storedOrders = localStorage.getItem('cafe_orders');
    if (!storedOrders) {
        localStorage.setItem('cafe_orders', JSON.stringify(initialOrders));
        storedOrders = JSON.stringify(initialOrders);
    }
    const orders = JSON.parse(storedOrders);

    const orderListBody = document.getElementById('order-list-body');
    orderListBody.innerHTML = '';

    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        
        // 상태에 따른 뱃지 스타일링
        const statusClass = order.status === 'pending' ? 'pending' : 'ready';
        const statusText = order.status === 'pending' ? '준비 중' : '준비 완료';

        // 지연 애니메이션 적용
        row.style.animation = `fadeIn 0.4s ease-out ${index * 0.05}s backwards`;

        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td><strong>${order.total.toLocaleString()}원</strong></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <a href="detail.html?id=${order.id}" class="btn-detail">
                    상세보기 <i class="ph ph-arrow-right"></i>
                </a>
            </td>
        `;
        orderListBody.appendChild(row);
    });
});
