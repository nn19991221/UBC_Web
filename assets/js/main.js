<script>
(function () {
  function initBrandScroller() {
    var scroller = document.querySelector('.brand-scroller');
    if (!scroller) return;
    var track = scroller.querySelector('.brand-track');
    if (!track) return;

    // 只保留一组时，自动克隆为两组，避免手工不一致引发“跳回”
    if (!track.dataset.cloned) {
      track.innerHTML = track.innerHTML + track.innerHTML;
      track.dataset.cloned = 'true';
    }

    // 计算滚动距离 = 整条内容宽度的一半（像素），写入 CSS 变量
    function setDistance() {
      var dist = track.scrollWidth / 2;
      track.style.setProperty('--brand-scroll-dist', dist + 'px');
    }

    // 等图片加载完再计算，避免宽度为 0
    var imgs = track.querySelectorAll('img');
    var pending = 0;

    function done() {
      pending--;
      if (pending <= 0) setDistance();
    }

    imgs.forEach(function (img) {
      if (!img.complete) {
        pending++;
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });

    if (pending === 0) setDistance(); // 都已缓存完成

    // 视口变化时重算，防止跳帧
    window.addEventListener('resize', setDistance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrandScroller);
  } else {
    initBrandScroller();
  }
})();
</script>
