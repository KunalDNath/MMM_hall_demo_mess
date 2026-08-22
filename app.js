
const menuData = {
  Monday:{
    breakfast:[
      ["Option 1","Puri with Sabji","₹16"],
      ["Option 2","Bread, Butter (10 gm) / Jam + Sprouts","₹17.50"]
    ],
    lunch:[
      ["Veg","Chana Dal with Louki + Curd","₹12 + ₹8"],
      ["Non-Veg","Fish Curry (50 gm)","₹17"]
    ],
    snacks:[["Common","Vada Pav","₹12"]],
    dinner:[
      ["Veg","Matar Paneer","₹30"],
      ["Non-Veg","Egg Curry – 2 Pcs","₹20"]
    ]
  },
  Tuesday:{
    breakfast:[
      ["Option 1","Sambar Vada","₹16"],
      ["Option 2","Same as Option 1","—"]
    ],
    lunch:[
      ["Veg","Aloo Soyabean Curry + Curd (100 gm)","₹12 + ₹8"],
      ["Non-Veg","—","—"]
    ],
    snacks:[["Common","Veg Chowmein","₹17"]],
    dinner:[
      ["Common","Gobi Manchurian + Fruit Custard* + Ghee Roti","₹16 + ₹12"],
      ["Note","*One-time serving",""]
    ]
  },
  Wednesday:{
    breakfast:[
      ["Option 1","Poha + Sweet Boondi and Chutney","₹20"],
      ["Option 2","Same as Option 1","—"]
    ],
    lunch:[
      ["Veg","Red Pumpkin Chana with Alu","₹16"],
      ["Non-Veg","Egg Curry – 2 Pcs","₹20"]
    ],
    snacks:[["Common","Bhelpuri","₹12"]],
    dinner:[
      ["Veg","Paneer Butter Masala","₹30"],
      ["Non-Veg","Butter Chicken","₹35"]
    ]
  },
  Thursday:{
    breakfast:[
      ["Option 1","Onion Uttapam with Sambar and Chutney","₹16"],
      ["Option 2","Same as Option 1","—"]
    ],
    lunch:[
      ["Veg","Alu Potol Curry + Curd","₹12 + ₹8"],
      ["Non-Veg","—","—"]
    ],
    snacks:[["Common","Panipuri + Coffee","₹12 + coffee"]],
    dinner:[
      ["Common","Chana Masala + Lassi","₹12 + ₹10"],
      ["Note","No separate veg/non-veg option",""]
    ]
  },
  Friday:{
    breakfast:[
      ["Option 1","Sattu Paratha and Aloo Matar Sabji","₹20"],
      ["Option 2","Same as Option 1","—"]
    ],
    lunch:[
      ["Veg","Kadhi Pakora","₹18"],
      ["Non-Veg","Mustard Fish (50 gm)","₹17"]
    ],
    snacks:[["Common","Papri Chat","₹15"]],
    dinner:[
      ["Veg","Paneer Kadhai","₹30"],
      ["Non-Veg","Chicken Kadhai (100 gm)","₹35"]
    ]
  },
  Saturday:{
    breakfast:[
      ["Option 1","Chole Bhature – 2 Pc","₹18"],
      ["Option 2","Same as Option 1","—"]
    ],
    lunch:[
      ["Veg","Rajma Masala","₹12"],
      ["Non-Veg","Egg Curry (1 Pc)","₹10"]
    ],
    snacks:[["Common","Aloo Paratha – 02 Pcs","₹20"]],
    dinner:[
      ["Veg","Paneer Tadka","₹20"],
      ["Non-Veg","—","—"]
    ]
  },
  Sunday:{
    breakfast:[
      ["Option 1","Masala Dosa + Sambar & Chutney","₹18"],
      ["Option 2","Same as Option 1","—"]
    ],
    lunch:[
      ["Veg","Veg Biryani + Paneer Masala (50 gm) + Mix Raita + Rosogulla","₹65"],
      ["Non-Veg","Chicken Biryani + Mix Raita + Boiled Egg","₹65"]
    ],
    snacks:[["Common","Samosa – 02 Pcs + Coffee","₹12 + coffee"]],
    dinner:[
      ["Common","Khichdi + Veg Pakoda + Papad OR Rice + Dal + Alu Black Chana Curry (Alternate Week)","₹25"],
      ["Note","Common dinner",""]
    ]
  }
};

function todayName(){
  return new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date());
}

function mealMarkup(title, icon, rows){
  return `<section class="meal-section">
    <div class="meal-heading"><span class="meal-icon">${icon}</span><div><h3>${title}</h3><small>Choose the applicable option</small></div></div>
    <div class="meal-options">${rows.map(r=>`
      <div class="meal-option">
        <span class="meal-tag ${r[0].toLowerCase().replace(/[^a-z]/g,'-')}">${r[0]}</span>
        <div class="meal-name">${r[1]}</div>
        <div class="meal-price">${r[2] || ""}</div>
      </div>`).join("")}</div>
  </section>`;
}

