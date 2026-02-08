<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Weather Dashboard</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: rgba(30, 41, 59, 0.7);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

select, button {
  padding: 14px 18px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  transition: all 0.3s ease;
}

select {
  background: #1e293b;
  color: white;
  border: 1px solid #475569;
  cursor: pointer;
  width: 200px;
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

#refreshToggle {
  background: linear-gradient(135deg, #10b981, #059669);
}

#refreshToggle:hover {
  box-shadow: 0 7px 14px rgba(16, 185, 129, 0.4);
}

.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}

.weather-card {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 800px;
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
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #334155;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #38bdf8;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-time {
  font-size: 1rem;
  color: #94a3b8;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 15px;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

.data-content h3 {
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 8px;
}

.data-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: #f8fafc;
}

.data-unit {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-left: 5px;
}

/* البوصلة */
.compass-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 15px;
  grid-column: span 2;
  margin-top: 10px;
}

.compass-title {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #38bdf8;
}

.compass {
  position: relative;
  width: 200px;
  height: 200px;
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
  font-size: 1.2rem;
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
  width: 5px;
  height: 90px;
  background: #f8fafc;
  border-radius: 3px;
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
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid #ef4444;
}

.compass-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  background: #1e293b;
  border-radius: 50%;
  z-index: 11;
  border: 4px solid #f8fafc;
}

.wind-direction {
  margin-top: 20px;
  font-size: 1.4rem;
  color: #38bdf8;
  font-weight: 600;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 23, 42, 0.5);
  padding: 15px 25px;
  border-radius: 12px;
  margin-top: 25px;
}

.last-update {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #94a3b8;
}

.update-time {
  color: #38bdf8;
  font-weight: 600;
}

.device-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #94a3b8;
}

.device-name {
  color: #10b981;
  font-weight: 600;
}

.no-data {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.3rem;
  color: #94a3b8;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 20px;
  margin-top: 20px;
}

.error-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.2rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 15px;
  margin-top: 20px;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* التكيف مع الشاشات الصغيرة */
