// Payment Donut Chart
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('paymentChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Paid', 'Upcoming'],
            datasets: [{
                data: [30000, 8000],
                backgroundColor: ['#2c3e50', '#95a5a6'],
                borderWidth: 0,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => ` L.E ${ctx.parsed.toLocaleString()}`
                    }
                }
            }
        }
    });

    // Set logged-in user name from localStorage if available
    const saved = localStorage.getItem('rentoUserName');
    if (saved) document.getElementById('userName').textContent = saved;
});

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
