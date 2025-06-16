document.addEventListener('DOMContentLoaded', () => {
    const mockData = {
        revenue: {
            value: 48950,
            delta: 12.5,
            positive: true
        },
        users: {
            value: 2140,
            delta: -1.8,
            positive: false
        },
        performance: {
            title: 'Server Latency (ms)',
            data: [45, 52, 38, 48, 60, 55, 70, 65, 80, 75, 95, 90]
        },
        engagement: {
            value: 68.4,
            delta: 3.2,
            positive: true
        }
    };

    const loadData = () => {
        // --- Revenue Card ---
        const revenueCard = document.getElementById('revenue-card');
        if (revenueCard) {
            document.getElementById('revenue-value').innerHTML = `$${mockData.revenue.value.toLocaleString()}`;
            document.getElementById('revenue-delta').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
                <span>${mockData.revenue.delta}% vs last month</span>`;
            // Note: The 'positive' class for revenue-delta is set in HTML and not dynamically changed here based on mockData.revenue.positive
            revenueCard.classList.add('loaded');
        }

        // --- Users Card ---
        const usersCard = document.getElementById('users-card');
        if (usersCard) {
            document.getElementById('users-value').innerHTML = `${mockData.users.value.toLocaleString()}`;
            document.getElementById('users-delta').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
                <span>${Math.abs(mockData.users.delta)}% vs last month</span>`;
            // Note: The 'negative' class for users-delta is set in HTML and not dynamically changed here based on mockData.users.positive
            usersCard.classList.add('loaded');
        }
        
        // --- Engagement Card ---
        const engagementCard = document.getElementById('engagement-card');
        if (engagementCard) {
            document.getElementById('engagement-value').innerHTML = `${mockData.engagement.value}<span class="unit">%</span>`;
            document.getElementById('engagement-delta').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
                <span>${mockData.engagement.delta}% this week</span>`;
            // Note: The 'positive' class for engagement-delta is set in HTML
            engagementCard.classList.add('loaded');
        }

        // --- Performance Chart Card ---
        const performanceCard = document.getElementById('performance-card');
        if (performanceCard) {
            createLineChart(mockData.performance.data);
            performanceCard.classList.add('loaded');
        }
    };

    const createLineChart = (data) => {
        const container = document.getElementById('performance-chart-container');
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;
        const padding = 20;

        if (width <= 0 || height <= 0 || data.length === 0) return;

        const maxValue = Math.max(...data, 0);
        const minValue = Math.min(...data, 0);
        const dataRange = maxValue - minValue;

        const xStep = (width - padding * 2) / (data.length > 1 ? data.length - 1 : 1);
        const yStep = dataRange > 0 ? (height - padding * 2) / dataRange : (height - padding * 2) / (maxValue || 1);

        let pathData = `M ${padding},${height - padding - (data[0] - minValue) * yStep}`;
        data.forEach((point, i) => {
            if (i > 0) {
                pathData += ` L ${padding + i * xStep},${height - padding - (point - minValue) * yStep}`;
            }
        });
        
        let areaPathData = pathData + ` L ${padding + (data.length -1) * xStep},${height - padding} L ${padding},${height - padding} Z`;
        if (data.length === 1) {
            areaPathData = `M ${padding},${height - padding - (data[0] - minValue) * yStep} L ${padding},${height - padding} L ${padding},${height - padding} Z`;
        }

        const svg = `
            <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:var(--accent-primary);stop-opacity:0.4"/>
                        <stop offset="100%" style="stop-color:var(--accent-primary);stop-opacity:0"/>
                    </linearGradient>
                </defs>
                <g>
                    <path class="area-path" d="${areaPathData}" style="opacity:0; animation: fadeInUp 0.5s 0.5s ease-out forwards;"></path>
                    <path class="line-path" d="${pathData}" style="stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw-line 1.5s 0.2s ease-out forwards;"></path>
                </g>
            </svg>
        `;
        container.innerHTML = svg;
    };

    // Simulate API call / data loading
    setTimeout(loadData, 2000);
});