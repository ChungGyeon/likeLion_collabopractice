// 장바구니 관리 스크립트 - 에러 수정 및 로직 개선
const basketItems = [
    { id: 1, name: '아메리카노', price: 4000, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80' },
    { id: 2, name: '카페라떼', price: 4500, img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=150&q=80' },
    { id: 3, name: '딸기 스무디', price: 5500, img: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c70a?w=150&q=80' },
];

document.addEventListener('DOMContentLoaded', () => {
    const basketList = document.getElementById('basket-items');
    const totalPriceEl = document.getElementById('total-price');
    let total = 0;

    // 초기화
    basketList.innerHTML = '';

    basketItems.forEach((item, index) => {
        total += item.price;
        const listItem = document.createElement('li');
        listItem.className = 'basket-item';
        
        // 순차적인 등장 애니메이션 적용
        listItem.style.animation = `fadeIn 0.4s ease-out ${index * 0.1}s backwards`;
        
        listItem.innerHTML = `
            <div class="item-img">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.price.toLocaleString()}원</div>
            </div>
            <div class="item-actions">
                <button class="delete-btn" onclick="alert('삭제 기능은 추후 연동됩니다.')">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
        `;
        basketList.appendChild(listItem);
    });

    // 총 금액 업데이트
    totalPriceEl.textContent = `${total.toLocaleString()}원`;
    
    // 주문하기 버튼
    const checkoutBtn = document.querySelector('.btn-primary');
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('주문이 완료되었습니다!');
        });
    }
});
