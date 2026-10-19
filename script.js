const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');menu.focus();}});
const interest=document.querySelector('#interest'),message=document.querySelector('#message'),status=document.querySelector('#copy-status');
const messages={'Hair':'Hi Yassmeen! I’d love to learn more about your hair services. Could you share the options, pricing and availability?','Facials':'Hi Yassmeen! I’m interested in your facial services. Could you share the options, pricing and availability?','Nails / Gel X':'Hi Yassmeen! I’d love to learn more about nails and Gel X at the studio. Could you share the options, pricing and availability?','Appointment information':'Hi Yassmeen! I’d like to plan a visit to Y|H. Could you share your appointment availability and booking details?','Something else':'Hi Yassmeen! I’d love to ask you about the studio. '};
function updateMessage(){message.value=messages[interest.value];status.textContent='Then open Instagram and paste it into your message.';}
interest.addEventListener('change',updateMessage);
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{interest.value=button.dataset.service;updateMessage();document.querySelector('#connect').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});interest.focus({preventScroll:true});}));
document.querySelector('#copy').addEventListener('click',async()=>{try{if(!message.value.trim()){status.textContent='Write a message first, then copy it.';message.focus();return;}await navigator.clipboard.writeText(message.value);status.textContent='Copied! Open Instagram and paste your message to Yassmeen.';}catch{message.focus();message.select();status.textContent='Select and copy the message above, then paste it into Instagram.';}});
document.querySelector('#year').textContent=new Date().getFullYear();

// Motion enhances the page; all content remains visible without JavaScript.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const progress=document.createElement('div');
progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let progressFrame=0;
function updateProgress(){progressFrame=0;const distance=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${distance>0?Math.min(1,Math.max(0,scrollY/distance)):0})`;document.querySelector('header').classList.toggle('scrolled',scrollY>15);}
addEventListener('scroll',()=>{if(!progressFrame)progressFrame=requestAnimationFrame(updateProgress);},{passive:true});
addEventListener('resize',updateProgress);updateProgress();
let reveals;
function configureMotion(){
 if(reveals)reveals.disconnect();
 document.querySelectorAll('.reveal-wait').forEach(el=>el.classList.remove('reveal-wait'));
 if(reducedMotion.matches||!('IntersectionObserver' in window))return;
 reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-wait');entry.target.classList.add('revealed');reveals.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
 document.querySelectorAll('.section-head,.service-list article,.story-image,.story-copy,.inspiration-grid figure,.connect>div,.questions').forEach((el,index)=>{
  el.classList.add('reveal');el.style.setProperty('--reveal-delay',`${index%3*65}ms`);
  if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal-wait');reveals.observe(el);}
 });
}
configureMotion();reducedMotion.addEventListener('change',configureMotion);
