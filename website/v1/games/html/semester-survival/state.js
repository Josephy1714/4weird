(function(){
'use strict';
var KEY='4weird_semester_survival_anime_v2';
var characters={
fresher:{name:'The Fresher',cost:0,emoji:'🌱',desc:'A clean slate. Starts with a little extra hope.',perk:'A gentle start'},
serious:{name:'The Serious Student',cost:200,emoji:'📚',desc:'A focused mind and tidy notes.',perk:'Study sessions give 15% more focus'},
lastminute:{name:'The Last Minute Reader',cost:400,emoji:'⏳',desc:'Thrives when deadlines get close.',perk:'Deadline stress is reduced'},
nightcoder:{name:'The Night Coder',cost:600,emoji:'💻',desc:'Quietly brilliant after sunset.',perk:'Late study costs less energy'},
groupleader:{name:'The Group Leader',cost:800,emoji:'🗣️',desc:'Knows how to bring people together.',perk:'Friendship grows faster'},
classrep:{name:'The Class Representative',cost:1000,emoji:'📢',desc:'Always knows what is happening on campus.',perk:'Attendance rewards are higher'},
genius:{name:'The Genius',cost:1500,emoji:'🧠',desc:'Curious, observant and quick to learn.',perk:'Study sessions improve GPA slightly more'},
memelord:{name:'The Meme Lord',cost:2000,emoji:'🤡',desc:'A joke for every difficult situation.',perk:'Social choices reduce stress'},
researcher:{name:'The Researcher',cost:2500,emoji:'🔬',desc:'Patient, methodical and curious.',perk:'Library work earns bonus coins'},
graduate:{name:'The Graduate',cost:-1,emoji:'🎓',desc:'You made it. Wear the cap with pride.',perk:'A campus legend'}
};
var upgrades={planner:{name:'Pocket planner',cost:120,desc:'Small tasks cost less focus.',max:5},water:{name:'Reusable water bottle',cost:90,desc:'Rest restores more energy.',max:5},notes:{name:'Better study notes',cost:180,desc:'Study sessions give a GPA boost.',max:5},hustle:{name:'Weekend side gig',cost:250,desc:'Earn more from campus jobs.',max:5}};
var items=[{id:'meal',name:'Campus lunch',icon:'🍛',price:120,desc:'A filling plate. Restores hunger.'},{id:'coffee',name:'Iced coffee',icon:'🧋',price:80,desc:'A quick focus boost.'},{id:'notebook',name:'Fresh notebook',icon:'📓',price:150,desc:'A little more focus for studying.'},{id:'snack',name:'Mandazi & chai',icon:'☕',price:55,desc:'A cheap snack between classes.'},{id:'bus',name:'Matatu fare',icon:'🚌',price:60,desc:'Get across campus quickly.'}];
var defaults={name:'New Student',course:'Data Science',semester:1,week:1,day:1,minute:480,cash:2500,energy:82,hunger:28,focus:74,stress:18,gpa:3.42,currentCharacter:'fresher',unlockedCharacters:['fresher'],friends:{maya:24,kito:16,amina:8,brian:4},inventory:{},upgrades:{planner:0,water:0,notes:0,hustle:0},completedTasks:[],stats:{classes:0,assignments:0,studyHours:0,daysPlayed:0,friendships:0,coinsEarned:0},badges:[],lastSaved:Date.now(),introSeen:false};
function clone(v){return JSON.parse(JSON.stringify(v));}
function merge(base,inc){var out=clone(base);Object.keys(inc||{}).forEach(function(k){if(inc[k]&&typeof inc[k]==='object'&&!Array.isArray(inc[k]))out[k]=Object.assign({},out[k]||{},inc[k]);else out[k]=inc[k];});return out;}
function load(){try{var raw=localStorage.getItem(KEY);if(raw)return merge(defaults,JSON.parse(raw));var old=localStorage.getItem('4weird_semester_survival_save_v1');if(old){var legacy=JSON.parse(old),m=clone(defaults);m.cash=legacy.coins||m.cash;m.semester=Math.min(8,legacy.currentSemester||1);m.gpa=legacy.cumulativeGpa||m.gpa;m.currentCharacter=legacy.currentSkin||'fresher';m.unlockedCharacters=legacy.unlockedSkins||['fresher'];if(legacy.upgrades){m.upgrades.notes=Math.max(0,(legacy.upgrades.scoreMultiplier||1)-1);}m.badges=legacy.badges||[];return m;}}catch(e){console.warn('Save data could not be read.',e);}return clone(defaults);}
var data=load();
function save(){data.lastSaved=Date.now();try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){console.warn('Save could not be stored.',e);}}
function spend(n){if(data.cash<n)return false;data.cash-=n;save();return true;}
function earn(n){var total=Math.round(n*(1+(data.upgrades.hustle||0)*.08));data.cash+=total;data.stats.coinsEarned+=total;save();}
function addStat(k,n){data.stats[k]=(data.stats[k]||0)+n;save();}
function completeTask(id){if(data.completedTasks.indexOf(id)!==-1)return false;data.completedTasks.push(id);data.stats.assignments++;earn(35);save();return true;}
function buyCharacter(id){var c=characters[id];if(!c||c.cost<0||data.unlockedCharacters.indexOf(id)!==-1||!spend(c.cost))return false;data.unlockedCharacters.push(id);save();return true;}
function buyUpgrade(id){var u=upgrades[id],lvl=data.upgrades[id]||0;if(!u||lvl>=u.max||!spend(u.cost*(lvl+1)))return false;data.upgrades[id]=lvl+1;save();return true;}
function buyItem(id){var item=items.find(function(x){return x.id===id;});if(!item||!spend(item.price))return false;data.inventory[id]=(data.inventory[id]||0)+1;save();return true;}
window.SSState={data:data,characters:characters,upgrades:upgrades,items:items,save:save,reset:function(){data=clone(defaults);save();window.SSState.data=data;},spend:spend,earn:earn,addStat:addStat,completeTask:completeTask,buyCharacter:buyCharacter,buyUpgrade:buyUpgrade,buyItem:buyItem};
})();