function renderMenu(day){
  const d=menuData[day];
  if(!d) return;
  const box=document.querySelector("#menu-details");
  if(!box) return;
  box.innerHTML =
    mealMarkup("Breakfast","🍳",d.breakfast)+
    mealMarkup("Lunch","🍛",d.lunch)+
    mealMarkup("Snacks","☕",d.snacks)+
    mealMarkup("Dinner","🍽️",d.dinner);
  document.querySelectorAll(".menu-tabs button").forEach(b=>{
    b.classList.toggle("active",b.dataset.day===day);
  });
  const label=document.querySelector("#selected-day");
  if(label) label.textContent=day;
}

function renderTodayHome(){
  const el=document.querySelector("#home-day");
  if(el){
    el.textContent=new Intl.DateTimeFormat("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date());
  }
  const current=todayName();
  const d=menuData[current] || menuData.Saturday;
  const target=document.querySelector("#today-menu");
  if(!target) return;
  const item=(rows, type)=>{
    const common=rows.find(r=>r[0].toLowerCase()==="common");
    const veg=rows.find(r=>r[0].toLowerCase()==="veg");
    const nonveg=rows.find(r=>r[0].toLowerCase()==="non-veg");
    if(type==="breakfast") return `<div><span class="today-label">OPTION 1</span><strong>${rows[0][1]}</strong><small>${rows[0][2]}</small><span class="today-label">OPTION 2</span><strong>${rows[1]?.[1]||"—"}</strong><small>${rows[1]?.[2]||"—"}</small></div>`;
    if(veg || nonveg) return `<div class="today-choice"><div><span class="food-badge veg">VEG</span><strong>${veg?.[1]||"—"}</strong><small>${veg?.[2]||""}</small></div><div><span class="food-badge nonveg">NON-VEG</span><strong>${nonveg?.[1]||"—"}</strong><small>${nonveg?.[2]||""}</small></div></div>`;
    return `<div><span class="food-badge common">COMMON</span><strong>${common?.[1]||rows[0][1]}</strong><small>${common?.[2]||rows[0][2]||""}</small></div>`;
  };
  target.innerHTML=`
    <div class="today-meal"><div class="today-meal-title">🍳 Breakfast</div>${item(d.breakfast,"breakfast")}</div>
    <div class="today-meal"><div class="today-meal-title">🍛 Lunch</div>${item(d.lunch,"lunch")}</div>
    <div class="today-meal"><div class="today-meal-title">☕ Snacks</div>${item(d.snacks,"snacks")}</div>
    <div class="today-meal"><div class="today-meal-title">🍽️ Dinner</div>${item(d.dinner,"dinner")}</div>`;
}

function setupMenu(){
  const current=todayName();
  const initial=menuData[current]?current:"Monday";
  document.querySelectorAll(".menu-tabs button").forEach(b=>b.addEventListener("click",()=>renderMenu(b.dataset.day)));
  renderMenu(initial);
}

function generateId(prefix){
  const n=Math.floor(1000+Math.random()*9000);
  return `MMM-${prefix}-${new Date().getFullYear()}-${n}`;
}
function setupComplaintForm(){
  const f=document.querySelector("#complaint-form"); if(!f) return;
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const id=generateId("MESS");
    localStorage.setItem("lastGrievance",id);
    document.querySelector("#success-id").textContent=id;
    document.querySelector("#success-box").hidden=false;
    f.reset();
    window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
  });
}
function setupHallForm(){
  const f=document.querySelector("#hall-form"); if(!f) return;
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const id=generateId("HALL");
    localStorage.setItem("lastGrievance",id);
    document.querySelector("#success-id").textContent=id;
    document.querySelector("#success-box").hidden=false;
    f.reset();
    window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
  });
}
function setupTrack(){
  const f=document.querySelector("#track-form"); if(!f) return;
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const id=document.querySelector("#track-id").value.trim() || "MMM-HALL-2026-00127";
    document.querySelector("#shown-id").textContent=id;
    document.querySelector("#track-result").hidden=false;
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  const b=document.querySelector(".menu-toggle"),m=document.querySelector(".mobile-menu");
  if(b&&m)b.addEventListener("click",()=>m.classList.toggle("open"));
  document.querySelectorAll(".desktop-nav a,.mobile-menu a,.bottom-nav a").forEach(a=>{
    if(a.dataset.page===document.body.dataset.page)a.classList.add("active");
  });
  setupMenu(); renderTodayHome(); setupComplaintForm(); setupHallForm(); setupTrack();
});
