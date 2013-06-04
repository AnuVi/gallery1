google.load("jquery", "1.5.2");
google.setOnLoadCallback (function (){
$(function (){
    //$('#section_photo').addClass('loaderr');
    // $('#section_photo').children().hide(); 
	// muutuja images on massiiv, mille sees on objektid, kus on ära toodud võtmed ja väärtused
	var images=[
		{
		"thumbs":"thumb_pesto.jpg",
		"large":"pesto.jpg",
		"alt":""
		},
		{
		"thumbs":"thumb_muffin.jpg",
		"large":"muffin.jpg",
		"alt":""
		},
		{
		"thumbs":"thumb_jaatis.jpg",
		"large":"jaatis.jpg",
		"alt":""
		},
		{
		"thumbs":"thumb_voileib.jpg",
		"large":"voileib.jpg",
		"alt":""
		},
	];
	
	//id järgi leiame html-ist koha, kuhu kuvatakse hetke suur pilt
	var current_image=$('#current_image');
	
	//väikesed pildid leiame üles id thumbs_listi järgi
		thumbs=$('#thumbs_list'),
	//et teada saada mitmendat pilti hetkel kuvatakse, siis loendatakse
	//li-sid thumbsi sees (4), et  loendur lehel näitaks 5 asemel 4 ning 
	//vahele ei tekiks tühja klikki- lahutatakse pikkusest 1
		count=$('li',thumbs).length-1, //alustab lugemist 0st
	//image on võrdne nulliga
		image=0,
	//element img on uus pilt
		img = new Image();
	//vastava suure pildi kuvamiseks saab img element omadused src=images-massiivist  võtme 
	//large väärtus, ning alt=images-massiivist  võtme alt väärtus ning height=  pildi kõrgus
	current_image.html($(img).attr({'src': images[0].large,'alt':images[0].alt})).height($(img).height());	
		
	    //kui pilti pole veel laetud, siis 300ms pärast käivitatakse
		//funktsioon - vastavale id-le lisatakse klass'loader'
			loading = window.setTimeout(function(){
			    $('#section_photo').addClass('loaderr');
			    //$('#section_photo').children().show();
			},200);
			
//klassile prev antakse meetodiga klikk kaasa sündmus	
	$('.prev').click(function(event){
	//console.log('eelmine');
	     //image=image-1;
	//keelatakse tavapärane käitumine
		 event.preventDefault();
	//kui klikatakse prev, siis võta järekorranumbrist üks maha
		 image--;
		 //if(image==0) $(this).hide(); noole ära kadumine
	//kui image on väiksem 0ist siis alustatakse maha arvamist taas kõige suuremast
		if (image < 0) image=count;
	//ning otsi thumbsist üles li, mis võrdub vastava mitmenda a-ga ning käivita klikk
	//ehk tee vastav li aktiivseks
		$('li:eq('+ image +') a', thumbs).click();
	});
	
//klassile next antakse meetodiga klikk kaasa sündmus
	$('.next').click(function(event){
	//console.log('järgmine');
	//keelatakse tavapärane käitumine
		event.preventDefault();
	//kui klikatakse next, siis liigu ühe võrra edasi
		image++;
    // kui image on suurem countist, siis alusta piltide lugemist 0ist
		if (image > count) image=0;
	//ning otsi thumbsist üles li, mis võrdub vastava mitmenda a-ga ning käivita klikk
	//ehk tee vastav li aktiivseks
		$('li:eq('+ image +') a', thumbs).click();	
	});
	
//thumbsi sees olevale elemendile a antakse meetod click ning sellega omakorda
//antakse kaasa sündmus
	$('a', thumbs).click(function(event){
	//keelatakse tavapärane käitumine
		event.preventDefault();
	//puhverdamine- see millele klikatakse on self
		var self=$(this),
	//mitmendale a-le klikiti - leia selle a vanem- element(li) ning mitmes ta on
			index=self.parent().index();
			//console.log(images[index].large);
			img=new Image();
			loader=null; // hoiab meeles, mis olekus laadur on, kas aeg lugema hakanud
	//saates kellegile pildi lingi, siis on oluline, et url viitakse ikka
	//samale pildile, mida soovisime saata, selleks lisame urlile #(hashi),
	// sõna 'img' ning pildi järjekorra numbri
		window.location.hash='#img'+image;
	//image=0 võrdub nüüd järjekorra numbriga
		image=index;
	//klikitud väikepildi a vanemale lisatakse klass 'active' ning
	//õnnaselt (mõnelt teiselt a-lt) eemaldatakse klass 'active'
		self.parent().addClass('active').siblings().removeClass('active');
		   
//pildi laadimisel   
			$(img).load(function(){
			//keelatakse tavapärane käitumine
			event.preventDefault();
			//puhverdamine - see,millel klikiti on self
				var self=$(this),
			//oh- et meeles pidade hetkel kuvatava pildi kõrgust
				oh=current_image.height();
			// pilt on saabunud ning tühista loading ning eemalda klass 'loaderr'
				clearTimeout(loading);
				$('#section_photo').removeClass('loaderr');
			//uuel pildil klikki tehes peidetakse vana ära
				current_image.html(self.hide());
				//console.log('vana:%s, uus:%s',oh,self.height());
			// kui vana kõrgus ei ühti hetkel klikatud pildi kõrgusega	
				if( oh !=self.height){
			//siis sobiva kõrguse kuvamiseks toimub animatsioon 550ms jooksul
			//et kõrgus oleks võrdne antud pildi kõrgusega
				current_image.animate({'height':self.height() },550,function(){
					//ning klikitud pilt ilmub sujuvalt
						current_image.children('img').fadeIn();
				}) //kui vana kõrgus ühtib uuega, siis ilmub uus pilt sujuvalt
				} else{
					current_image.children('img').fadeIn();
				}
	//vastava  pildi kuvamiseks saab img element omadused src=images-massiivist vastava pildi võtme 
	//large väärtus, ning alt=images-massiivist vastava pildi võtme alt väärtus
				current_image.html($(this));
			}).attr({'src': images[index].large,'alt':images[index].alt});
		//bold elemendis kuvatakse vastava pildi järjekorra number
		//millele liidetakse juurde üks, sest massiivis algab lugemine 0ist
		$('b').text(image+1);
		    
	});
	
//saadetud urli puhul kuvab vastava suure pildi ja teeb väikese aktiivseks
	// kui saadetakse url, kus on hash(#)
	if( window.location.hash ){
	//siis hash võrdub saadetud hashiga
	  var hash=window.location.hash;
	  
	  //console.log(hash);
	//kas ühtib meil kasutatava  hashiga - img+järjekorranumber
	  if(/img\d/.test( hash )){
	//kui jah, siis muuda vastava pildi järjekorranumber massiivist stringiks
	    image=hash.match(/\d/g);
	//ning otsi thumbsist üles li, mis võrdub vastava mitmenda a-ga ning käivita klikk
	//ehk tee vastav li aktiivseks
		$('li:eq('+ image +') a', thumbs).click();
	  }
	}   else{
	// et background oleks koheselt pildi suurune
      
        current_image.css('height', '540');
					
				
  
  }
	//et lehel ei tekiks olukorda 4/3 - kus massiivis alustatakse lugemist 0ist ning
	//lehel ühest, siis lisame ühe juurde ning kuvame seda lehel piltide koguarvuna
	    fcount=count+1;
	//span elemendi sees olev &nbps asendatakse piltide koguarvuga
		$('span').text(fcount);
		
});
});