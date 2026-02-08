<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>🌤 لوحة تحكم محطة الطقس</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary: #3b82f6;
            --secondary: #1e293b;
            --accent: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --dark: #0f172a;
            --light: #f8fafc;
            --gray: #64748b;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Tajawal', 'Segoe UI', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #0c0c2e 0%, #1a1a3e 100%);
            color: var(--light);
            min-height: 100vh;
            padding: 20px;
            background-attachment: fixed;
        }
        
        .container {
            max-width: 1600px;
            margin: 0 auto;
            padding: 20px;
        }
        
        /* الهيدر */
        .header {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 25px 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            background: linear-gradient(90deg, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .header-info {
            display: flex;
            align-items: center;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .device-selector {
            display: flex;
            align-items: center;
            gap: 15px;
            background: rgba(15, 23, 42, 0.6);
            padding: 12px 20px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .device-selector select {
            background: transparent;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 8px;
            font-size: 1rem;
            min-width: 150px;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .status-indicator {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(16, 185, 129, 0.2);
            padding: 10px 20px;
            border-radius: 12px;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .status-dot {
            width: 10px;
            height: 10px;
            background: #10b981;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        /* التحكم */
        .controls {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .control-btn {
            background: linear-gradient(135deg, var(--primary), #6366f1);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            min-width: 180px;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
        }
        
        .control-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }
        
        .control-btn.secondary {
            background: linear-gradient(135deg, #64748b, #475569);
        }
        
        /* الشبكة الرئيسية */
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }
        
        /* بطاقة القراءات */
        .readings-card {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .readings-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #38bdf8, #818cf8);
        }
        
        .card-title {
            font-size: 1.5rem;
            margin-bottom: 25px;
            color: #38bdf8;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .readings-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        
        .reading-item {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 15px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .reading-item:hover {
            transform: translateY(-5px);
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .reading-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #60a5fa;
        }
        
        .reading-info h3 {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 5px;
        }
        
        .reading-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
        }
        
        .reading-unit {
            font-size: 1rem;
            color: #94a3b8;
            margin-right: 5px;
        }
        
        /* البوصلة */
        .compass-card {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .compass-wrapper {
            position: relative;
            width: 250px;
            height: 250px;
            margin: 20px 0;
        }
        
        .compass-outer {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: conic-gradient(
                #ef4444 0deg, #f97316 45deg, #eab308 90deg,
                #22c55e 135deg, #0ea5e9 180deg, #3b82f6 225deg,
                #8b5cf6 270deg, #ec4899 315deg, #ef4444 360deg
            );
            position: relative;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
        }
        
        .compass-inner {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            background: var(--dark);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .compass-directions {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        
        .compass-direction {
            position: absolute;
            font-weight: bold;
            color: white;
            font-size: 1.2rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .direction-n { top: 10px; left: 50%; transform: translateX(-50%); }
        .direction-e { top: 50%; right: 10px; transform: translateY(-50%); }
        .direction-s { bottom: 10px; left: 50%; transform: translateX(-50%); }
        .direction-w { top: 50%; left: 10px; transform: translateY(-50%); }
        
        .compass-needle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center bottom;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 10;
        }
        
        .needle {
            width: 4px;
            height: 100px;
            background: linear-gradient(to top, #ef4444, #f8fafc);
            border-radius: 2px;
            position: relative;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
        
        .needle::after {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 12px solid #ef4444;
        }
        
        .compass-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: #f8fafc;
            border-radius: 50%;
            z-index: 11;
            border: 4px solid var(--dark);
        }
        
        .direction-info {
            margin-top: 20px;
            text-align: center;
        }
        
        .direction-text {
            font-size: 1.3rem;
            color: #38bdf8;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .direction-degree {
            font-size: 1rem;
            color: #94a3b8;
        }
        
        /* الرسوم البيانية */
        .charts-section {
            grid-column: 1 / -1;
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        
        .chart-container {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 15px;
            padding: 20px;
            height: 300px;
        }
        
        /* معلومات النظام */
        .system-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(15, 23, 42, 0.6);
            border-radius: 15px;
            padding: 20px;
            margin-top: 30px;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .info-item i {
            color: #38bdf8;
            font-size: 1.2rem;
        }
        
        /* حالات خاصة */
        .no-data {
            text-align: center;
            padding: 60px 20px;
            grid-column: 1 / -1;
        }
        
        .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 60px 20px;
            grid-column: 1 / -1;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(59, 130, 246, 0.3);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* التكيف مع الشاشات الصغيرة */
        @media (max-width: 768px) {
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
            
            .readings-grid {
                grid-template-columns: 1fr;
            }
            
            .charts-grid {
                grid-template-columns: 1fr;
            }
            
            .header {
                flex-direction: column;
                text-align: center;
            }
            
            .header-info {
                justify-content: center;
            }
            
            .compass-wrapper {
                width: 200px;
                height: 200px;
            }
            
            .chart-container {
                height: 250px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- الهيدر -->
        <div class="header">
            <h1>
                <i class="fas fa-cloud-sun"></i>
                لوحة تحكم محطة الطقس
            </h1>
            <div class="header-info">
                <div class="device-selector">
                    <i class="fas fa-satellite"></i>
                    <select id="deviceSelect">
                        <option value="max1">محطة الطقس 1</option>
                        <option value="max2">محطة الطقس 2</option>
                        <option value="max3">محطة الطقس 3</option>
                        <option value="max4">محطة الطقس 4</option>
                    </select>
                </div>
                <div class="status-indicator">
                    <div class="status-dot"></div>
                    <span id="statusText">جاري التحميل...</span>
                </div>
            </div>
        </div>

        <!-- التحكم -->
        <div class="controls">
            <button class="control-btn" onclick="loadCurrentData()">
                <i class="fas fa-sync-alt"></i>
                تحديث البيانات
            </button>
            <button class="control-btn secondary" onclick="toggleAutoRefresh()">
                <i class="fas fa-clock"></i>
                <span id="autoRefreshText">التحديث التلقائي: مفعل</span>
            </button>
            <button class="control-btn" onclick="showArchive()">
                <i class="fas fa-history"></i>
                عرض الأرشيف
            </button>
        </div>

        <!-- منطقة العرض -->
        <div id="contentArea">
            <!-- سيتم تعبئة المحتوى هنا -->
        </div>
    </div>

    <script>
        // متغيرات النظام
        let currentDevice = 'max1';
        let autoRefreshEnabled = true;
        let refreshInterval = null;
        let charts = {};
        let recentData = {
            temperature: [],
            humidity: [],
            pressure: [],
            windSpeed: [],
            timestamps: []
        };

        // عناصر DOM
        const contentArea = document.getElementById('contentArea');
        const deviceSelect = document.getElementById('deviceSelect');
        const statusText = document.getElementById('statusText');
        const autoRefreshText = document.getElementById('autoRefreshText');

        // تهيئة النظام
        function init() {
            loadCurrentData();
            startAutoRefresh();
            setupEventListeners();
        }

        // إعداد مستمعي الأحداث
        function setupEventListeners() {
            deviceSelect.addEventListener('change', function() {
                currentDevice = this.value;
                loadCurrentData();
            });
        }

        // تحميل البيانات الحالية
        async function loadCurrentData() {
            try {
                showLoading();
                
                const response = await fetch(`/api/sensor?device=${currentDevice}`);
                
                if (!response.ok) {
                    throw new Error(`خطأ في الخادم: ${response.status}`);
                }
                
                const data = await response.json();
                
                // تحليل البيانات
                let todayData = [];
                if (data.today && Array.isArray(data.today)) {
                    todayData = data.today;
                } else if (Array.isArray(data)) {
                    todayData = data;
                }
                
                if (todayData.length === 0) {
                    showNoData();
                    return;
                }
                
                // الحصول على أحدث قراءة
                const latestReading = todayData[todayData.length - 1];
                
                // تحديث حالة النظام
                updateStatus('متصل', true);
                
                // تحديث بيانات الرسم البياني
                updateChartData(latestReading);
                
                // عرض البيانات
                displayCurrentData(latestReading);
                
                // إنشاء/تحديث الرسوم البيانية
                if (recentData.temperature.length > 1) {
                    createCharts();
                }
                
            } catch (error) {
                console.error('خطأ في تحميل البيانات:', error);
                updateStatus('غير متصل', false);
                showError(error.message);
            }
        }

        // عرض البيانات الحالية
        function displayCurrentData(data) {
            const temperature = data.temperture || 0;
            const humidity = data.humidity || 0;
            const pressure = data.pressure || 0;
            const windSpeed = data.winds || data.windS || 0;
            const windDirection = data.windd || data.windD || 'غير معروف';
            const readingTime = data.time ? new Date(data.time).toLocaleString('ar-SA') : 'الآن';
            
            const content = `
                <div class="dashboard-grid">
                    <!-- بطاقة القراءات -->
                    <div class="readings-card">
                        <h2 class="card-title">
                            <i class="fas fa-chart-line"></i>
                            القراءات الحالية
                        </h2>
                        <div class="readings-grid">
                            <div class="reading-item">
                                <div class="reading-icon">
                                    <i class="fas fa-thermometer-half"></i>
                                </div>
                                <div class="reading-info">
                                    <h3>درجة الحرارة</h3>
                                    <div class="reading-value">
                                        ${temperature.toFixed(1)}<span class="reading-unit">°C</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="reading-item">
                                <div class="reading-icon">
                                    <i class="fas fa-tint"></i>
                                </div>
                                <div class="reading-info">
                                    <h3>الرطوبة</h3>
                                    <div class="reading-value">
                                        ${humidity.toFixed(1)}<span class="reading-unit">%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="reading-item">
                                <div class="reading-icon">
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <div class="reading-info">
                                    <h3>الضغط الجوي</h3>
                                    <div class="reading-value">
                                        ${pressure.toFixed(1)}<span class="reading-unit">hPa</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="reading-item">
                                <div class="reading-icon">
                                    <i class="fas fa-wind"></i>
                                </div>
                                <div class="reading-info">
                                    <h3>سرعة الرياح</h3>
                                    <div class="reading-value">
                                        ${windSpeed.toFixed(1)}<span class="reading-unit">m/s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="system-info">
                            <div class="info-item">
                                <i class="far fa-clock"></i>
                                <span>آخر تحديث: ${readingTime}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-satellite"></i>
                                <span>المحطة: ${currentDevice}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- البوصلة -->
                    <div class="compass-card">
                        <h2 class="card-title">
                            <i class="fas fa-compass"></i>
                            اتجاه الرياح
                        </h2>
                        <div class="compass-wrapper">
                            <div class="compass-outer">
                                <div class="compass-inner">
                                    <div class="compass-directions">
                                        <div class="compass-direction direction-n">N</div>
                                        <div class="compass-direction direction-e">E</div>
                                        <div class="compass-direction direction-s">S</div>
                                        <div class="compass-direction direction-w">W</div>
                                    </div>
                                    <div class="compass-needle" id="compassNeedle">
                                        <div class="needle"></div>
                                    </div>
                                    <div class="compass-center"></div>
                                </div>
                            </div>
                        </div>
                        <div class="direction-info">
                            <div class="direction-text">${windDirection}</div>
                            <div class="direction-degree">${getWindDirectionDegree(windDirection)}°</div>
                        </div>
                    </div>
                </div>
                
                ${recentData.temperature.length > 1 ? `
                <div class="charts-section">
                    <h2 class="card-title">
                        <i class="fas fa-chart-area"></i>
                        الرسوم البيانية
                    </h2>
                    <div class="charts-grid">
                        <div class="chart-container">
                            <canvas id="temperatureChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <canvas id="humidityChart"></canvas>
                        </div>
                    </div>
                </div>
                ` : ''}
            `;
            
            contentArea.innerHTML = content;
            
            // تحديث البوصلة
            updateCompass(windDirection);
        }

        // تحويل اتجاه الرياح إلى درجات
        function getWindDirectionDegree(direction) {
            const directions = {
                'شمالي': 0,
                'شمالي شرقي': 45,
                'شرقي': 90,
                'جنوبي شرقي': 135,
                'جنوبي': 180,
                'جنوبي غربي': 225,
                'غربي': 270,
                'شمالي غربي': 315,
                'شمال': 0,
                'شرق': 90,
                'جنوب': 180,
                'غرب': 270
            };
            
            return directions[direction] || 0;
        }

        // تحديث البوصلة
        function updateCompass(direction) {
            const degrees = getWindDirectionDegree(direction);
            const needle = document.getElementById('compassNeedle');
            if (needle) {
                needle.style.transform = `translate(-50%, -50%) rotate(${degrees}deg)`;
            }
        }

        // تحديث بيانات الرسوم البيانية
        function updateChartData(data) {
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            recentData.temperature.push(data.temperture || 0);
            recentData.humidity.push(data.humidity || 0);
            recentData.pressure.push(data.pressure || 0);
            recentData.windSpeed.push(data.winds || data.windS || 0);
            recentData.timestamps.push(timeStr);
            
            // الاحتفاظ بآخر 15 قراءة فقط
            const maxReadings = 15;
            if (recentData.temperature.length > maxReadings) {
                recentData.temperature.shift();
                recentData.humidity.shift();
                recentData.pressure.shift();
                recentData.windSpeed.shift();
                recentData.timestamps.shift();
            }
        }

        // إنشاء الرسوم البيانية
        function createCharts() {
            // تدمير الرسوم البيانية السابقة إذا وجدت
            if (charts.temperature) charts.temperature.destroy();
            if (charts.humidity) charts.humidity.destroy();
            
            // مخطط درجة الحرارة
            const tempCtx = document.getElementById('temperatureChart')?.getContext('2d');
            if (tempCtx) {
                charts.temperature = new Chart(tempCtx, {
                    type: 'line',
                    data: {
                        labels: recentData.timestamps,
                        datasets: [{
                            label: 'درجة الحرارة',
                            data: recentData.temperature,
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#ef4444',
                            pointRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: '#e2e8f0', font: { size: 14 } }
                            }
                        },
                        scales: {
                            x: {
                                ticks: { color: '#94a3b8' },
                                grid: { color: '#334155' }
                            },
                            y: {
                                ticks: { color: '#94a3b8' },
                                grid: { color: '#334155' },
                                title: {
                                    display: true,
                                    text: 'درجة الحرارة (°C)',
                                    color: '#94a3b8'
                                }
                            }
                        }
                    }
                });
            }
            
            // مخطط الرطوبة
            const humidityCtx = document.getElementById('humidityChart')?.getContext('2d');
            if (humidityCtx) {
                charts.humidity = new Chart(humidityCtx, {
                    type: 'line',
                    data: {
                        labels: recentData.timestamps,
                        datasets: [{
                            label: 'الرطوبة',
                            data: recentData.humidity,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#3b82f6',
                            pointRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: '#e2e8f0', font: { size: 14 } }
                            }
                        },
                        scales: {
                            x: {
                                ticks: { color: '#94a3b8' },
                                grid: { color: '#334155' }
                            },
                            y: {
                                ticks: { color: '#94a3b8' },
                                grid: { color: '#334155' },
                                title: {
                                    display: true,
                                    text: 'الرطوبة (%)',
                                    color: '#94a3b8'
                                }
                            }
                        }
                    }
                });
            }
        }

        // التبديل بين تفعيل وإيقاف التحديث التلقائي
        function toggleAutoRefresh() {
            autoRefreshEnabled = !autoRefreshEnabled;
            
            if (autoRefreshEnabled) {
                startAutoRefresh();
                autoRefreshText.textContent = 'التحديث التلقائي: مفعل';
            } else {
                stopAutoRefresh();
                autoRefreshText.textContent = 'التحديث التلقائي: معطل';
            }
        }

        // بدء التحديث التلقائي
        function startAutoRefresh() {
            stopAutoRefresh();
            refreshInterval = setInterval(loadCurrentData, 5000); // كل 5 ثواني
        }

        // إيقاف التحديث التلقائي
        function stopAutoRefresh() {
            if (refreshInterval) {
                clearInterval(refreshInterval);
                refreshInterval = null;
            }
        }

        // تحديث حالة النظام
        function updateStatus(message, isConnected) {
            statusText.textContent = message;
            const statusDot = document.querySelector('.status-dot');
            if (statusDot) {
                statusDot.style.background = isConnected ? '#10b981' : '#ef4444';
            }
        }

        // عرض شاشة التحميل
        function showLoading() {
            contentArea.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <div>جاري تحميل البيانات...</div>
                </div>
            `;
        }

        // عرض رسالة عدم وجود بيانات
        function showNoData() {
            contentArea.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-database fa-3x" style="color: #64748b; margin-bottom: 20px;"></i>
                    <h2 style="color: #94a3b8;">لا توجد بيانات متاحة</h2>
                    <p style="color: #64748b; margin-top: 10px;">لم يتم العثور على بيانات للمحطة المحددة</p>
                </div>
            `;
        }

        // عرض رسالة خطأ
        function showError(message) {
            contentArea.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-exclamation-triangle fa-3x" style="color: #ef4444; margin-bottom: 20px;"></i>
                    <h2 style="color: #ef4444;">حدث خطأ</h2>
                    <p style="color: #ef4444; margin-top: 10px;">${message}</p>
                    <button class="control-btn" onclick="loadCurrentData()" style="margin-top: 20px;">
                        <i class="fas fa-redo"></i>
                        إعادة المحاولة
                    </button>
                </div>
            `;
        }

        // عرض الأرشيف (وظيفة أساسية)
        function showArchive() {
            const date = prompt('الرجاء إدخال التاريخ (YYYY-MM-DD):');
            if (date) {
                window.open(`?device=${currentDevice}&date=${date}`, '_blank');
            }
        }

        // بدء التطبيق
        init();
    </script>
</body>
</html>
