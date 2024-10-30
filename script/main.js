function animateImage(image) {
    return image.animate([
      { transform: 'translateY(0) rotate(0deg) scale(1)' },
      { transform: 'translateY(-100px) rotate(360deg) scale(0)' }
    ], {
      duration: 2000,
      easing: 'ease-in-out'
    });
  }
  
  function startAnimation() {
    const alice1 = document.getElementById('fate1');
    const alice2 = document.getElementById('fate2');
    const alice3 = document.getElementById('fate3');
  
    animateImage(alice1).finished
      .then(() => animateImage(fate2).finished)
      .then(() => animateImage(fate3).finished)
      .then(startAnimation); // 重新开始动画
  }
  
  startAnimation(); // 初始调用
  