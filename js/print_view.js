(function() {
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === '`') {
            e.preventDefault();
            const body = document.documentElement;
            body.classList.toggle('print-view-active');

            if (body.classList.contains('print-view-active')) {
                const qrCodeImg = document.getElementById('qr-code');
                if (qrCodeImg) {
                    const currentPageUrl = window.location.href;
                    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(currentPageUrl)}`;
                }
            }
        }
    });
})();