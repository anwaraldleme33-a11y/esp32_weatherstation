<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌦 لوحة الطقس الحية</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- إضافة مكتبة Chart.js للرسوم البيانية -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            color: #e2e8f0;
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
        }
        
        h1 {
            font-size: 2.8rem;
            background: linear-gradient(to right, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .real-time-badge {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        
        .controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 20px;
            background: rgba(30, 41, 59, 0.7);
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 30px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .select-wrapper, .date-wrapper {
            position: relative;
            flex: 1;
            min-width: 200px;
        }
        
        select, input, button {
            padding: 14px 18px;
            border-radius: 12px;
            border: none;
            font-size: 16px;
            width: 100%;
            transition: all 0.3s ease;
        }
        
        select {
            background: #1e293b;
            color: white;
            border: 1px solid #475569;
            cursor: pointer;
            appearance: none;
            padding-right: 45px;
        }
        
        input {
            background: #1e293b;
            color: white;
            border: 1px solid #475569;
        }
        
        button {
            background: linear-gradient(135deg, #3b82f6, #6366f1);
            color: white;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-width: 180px;
        }
        
        button:hover {
            transform: translateY(-3px);
            box-shadow: 0 7px 14px rgba(59, 130, 246, 0.4);
        }
        
        #backBtn {
            background: linear-gradient(135deg, #64748b, #475569);
        }
        
        #backBtn:hover {
            box-shadow: 0 7px 14px rgba(100, 116, 139, 0.4);
        }
        
        .select-wrapper i, .date-wrapper i {
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            pointer-events: none;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }
        
        .weather-card {
            background: rgba(30, 41, 59, 0.8);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .live-indicator {
            position: absolute;
            top: 15px;
            left: 15px;
            width: 10px;
            height: 10px;
            background: #10b981;
            border-radius: 50%;
            animation: live-pulse 1.5s infinite;
        }
        
        @keyframes live-pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        
        .weather-card:hover {
            transform: translateY(-5px);
            border-color: rgba(59, 130, 246, 0.3);
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #334155;
        }
        
        .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #38bdf8;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .card-time {
            font-size: 0.9rem;
            color: #94a3b8;
        }
        
        .weather-data {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        
        .data-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .data-item.updating {
            background: rgba(59, 130, 246, 0.2);
            animation: highlight 1s ease;
        }
        
        @keyframes highlight {
            0% { background: rgba(59, 130, 246, 0.2); }
            100% { background: rgba(15, 23, 42, 0.5); }
        }
        
        .data-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            background: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
        }
        
        .data-content h3 {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 5px;
        }
        
        .data-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #f8fafc;
        }
        
        .data-unit {
            font-size: 1rem;
            color: #94a3b8;
            margin-right: 3px;
        }
        
        /* البوصلة */
        .compass-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 15px;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 12px;
            grid-column: span 2;
        }
        
        .compass-title {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #38bdf8;
        }
        
        .compass {
            position: relative;
            width: 180px;
            height: 180px;
            margin: 0 auto;
        }
        
        .compass-circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: conic-gradient(
                from 0deg,
                #ef4444 0deg, #f97316 45deg, #eab308 90deg, 
                #22c55e 135deg, #0ea5e9 180deg, #3b82f6 225deg, 
                #8b5cf6 270deg, #ec4899 315deg, #ef4444 360deg
            );
            position: relative;
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .compass-directions {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        
        .direction {
            position: absolute;
            font-weight: bold;
            color: white;
            text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
        }
        
        .n { top: 5%; left: 50%; transform: translateX(-50%); }
        .e { top: 50%; right: 5%; transform: translateY(-50%); }
        .s { bottom: 5%; left: 50%; transform: translateX(-50%); }
        .w { top: 50%; left: 5%; transform: translateY(-50%); }
        
        .compass-needle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center bottom;
            transition: transform 0.5s ease;
            z-index: 10;
        }
        
        .needle {
            width: 4px;
            height: 80px;
            background: #f8fafc;
            border-radius: 2px;
            position: relative;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
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
            border-top: 15px solid #ef4444;
        }
        
        .compass-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: #1e293b;
            border-radius: 50%;
            z-index: 11;
            border: 3px solid #f8fafc;
        }
        
        .wind-direction {
            margin-top: 15px;
            font-size: 1.2rem;
            color: #38bdf8;
            font-weight: 600;
        }
        
        /* قسم الرسوم البيانية */
        .charts-section {
            background: rgba(30, 41, 59, 0.8);
            border-radius: 20px;
            padding: 25px;
            margin-top: 30px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        
        .chart-container {
            background: rgba(15, 23, 42, 0.5);
            border-radius: 15px;
            padding: 20px;
            height: 300px;
        }
        
        /* جدول الأرشيف */
        .archive-container {
            background: rgba(30, 41, 59, 0.8);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        .archive-title {
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: #38bdf8;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        
        th {
            background: rgba(59, 130, 246, 0.2);
            color: #38bdf8;
            padding: 16px 12px;
            text-align: center;
            font-weight: 600;
            border-bottom: 2px solid #334155;
        }
        
        td {
            padding: 14px 12px;
            text-align: center;
            border-bottom: 1px solid #334155;
        }
        
        tr:hover {
            background: rgba(59, 130, 246, 0.1);
        }
        
        /* حالة عدم وجود بيانات */
        .no-data {
            text-align: center;
            padding: 50px 20px;
            font-size: 1.2rem;
            color: #94a3b8;
            background: rgba(30, 41, 59, 0.8);
            border-radius: 20px;
            margin-top: 20px;
        }
        
        /* إحصائيات التحديث */
        .update-stats {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            padding: 15px;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 12px;
            font-size: 0.9rem;
            color: #94a3b8;
        }
        
        .stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        /* التكيف مع الشاشات الصغيرة */
        @media (max-width: 768px) {
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
            
            .weather-data {
                grid-template-columns: 1fr;
            }
            
            .compass-container {
                grid-column: span 1;
            }
            
            .controls {
                flex-direction: column;
            }
            
            .select-wrapper, .date-wrapper {
                min-width: 100%;
            }
            
            h1 {
                font-size: 2.2rem;
            }
            
            .charts-grid {
                grid-template-columns: 1fr;
            }
            
            .chart-container {
                height: 250px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1><i class="fas fa-satellite"></i> لوحة الطقس الحية</h1>
            <p>مراقبة قراءات الطقس في الوقت الفعلي من محطات الطقس</p>
            <div class="real-time-badge">
                <i class="fas fa-circle"></i>
                <span id="lastUpdate">جاري التحميل...</span>
            </div>
        </header>
        
        <div class="controls">
            <div class="select-wrapper">
                <i class="fas fa-satellite-dish"></i>
                <select id="dev">
                    <option value="max1">محطة الطقس 1</option>
                    <option value="max2">محطة الطقس 2</option>
                    <option value="max3">محطة الطقس 3</option>
                    <option value="max4">محطة الطقس 4</option>
                </select>
            </div>
            
            <div class="date-wrapper">
                <i class="fas fa-calendar-alt"></i>
                <input type="date" id="archDate">
            </div>
            
            <button onclick="loadArchive()">
                <i class="fas fa-archive"></i> عرض الأرشيف
            </button>
            
            <button onclick="backToCurrent()" id="backBtn" style="display:none">
                <i class="fas fa-arrow-right"></i> العودة للقراءات الحية
            </button>
            
            <button onclick="toggleAutoRefresh()" id="refreshToggle">
                <i class="fas fa-sync"></i> تحديث تلقائي: <span id="refreshStatus">مفعّل</span>
            </button>
        </div>
        
        <div id="out"></div>
    </div>

    <script>
        // متغيرات النظام
        let currentDevice = 'max1';
        let autoRefreshEnabled = true;
        let lastUpdateTime = null;
        let temperatureChart = null;
        let humidityChart = null;
        let recentReadings = {
            temperature: [],
            humidity: [],
            pressure: [],
            windSpeed: [],
            timestamps: []
        };
        
        // دالة لتحويل اتجاه الرياح إلى درجات للبوصلة
        function windDirectionToDegrees(direction) {
            if (!direction) return 0;
            
            const directions = {
                "شمالي": 0,
                "شمالي شرقي": 45,
                "شرقي": 90,
                "جنوبي شرقي": 135,
                "جنوبي": 180,
                "جنوبي غربي": 225,
                "غربي": 270,
                "شمالي غربي": 315
            };
            
            return directions[direction] || 0;
        }
        
        // دالة لإنشاء بوصلة تفاعلية
        function createCompass(windDirection) {
            const degrees = windDirectionToDegrees(windDirection);
            
            return `
                <div class="compass-container">
                    <div class="compass-title">اتجاه الرياح</div>
                    <div class="compass">
                        <div class="compass-circle"></div>
                        <div class="compass-directions">
                            <div class="direction n">N</div>
                            <div class="direction e">E</div>
                            <div class="direction s">S</div>
                            <div class="direction w">W</div>
                        </div>
                        <div class="compass-needle" style="transform: translate(-50%, -100%) rotate(${degrees}deg);">
                            <div class="needle"></div>
                        </div>
                        <div class="compass-center"></div>
                    </div>
                    <div class="wind-direction">${windDirection || 'غير متاح'}</div>
                </div>
            `;
        }
        
        // دالة لعرض بيانات الطقس الحية
        async function loadCurrent() {
            try {
                document.getElementById("backBtn").style.display = "none";
                document.getElementById("archDate").value = "";
                
                currentDevice = devSel();
                
                // تحديث حالة التحميل
                document.getElementById("lastUpdate").innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديث...';
                
                // جلب البيانات من API
                const response = await fetch(`/api/sensor?device=${currentDevice}`);
                
                if (!response.ok) {
                    throw new Error('فشل في جلب البيانات');
                }
                
                const data = await response.json();
                
                if (!data.today && !data.yesterday) {
                    document.getElementById("out").innerHTML = `
                        <div class="no-data">
                            <i class="fas fa-exclamation-triangle"></i><br>
                            لا توجد بيانات متاحة لجهاز ${currentDevice}
                        </div>`;
                    document.getElementById("lastUpdate").textContent = 'لا توجد بيانات';
                    return;
                }
                
                // تحديث وقت آخر تحديث
                lastUpdateTime = new Date();
                document.getElementById("lastUpdate").textContent = `آخر تحديث: ${formatTime(lastUpdateTime)}`;
                
                let html = '<div class="dashboard-grid">';
                
                // عرض بيانات اليوم (القراءات الحية)
                if (data.today && data.today.length > 0) {
                    const latestReading = data.today[data.today.length - 1];
                    html += createWeatherCard("القراءات الحية", latestReading, true);
                    
                    // تخزين القراءة الأخيرة للرسوم البيانية
                    addToRecentReadings(latestReading);
                }
                
                // عرض بيانات الأمس (آخر قراءة)
                if (data.yesterday && data.yesterday.length > 0) {
                    const yesterdayReading = data.yesterday[data.yesterday.length - 1];
                    html += createWeatherCard("أمس", yesterdayReading, false);
                }
                
                html += '</div>';
                
                // إضافة قسم الرسوم البيانية إذا كانت هناك بيانات كافية
                if (recentReadings.temperature.length > 1) {
                    html += createChartsSection();
                }
                
                // إضافة إحصائيات التحديث
                html += createUpdateStats();
                
                document.getElementById("out").innerHTML = html;
                
                // تحديث البوصلة
                if (data.today && data.today.length > 0) {
                    updateCompass(data.today[data.today.length - 1].windd);
                }
                
                // إنشاء/تحديث الرسوم البيانية
                if (recentReadings.temperature.length > 1) {
                    updateCharts();
                }
                
                // إضافة تأثير التحديث لعناصر البيانات
                highlightUpdatedItems();
                
            } catch (error) {
                console.error('خطأ في تحميل البيانات:', error);
                document.getElementById("out").innerHTML = `
                    <div class="no-data">
                        <i class="fas fa-exclamation-circle"></i><br>
                        خطأ في جلب البيانات: ${error.message}<br>
                        <small>تأكد من اتصال الخادم والتكوينات الصحيحة</small>
                    </div>`;
                document.getElementById("lastUpdate").textContent = 'خطأ في التحديث';
            }
        }
        
        // دالة لإنشاء بطاقة الطقس
        function createWeatherCard(title, data, isLive) {
            const time = isLive ? 
                (data.time ? new Date(data.time).toLocaleString("ar-SA") : 'الآن') : 
                (data.reading_date ? new Date(data.reading_date).toLocaleDateString("ar-SA") : 'غير متاح');
            
            return `
                <div class="weather-card">
                    ${isLive ? '<div class="live-indicator"></div>' : ''}
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-${isLive ? 'satellite' : 'history'}"></i>
                            ${title}
                        </div>
                        <div class="card-time">
                            <i class="far fa-clock"></i> ${time}
                        </div>
                    </div>
                    
                    <div class="weather-data">
                        <div class="data-item" id="temp-item">
                            <div class="data-icon">
                                <i class="fas fa-thermometer-half"></i>
                            </div>
                            <div class="data-content">
                                <h3>درجة الحرارة</h3>
                                <div class="data-value">${data.temperture ? Number(data.temperture).toFixed(1) : '--'}<span class="data-unit">°C</span></div>
                            </div>
                        </div>
                        
                        <div class="data-item" id="humidity-item">
                            <div class="data-icon">
                                <i class="fas fa-tint"></i>
                            </div>
                            <div class="data-content">
                                <h3>الرطوبة</h3>
                                <div class="data-value">${data.humidity ? Number(data.humidity).toFixed(1) : '--'}<span class="data-unit">%</span></div>
                            </div>
                        </div>
                        
                        <div class="data-item" id="pressure-item">
                            <div class="data-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="data-content">
                                <h3>الضغط الجوي</h3>
                                <div class="data-value">${data.pressure ? Number(data.pressure).toFixed(1) : '--'}<span class="data-unit">hPa</span></div>
                            </div>
                        </div>
                        
                        <div class="data-item" id="wind-item">
                            <div class="data-icon">
                                <i class="fas fa-wind"></i>
                            </div>
                            <div class="data-content">
                                <h3>سرعة الرياح</h3>
                                <div class="data-value">${data.winds || data.windS || 0}<span class="data-unit">m/s</span></div>
                            </div>
                        </div>
                        
                        ${createCompass(data.windd || data.windD)}
                    </div>
                </div>
            `;
        }
        
        // دالة لتحديث البوصلة
        function updateCompass(direction) {
            const needle = document.querySelector('.compass-needle');
            if (needle) {
                const degrees = windDirectionToDegrees(direction);
                needle.style.transform = `translate(-50%, -100%) rotate(${degrees}deg)`;
                
                // تحديث نص اتجاه الرياح
                const windDirElement = document.querySelector('.wind-direction');
                if (windDirElement) {
                    windDirElement.textContent = direction || 'غير متاح';
                }
            }
        }
        
        // دالة لتخزين القراءات الحديثة للرسوم البيانية
        function addToRecentReadings(data) {
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            recentReadings.temperature.push(Number(data.temperture) || 0);
            recentReadings.humidity.push(Number(data.humidity) || 0);
            recentReadings.pressure.push(Number(data.pressure) || 0);
            recentReadings.windSpeed.push(Number(data.winds || data.windS) || 0);
            recentReadings.timestamps.push(timeStr);
            
            // الاحتفاظ فقط بآخر 20 قراءة
            const maxReadings = 20;
            if (recentReadings.temperature.length > maxReadings) {
                recentReadings.temperature.shift();
                recentReadings.humidity.shift();
                recentReadings.pressure.shift();
                recentReadings.windSpeed.shift();
                recentReadings.timestamps.shift();
            }
        }
        
        // دالة لإنشاء قسم الرسوم البيانية
        function createChartsSection() {
            return `
                <div class="charts-section">
                    <h2 class="archive-title">
                        <i class="fas fa-chart-line"></i> تتبع القراءات الحديثة
                    </h2>
                    <div class="charts-grid">
                        <div class="chart-container">
                            <canvas id="tempChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <canvas id="humidityChart"></canvas>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // دالة لتحديث الرسوم البيانية
        function updateCharts() {
            // مخطط درجة الحرارة
            const tempCtx = document.getElementById('tempChart')?.getContext('2d');
            if (tempCtx) {
                if (temperatureChart) {
                    temperatureChart.destroy();
                }
                
                temperatureChart = new Chart(tempCtx, {
                    type: 'line',
                    data: {
                        labels: recentReadings.timestamps,
                        datasets: [{
                            label: 'درجة الحرارة (°C)',
                            data: recentReadings.temperature,
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: '#e2e8f0' }
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
                if (humidityChart) {
                    humidityChart.destroy();
                }
                
                humidityChart = new Chart(humidityCtx, {
                    type: 'line',
                    data: {
                        labels: recentReadings.timestamps,
                        datasets: [{
                            label: 'الرطوبة (%)',
                            data: recentReadings.humidity,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: '#e2e8f0' }
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
        
        // دالة لإضافة تأثير التحديث لعناصر البيانات
        function highlightUpdatedItems() {
            const items = ['temp-item', 'humidity-item', 'pressure-item', 'wind-item'];
            
            items.forEach(itemId => {
                const element = document.getElementById(itemId);
                if (element) {
                    element.classList.add('updating');
                    setTimeout(() => {
                        element.classList.remove('updating');
                    }, 1000);
                }
            });
        }
        
        // دالة لإنشاء إحصائيات التحديث
        function createUpdateStats() {
            const totalReadings = recentReadings.temperature.length;
            const avgTemp = totalReadings > 0 ? 
                (recentReadings.temperature.reduce((a, b) => a + b, 0) / totalReadings).toFixed(1) : 0;
            const avgHumidity = totalReadings > 0 ? 
                (recentReadings.humidity.reduce((a, b) => a + b, 0) / totalReadings).toFixed(1) : 0;
            
            return `
                <div class="update-stats">
                    <div class="stat-item">
                        <i class="fas fa-database"></i>
                        <span>عدد القراءات المخزنة: ${totalReadings}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-thermometer-half"></i>
                        <span>متوسط الحرارة: ${avgTemp}°C</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-tint"></i>
                        <span>متوسط الرطوبة: ${avgHumidity}%</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span>معدل التحديث: كل 10 ثواني</span>
                    </div>
                </div>
            `;
        }
        
        // دالة لتحميل الأرشيف
        async function loadArchive() {
            const date = document.getElementById("archDate").value;
            if (!date) {
                alert("الرجاء اختيار تاريخ أولاً");
                return;
            }
            
            const dev = devSel();
            
            try {
                document.getElementById("lastUpdate").innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تحميل الأرشيف...';
                
                const response = await fetch(`/api/sensor?device=${dev}&date=${date}`);
                
                if (!response.ok) {
                    throw new Error('فشل في جلب الأرشيف');
                }
                
                const rows = await response.json();
                
                if (!rows || rows.length === 0) {
                    document.getElementById("out").innerHTML = `
                        <div class="no-data">
                            <i class="fas fa-archive"></i><br>
                            لا توجد بيانات في الأرشيف للتاريخ ${date}
                        </div>`;
                    document.getElementById("lastUpdate").textContent = 'لا توجد بيانات في الأرشيف';
                    return;
                }
                
                document.getElementById("backBtn").style.display = "flex";
                document.getElementById("lastUpdate").textContent = `أرشيف ${date}`;
                
                let html = `
                    <div class="archive-container">
                        <h2 class="archive-title">
                            <i class="fas fa-history"></i> الأرشيف - ${date}
                        </h2>
                        <div style="overflow-x:auto;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th><i class="fas fa-thermometer-half"></i> الحرارة</th>
                                        <th><i class="fas fa-tint"></i> الرطوبة</th>
                                        <th><i class="fas fa-tachometer-alt"></i> الضغط</th>
                                        <th><i class="fas fa-wind"></i> سرعة الرياح</th>
                                        <th><i class="fas fa-compass"></i> الاتجاه</th>
                                        <th><i class="far fa-clock"></i> الوقت</th>
                                    </tr>
                                </thead>
                                <tbody>`;
                
                rows.forEach((r, i) => {
                    const time = r.time ? new Date(r.time).toLocaleTimeString("ar-SA") : '';
                    html += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${r.temperture ? Number(r.temperture).toFixed(1) : '--'} °C</td>
                            <td>${r.humidity ? Number(r.humidity).toFixed(1) : '--'} %</td>
                            <td>${r.pressure ? Number(r.pressure).toFixed(1) : '--'} hPa</td>
                            <td>${r.winds || r.windS || 0} m/s</td>
                            <td>${r.windd || r.windD || '--'}</td>
                            <td>${time}</td>
                        </tr>`;
                });
                
                html += `</tbody></table></div></div>`;
                document.getElementById("out").innerHTML = html;
                
            } catch (error) {
                console.error('خطأ في تحميل الأرشيف:', error);
                document.getElementById("out").innerHTML = `
                    <div class="no-data">
                        <i class="fas fa-exclamation-circle"></i><br>
                        خطأ في جلب الأرشيف: ${error.message}
                    </div>`;
                document.getElementById("lastUpdate").textContent = 'خطأ في تحميل الأرشيف';
            }
        }
        
        // دالة للعودة إلى البيانات الحية
        function backToCurrent() {
            loadCurrent();
        }
        
        // دالة لتبديل التحديث التلقائي
        function toggleAutoRefresh() {
            autoRefreshEnabled = !autoRefreshEnabled;
            const statusElement = document.getElementById("refreshStatus");
            const buttonIcon = document.querySelector("#refreshToggle i");
            
            if (autoRefreshEnabled) {
                statusElement.textContent = "مفعّل";
                buttonIcon.className = "fas fa-sync";
                document.getElementById("refreshToggle").style.background = "linear-gradient(135deg, #3b82f6, #6366f1)";
                startAutoRefresh();
            } else {
                statusElement.textContent = "معطّل";
                buttonIcon.className = "fas fa-pause";
                document.getElementById("refreshToggle").style.background = "linear-gradient(135deg, #64748b, #475569)";
                stopAutoRefresh();
            }
        }
        
        // دالة لبدء التحديث التلقائي
        let refreshInterval;
        function startAutoRefresh() {
            if (refreshInterval) clearInterval(refreshInterval);
            refreshInterval = setInterval(() => {
                if (document.getElementById("backBtn").style.display === "none") {
                    loadCurrent();
                }
            }, 10000); // تحديث كل 10 ثواني
        }
        
        // دالة لإيقاف التحديث التلقائي
        function stopAutoRefresh() {
            if (refreshInterval) {
                clearInterval(refreshInterval);
                refreshInterval = null;
            }
        }
        
        // دالة للحصول على الجهاز المحدد
        function devSel() {
            return document.getElementById("dev").value;
        }
        
        // دالة لتنسيق الوقت
        function formatTime(date) {
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        }
        
        // تعيين الأحداث
        document.getElementById("dev").onchange = loadCurrent;
        
        // تحميل البيانات الأولية وبدء التحديث التلقائي
        loadCurrent();
        startAutoRefresh();
    </script>
</body>
</html>