@media (max-width: 768px) {
  .weather-grid {
    grid-template-columns: 1fr;
  }
  
  .compass-container {
    grid-column: span 1;
  }
  
  .controls {
    flex-direction: column;
  }
  
  select, button {
    width: 100%;
  }
  
  h1 {
    font-size: 2.2rem;
  }
  
  .status-bar {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
</head>
<body>

<div class="container">
  <header>
    <h1><i class="fas fa-cloud-sun"></i> لوحة الطقس المباشرة</h1>
    <p>مراقبة قراءات الطقس في الوقت الحقيقي</p>
  </header>
  
  <div class="controls">
    <select id="dev">
      <option value="max1">محطة الطقس 1</option>
      <option value="max2">محطة الطقس 2</option>
      <option value="max3">محطة الطقس 3</option>
      <option value="max4">محطة الطقس 4</option>
    </select>
    
    <button onclick="toggleAutoRefresh()" id="refreshToggle">
      <i class="fas fa-sync"></i> تحديث تلقائي: <span id="refreshStatus">مفعل</span>
    </button>
  </div>
  
  <div id="out"></div>
</div>

<script>
// متغيرات النظام
let currentDevice = 'max1';
let autoRefreshEnabled = true;
let lastUpdateTime = null;
let refreshInterval = null;

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
    "شمالي غربي": 315,
    "شمال": 0,
    "شرق": 90,
    "جنوب": 180,
    "غرب": 270
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
    currentDevice = document.getElementById("dev").value;
    
    // جلب البيانات من API
    const response = await fetch(`/api/sensor?device=${currentDevice}`);
    
    if (!response.ok) {
      throw new Error('فشل في جلب البيانات');
    }
    
    const data = await response.json();
    
    // التحقق من هيكل البيانات المستلمة
    console.log('بيانات المستلمة:', data);
    
    // التكيف مع تنسيقات البيانات المختلفة
    let todayData = [];
    if (data.today && Array.isArray(data.today)) {
      todayData = data.today;
    } else if (Array.isArray(data)) {
      todayData = data;
    } else if (data.data && Array.isArray(data.data)) {
      todayData = data.data;
    }
    
    if (todayData.length === 0) {
      document.getElementById("out").innerHTML = `
        <div class="no-data">
          <i class="fas fa-exclamation-triangle"></i><br>
          لا توجد بيانات متاحة لجهاز ${currentDevice}
        </div>`;
      return;
    }
    
    // تحديث وقت آخر تحديث
    lastUpdateTime = new Date();
    
    // الحصول على أحدث قراءة
    const latestReading = todayData[todayData.length - 1];
    
    // استخراج البيانات مع قيم افتراضية
    const temperature = latestReading.temperture || latestReading.temperature || 0;
    const humidity = latestReading.humidity || 0;
    const pressure = latestReading.pressure || 0;
    const windSpeed = latestReading.winds || latestReading.windS || 0;
    const windDirection = latestReading.windd || latestReading.windD || 'غير متاح';
    const readingTime = latestReading.time || latestReading.reading_date || new Date().toISOString();
    
    // إنشاء بطاقة الطقس
    const displayTime = new Date(readingTime).toLocaleString("ar-SA");
    
    const html = `
      <div class="dashboard">
        <div class="weather-card">
          <div class="live-indicator"></div>
          <div class="card-header">
            <div class="card-title">
              <i class="fas fa-satellite"></i>
              القراءات المباشرة
            </div>
            <div class="card-time">
              <i class="far fa-clock"></i> ${displayTime}
            </div>
          </div>
          
          <div class="weather-grid">
            <div class="data-item" id="temp-item">
              <div class="data-icon">
                <i class="fas fa-thermometer-half"></i>
              </div>
              <div class="data-content">
                <h3>درجة الحرارة</h3>
                <div class="data-value">${Number(temperature).toFixed(1)}<span class="data-unit">°C</span></div>
              </div>
            </div>
            
            <div class="data-item" id="humidity-item">
              <div class="data-icon">
                <i class="fas fa-tint"></i>
              </div>
              <div class="data-content">
                <h3>الرطوبة</h3>
                <div class="data-value">${Number(humidity).toFixed(1)}<span class="data-unit">%</span></div>
              </div>
            </div>
            
            <div class="data-item" id="pressure-item">
              <div class="data-icon">
                <i class="fas fa-tachometer-alt"></i>
              </div>
              <div class="data-content">
                <h3>الضغط الجوي</h3>
                <div class="data-value">${Number(pressure).toFixed(1)}<span class="data-unit">hPa</span></div>
              </div>
            </div>
            
            <div class="data-item" id="wind-item">
              <div class="data-icon">
                <i class="fas fa-wind"></i>
              </div>
              <div class="data-content">
                <h3>سرعة الرياح</h3>
                <div class="data-value">${Number(windSpeed).toFixed(1)}<span class="data-unit">m/s</span></div>
              </div>
            </div>
            
            ${createCompass(windDirection)}
          </div>
          
          <div class="status-bar">
            <div class="last-update">
              <i class="fas fa-clock"></i>
              <span>آخر تحديث: <span class="update-time">${formatTime(lastUpdateTime)}</span></span>
            </div>
            <div class="device-info">
              <i class="fas fa-satellite-dish"></i>
              <span>محطة: <span class="device-name">${currentDevice}</span></span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById("out").innerHTML = html;
    
    // إضافة تأثير التحديث لعناصر البيانات
    highlightUpdatedItems();
    
  } catch (error) {
    console.error('خطأ في تحميل البيانات:', error);
    document.getElementById("out").innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i><br>
        خطأ في جلب البيانات: ${error.message}<br>
        <small>تأكد من اتصال الخادم والتكوينات الصحيحة</small>
      </div>`;
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

// دالة لتبديل التحديث التلقائي
function toggleAutoRefresh() {
  autoRefreshEnabled = !autoRefreshEnabled;
  const statusElement = document.getElementById("refreshStatus");
  const buttonIcon = document.querySelector("#refreshToggle i");
  
  if (autoRefreshEnabled) {
    statusElement.textContent = "مفعل";
    buttonIcon.className = "fas fa-sync";
    document.getElementById("refreshToggle").style.background = "linear-gradient(135deg, #10b981, #059669)";
    startAutoRefresh();
  } else {
    statusElement.textContent = "معطل";
    buttonIcon.className = "fas fa-pause";
    document.getElementById("refreshToggle").style.background = "linear-gradient(135deg, #64748b, #475569)";
    stopAutoRefresh();
  }
}

// دالة لبدء التحديث التلقائي
function startAutoRefresh() {
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    loadCurrent();
  }, 5000); // تحديث كل 5 ثواني
}

// دالة لإيقاف التحديث التلقائي
function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
}

// دالة لتنسيق الوقت
function formatTime(date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

// تعيين الأحداث
document.getElementById("dev").addEventListener("change", loadCurrent);

// تحميل البيانات الأولية وبدء التحديث التلقائي
loadCurrent();
startAutoRefresh();
</script>

</body>
</html>
