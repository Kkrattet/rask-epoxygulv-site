(function(){
  document.querySelectorAll('[data-carousel]').forEach(function(sec){
    var track=sec.querySelector('.track'), dots=sec.querySelector('.dots'), prev=sec.querySelector('.prev'), next=sec.querySelector('.next');
    var cards=[].slice.call(track.children);
    function step(){return cards[1]?cards[1].offsetLeft-cards[0].offsetLeft:track.clientWidth}
    function perView(){return Math.max(1,Math.round(track.clientWidth/step()))}
    function update(){
      var i=Math.round(track.scrollLeft/step());
      [].forEach.call(dots.children,function(d,j){d.classList.toggle('on',j===i)});
      prev.disabled=track.scrollLeft<5; next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-5;
    }
    function build(){
      var pages=Math.max(1,cards.length-perView()+1); dots.innerHTML='';
      for(var i=0;i<pages;i++){(function(i){var b=document.createElement('button');b.setAttribute('aria-label','Billede '+(i+1));b.onclick=function(){track.scrollTo({left:i*step()})};dots.appendChild(b)})(i)}
      prev.style.visibility=next.style.visibility=pages>1?'visible':'hidden';
      update();
    }
    prev.onclick=function(){track.scrollBy({left:-step()})}; next.onclick=function(){track.scrollBy({left:step()})};
    track.addEventListener('scroll',function(){requestAnimationFrame(update)});
    window.addEventListener('resize',build); build();
  });
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var n=f.querySelector('.note');if(n)n.textContent='Formularen er et udkast. Den kobles til mail, når sitet går live.';});
  });
})();
(function(){
  var areas=document.querySelectorAll('.area'); if(!areas.length) return;
  var recs=document.querySelectorAll('.rec');
  areas.forEach(function(a){a.addEventListener('click',function(){
    areas.forEach(function(x){x.classList.remove('on')}); a.classList.add('on');
    recs.forEach(function(r){r.hidden=r.dataset.i!==a.dataset.i});
  })});
})();
(function(){
  var dd=document.querySelector('.dd'); if(!dd) return;
  var btn=dd.querySelector('.dd-btn');
  btn.addEventListener('click',function(e){e.stopPropagation();var o=dd.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  if(window.matchMedia('(hover:hover) and (min-width:901px)').matches){
    dd.addEventListener('mouseenter',function(){dd.classList.add('open');btn.setAttribute('aria-expanded','true')});
    dd.addEventListener('mouseleave',function(){dd.classList.remove('open');btn.setAttribute('aria-expanded','false')});
  }
  document.addEventListener('click',function(e){if(!dd.contains(e.target)){dd.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){dd.classList.remove('open');document.body.classList.remove('nav-open')}});
  var bu=document.querySelector('.burger');
  if(bu) bu.addEventListener('click',function(){var o=document.body.classList.toggle('nav-open');bu.setAttribute('aria-expanded',o);bu.setAttribute('aria-label',o?'Luk menu':'Åbn menu')});
  document.querySelectorAll('.topnav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('nav-open')})});
})();
(function(){
  var lb=document.querySelector('.lb');
  if(lb){
    var img=lb.querySelector('img'),cap=lb.querySelector('figcaption');
    function close(){lb.hidden=true;document.body.style.overflow=''}
    document.querySelectorAll('.ph-card').forEach(function(c){c.addEventListener('click',function(){
      img.src=c.dataset.full;img.alt=c.dataset.cap;cap.textContent=c.dataset.cap;lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-x').focus();
    })});
    lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-x'))close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)close()});
  }
  document.querySelectorAll('.show-more').forEach(function(b){b.addEventListener('click',function(){
    var g=b.closest('.wrap').querySelector('.vuba');var o=g.classList.toggle('all');
    b.setAttribute('aria-expanded',o);b.textContent=o?'Vis færre ↑':'Vis alle 25 blandinger ↓';
    if(!o)g.scrollIntoView({block:'start'});
  })});
  document.querySelectorAll('.seg').forEach(function(seg){
    var bs=seg.querySelectorAll('button'),grid=seg.parentNode.querySelector('.sw-grid');
    bs.forEach(function(b){b.addEventListener('click',function(){
      bs.forEach(function(x){x.classList.remove('on')});b.classList.add('on');
      var sz=b.dataset.sz,lbl=sz==='2-3'?'2–3 mm':'0,7–1,2 mm';
      grid.querySelectorAll('.sw-card').forEach(function(c){var src='img/farver/sw-'+c.dataset.code+'-'+sz+'.jpg';c.querySelector('img').src=src;c.dataset.full=src;c.querySelector('.sz').textContent='Foto: '+lbl});
    })});
  });
})();
