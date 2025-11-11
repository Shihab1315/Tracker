// Tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');
tabBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        tabBtns.forEach(b=>b.classList.remove('active'));
        tabSections.forEach(s=>s.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
    });
});

// BMI calculation
const bmiForm = document.getElementById('bmiForm');
const bmiResult = document.getElementById('bmiResult');
const dietTips = document.getElementById('dietTips');
const exerciseTips = document.getElementById('exerciseTips');
const bmiChart = document.getElementById('bmiChart').getContext('2d');
let bmiChartInstance;
let lastBmi = 0;

bmiForm.addEventListener('submit', function(e){
    e.preventDefault();
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    if(weight <=0 || heightCm <=0 || age <=0){ alert("Please enter valid values!"); return; }
    const heightM = heightCm/100;
    const bmi = weight/(heightM*heightM);
    lastBmi = bmi;
    let category="", diet="", exercise="";
    if(bmi < 18.5){ category="Underweight"; diet="Increase calorie intake: nuts, eggs, dairy, healthy fats."; exercise="Strength training + moderate cardio."; }
    else if(bmi >=18.5 && bmi<25){ category="Normal weight"; diet="Balanced diet: proteins, veggies, fruits."; exercise="Mix of cardio & strength exercises."; }
    else if(bmi >=25 && bmi<30){ category="Overweight"; diet="Reduce sugar & carbs, increase protein & veggies."; exercise="Cardio + strength training."; }
    else{ category="Obese"; diet="Low-calorie, nutrient-rich diet; avoid junk food."; exercise="Consult doctor before intense exercise; start walking & light cardio."; }
    bmiResult.innerHTML = `<p>Your BMI: <strong>${bmi.toFixed(2)}</strong></p><p>Category: <strong>${category}</strong></p>`;
    dietTips.textContent = diet;
    exerciseTips.textContent = exercise;
    if(bmiChartInstance) bmiChartInstance.destroy();
    bmiChartInstance = new Chart(bmiChart,{
        type:'doughnut',
        data:{ labels:['BMI','Remaining'], datasets:[{data:[bmi.toFixed(2),40-bmi.toFixed(2)], backgroundColor:['#2e8b57','#d3f4e8'], borderWidth:1 }]},
        options:{ responsive:true, plugins:{ legend:{display:false}, tooltip:{enabled:true} } }
    });
});

// Water tracker
const waterRange = document.getElementById('waterRange');
const waterValue = document.getElementById('waterValue');
const waterProgress = document.getElementById('waterProgress');
waterRange.addEventListener('input', ()=>{
    const val = waterRange.value;
    waterValue.textContent = `${val} / 8 glasses`;
    waterProgress.style.width = (val/8*100) + '%';
});

// Calories Tracker
let totalCalories = 0;
const caloriesList = document.getElementById('caloriesList');
const totalCaloriesEl = document.getElementById('totalCalories');
document.getElementById('addCalories').addEventListener('click', ()=>{
    const meal = document.getElementById('meal').value;
    const calories = parseInt(document.getElementById('calories').value);
    if(!meal || calories<=0) return alert('Enter valid meal and calories.');
    const li = document.createElement('li');
    li.textContent = `${meal} - ${calories} kcal`;
    caloriesList.appendChild(li);
    totalCalories += calories;
    totalCaloriesEl.textContent = totalCalories;
    document.getElementById('meal').value='';
    document.getElementById('calories').value='';
});

// Daily Log
const dailyLogsList = document.getElementById('dailyLogsList');
document.getElementById('addLog').addEventListener('click', ()=>{
    const date = document.getElementById('logDate').value;
    const weight = document.getElementById('logWeight').value;
    const water = document.getElementById('logWater').value;
    const exercise = document.getElementById('logExercise').value;
    if(!date || !weight || !water) return alert('Fill all required fields.');
    const li = document.createElement('li');
    li.textContent = `${date} | Weight: ${weight} kg | Water: ${water} glasses | Exercise: ${exercise}`;
    dailyLogsList.appendChild(li);
    document.getElementById('logDate').value='';
    document.getElementById('logWeight').value='';
    document.getElementById('logWater').value='';
    document.getElementById('logExercise').value='';
});
