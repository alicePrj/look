//markup.js
var fileNames = [
	{
		"wallpaper_populartag.html": "배경화면 인기태그",
		"wallpaper_populartag_list.html": "배경화면 인기태그 리스트",
		"wallpaper_recommend.html": "배경화면 추천",
		"wallpaper_collection.html": "배경화면 컬렉션",
		"wallpaper_new.html": "배경화면 신규",
		"wallpaper_detail.html": "배경화면 상세"
	},
	{
		"coloringsheet_recommend.html": "컬러링시트 추천",
		"coloringsheet_collection.html": "컬러링시트 컬렉션",
		"coloringsheet_new.html": "컬러링시트 신규",
		"coloringsheet_detail.html": "컬러링시트 상세",
		"coloringsheet_download.html": "컬러링시트 다운로드",
		"coloringsheet_tag_list.html": "컬러링시트 태그 리스트"
	},
	{
		"sticker_list.html": "스티커 리스트",
		"sticker_detail.html": "스티커 상세"
	},
	{
		"artproducts_category.html": "아트상품 카테고리",
		"artproducts_category_list.html": "아트상품 카테고리 리스트",
		"artproducts_recommend.html": "아트상품 추천",
		"artproducts_new.html": "아트상품 신규"
	},
	{
		"bgm_gerne.html": "배경음악 장르",
		"bgm_recommend.html": "배경음악 추천",
		"bgm_collection.html": "배경음악 컬렉션",
		"bgm_new.html": "배경음악 신규",
		"bgm_detail.html": "배경음악 상세",
		"bgm_attribute_list.html": "관련 음원 리스트",
		"bgm_download.html": "배경음악 다운로드",
		"bgm_license.html": "배경음악 라이센스",
		"bgm_upload.html": "배경음악 업로드"
	},
	{
		"mypage_purchaselist_wallpaper.html": "마이페이지 구매내역 배경화면",
		"mypage_purchaselist_sticker.html": "마이페이지 구매내역 스티커",
		"mypage_purchaselist_bgm.html": "마이페이지 구매내역 배경음악",
		"mypage_purchaselist_coloringsheet.html": "마이페이지 구매내역 컬러링시트",
		"mypage_purchaselist_artproducts.html": "마이페이지 구매내역 아트상품",
		"mypage_giftbox.html": "마이페이지 선물함"
	},
	{
		"purchase_sticker.html": "구매하기 : 스티커",
		"purchase_coloringsheet.html": "구매하기 : 컬러링시트",
		"purchase_bgm.html": "구매하기 : 배경음악"
	},
	{
		"license_bgm.html": "라인센스 : 배경음악"
	},
	{
		"refund_bgm.html": "구매 취소 : 배경음악",
		"refund_sticker.html": "구매 취소 : 스티커",
		"refund_coloringsheet.html": "구매 취소 : 컬러링시트"
	},
	{
		"ems_download.html": "다운로드 메일 발송 템플릿",
		"searchbox.html": "검색"
	}
];

var menu = {
	'wallpaper' : {
		'name' : '배경화면',
		'submenu' : {
			'populartag':'인기태그','recommend':'추천','collection':'컬렉션','new':'신규'
		}
	},
	'sticker' : {
		'name' : '스티커',
		'submenu' : {
			'new': '신규', 'popular': '인기'
		}
	},
	'bgm' : {
		'name' : '배경음악',
		'submenu' : {
			'gerne' : '장르', 'collection': '컬렉션', 'recommend': '추천','new':'신규'
		}
	},
	'coloringsheet' : {
		'name' : '컬러링시트',
		'submenu' : {
			'recommend':'추천', 'collection': '컬렉션', 'new': '신규'
		}
	},
	'artproducts' : {
		'name' : '아트상품',
		'submenu' : {
			'category' : '카테고리', 'recommend': '추천','new':'신규'
		}
	}
};

function include(data,option) {
	var deferreds = [];

	for(var key in data)
	{
		deferreds.push($(key).load(data[key].path,data[key].callback));
	}

	$.when.apply(null, deferreds).done(function() {
		markup();
		tab_ui.init();
		//window.onModulesLoaded();
	});
}

function markup() {
	for(var key in fileNames)
	{
		for(var key2 in fileNames[key])
		{
			$('.file_list').append('<li class="c'+(parseInt(key)+1)+'"><a href="'+key2+'">'+fileNames[key][key2]+'</a></li>');
		}
	}

	//wallpaper_new
	if($('.new_wrap').length > 0)
	{
		each_list();
	}

	//wallpaper_collection
	if($('.group_wrap').length > 0)
	{
		var title = ['정효천 컬렉션','퍼엉 컬렉션','꽃 컬렉션'];
		card(title);
	}

	//wallpaper_detail
	if($('.wall_detail_wrap, .coloringsheet_detail_wrap').length > 0)
	{
		each_list();
	}

	//wallpaper_populartag
	if($('.wall_populartag_wrap').length > 0)
	{
		var data = [
			{title:"#소녀",text:"120장의 배경화면"},
			{title:"#연인",text:"182장의 배경화면"},
			{title:"#바다",text:"234장의 배경화면"},
			{title:"#사랑",text:"531장의 배경화면"},
			{title:"#봄",text:"164장의 배경화면"},
			{title:"#동물",text:"215장의 배경화면"}
		];

		media_list(data);
	}

	//wallpaper_popular_list
	if($('.wall_populartag_list, .coloringsheet_tag_list').length > 0)
	{
		each_list();
	}

	//wallpaper_recommend
	if($('.wall_recommend_group_wrap, .coloringsheet_recommend_group_wrap').length > 0)
	{
		var group_title = ['밤의 이야기','꽃과 소녀','겨울 산책'];
		card(group_title);
		each_list();
	}

	//sticker_list
	if($('.stk_lst_bx').length > 0)
	{
		var data = [
			{co:"퍼엉",tit:"[테스트] 편안하고 사랑스럽고 그래"},
			{co:"김나훔",tit:"나와 같다면"},
			{co:"김혜령",tit:"고양이 둥글레의 유유자적한 삶"},
			{co:"꼬닐리오",tit:"그래도 너를 사랑한단다"}
		];

		for(var i=0;i<data.length;i++)
		{
			$tmp_li = $('.stk_lst li').eq(0).clone();
			$tmp_li.find('img').attr('src','img/markup_test/sticker'+(i+1)+'.png');
			$tmp_li.find('.stk_co').html(data[i].co);
			$tmp_li.find('.stk_tit').html(data[i].tit);
			$('.stk_lst').append($tmp_li);
		}

		$('.stk_lst li').eq(0).remove();
	}

	//sticker_detail
	if($('.stk_info_sct').length > 0)
	{
		for(var i=1;i<=40;i++)
		{
			var $tmp_li = $('.img_lst li').eq(0).clone();
			$tmp_li.find('img').attr('src','http://beta.gfmarket.phinf.naver.net/puuung_01/original_'+i+'.png?type=mfullfill130_130');
			$('.img_lst').append($tmp_li);
		}

		$('.img_lst li').eq(0).remove();
	}

	//artproducts_category
	if($('.art_category_wrap').length > 0)
	{
		media_list();
	}

	//artproducts_category_list
	if($('.art_category_list').length > 0)
	{
		var data = [
			['카드_oh happy day','우쿠렐라','4,000원'],
			['키 큰 나무 일러스트 엽서','키 큰 나무의 마니','7,000원'],
			['굴리굴리 아트북','굴리굴리','25,000원'],
			['굴리굴리폰케이스/No.29','굴리굴리','17,000원']
		];

		each_list_description(data);
	}

	//artproducts_new
	if($('.art_new_wrap').length > 0)
	{
		var data = [
			['카드_oh happy day','우쿠렐라','4,000원'],
			['키 큰 나무 일러스트 엽서','키 큰 나무의 마니','7,000원'],
			['굴리굴리 아트북','굴리굴리','25,000원'],
			['굴리굴리폰케이스/No.29','굴리굴리','17,000원']
		];

		each_list_description(data);
	}

	//artproducts_recommend
	if($('.art_recommend_wrap').length > 0)
	{
		var data = [
			['카드_oh happy day','우쿠렐라','4,000원'],
			['키 큰 나무 일러스트 엽서','키 큰 나무의 마니','7,000원'],
			['굴리굴리 아트북','굴리굴리','25,000원'],
			['굴리굴리폰케이스/No.29','굴리굴리','17,000원']
		];

		each_list_description(data);
	}

	//bgm_gerne
	if($('.bgm_gerne_wrap').length > 0)
	{
		for(var i=0;i<7;i++)
		{
			var $tmp_li = $('.text_list li').eq(0).clone();
			$tmp_li.find('.text_wrap strong').html('배경음악 명');
			$('.text_list').append($tmp_li);
		}
	}

	//bgm_recommend
	if($('.bgm_recommend_wrap').length > 0)
	{
		media_list_square();
	}

	//bgm_new
	if($('.bgm_new_wrap').length > 0)
	{
		media_list_square();
	}

	//bgm_detail
	if($('.bgm_detail_wrap').length > 0)
	{
		media_list_square();
	}

	//bgm_attribute_list
	if($('.bgm_attribute_list_wrap').length > 0)
	{
		media_list_square();
	}

	//bgm_license
	if($('.bgm_license_wrap').length > 0)
	{
		for(var i=0;i<7;i++)
		{
			$('.fnq_list').append($('.fnq_list li').eq(0).clone());
			$('.fnq_list').append($('.fnq_list li').eq(1).clone());
		}
	}

	//mypage_purchaselist_sticker
	if($('.mypage_purchaselist_sticker_wrap').length > 0)
	{
		for(var i=0;i<2;i++)
		{
			$('.media_list_square.text_line_4').append($('.media_list_square.text_line_4 li').eq(1).clone());
		}
	}

	//mypage_purchaselist_wallpaper
	if($('.mypage_purchaselist_wallpaper_wrap, .mypage_purchaselist_coloringsheet_wrap').length > 0)
	{
		for(var i=0;i<2;i++)
		{
			$('.media_list_square.ratio_6x9').append($('.media_list_square.ratio_6x9 li').eq(1).clone());
		}
	}

	// stickerPopLayer 닫기
	closeStickerPopLayer();

	// layer_processing 닫기
	closeProcessingLayer();
}

function lnb(menu, on) {
	for(var key in menu)
	{
		$('.lnb ul').append('<li><a href="#"'+(key == on?' class="on"':'')+'>'+(menu[key].name ? menu[key].name : menu[key])+'</a></li>');
	}
}

function snb(menu, on) {
	for(var key in menu)
	{
		$('.snb ul').append('<li'+(key == on?' class="on"':'')+'><a href="#">'+(menu[key].name ? menu[key].name : menu[key])+'</a></li>');
	}
}

function each_list() {
	for(var i=1;i<=4;i++)
	{
		var $tmp_li = $('.each_list li').eq(0).clone();
		$tmp_li.find('img').attr('src','img/markup_test/slide'+i+'.jpg');
		$('.each_list').append($tmp_li);
	}

	$('.each_list li').eq(0).remove();
}

function each_list_description(data) {
	for(var i=0;i<data.length;i++)
	{
		$tmp_li = $('.each_list_description li').eq(0).clone();
		$tmp_li.find('img').attr('src','img/markup_test/slide'+(i+1)+'.jpg');
		$tmp_li.find('.product_name').html(data[i][0]);
		$tmp_li.find('.artist_name a').append(data[i][1]);
		$tmp_li.find('.product_price').html(data[i][2]);
		$('.each_list_description').append($tmp_li);
	}

	$tmp_li = $('.each_list_description li').eq(0).remove();
}

function card(title) {
	for(var i=0;i<title.length;i++)
	{
		var $tmp_card = $('.card').eq(0).clone();
		$tmp_card.find('.title_box h3').prepend(title[i]);
		$('.card').parent().append($tmp_card);
	}

	$('.card').eq(0).remove();
}

function media_list(data) {
	if(data)
	{
		var imax = data.length;
	}
	else
	{
		var imax = 5;
	}

	for(var i=0;i<imax;i++)
	{
		var $tmp_li = $('.media_list li').eq(0).clone();
		if(data)
		{
			$tmp_li.find('.text_wrap strong').html(data[i].title);
			$tmp_li.find('.text_wrap span').html(data[i].text);
		}
		$tmp_li.find('img').attr('src','img/markup_test/media_list_'+((i%3)+1)+'.jpg');
		$('.media_list').append($tmp_li);
	}

	$('.media_list li').eq(0).remove();
}

function media_list_square() {
	for(var i=0;i<7;i++)
	{
		var $tmp_li = $('.media_list_square li').eq(0).clone();
		$tmp_li.find('img').attr('src','img/markup_test/media_list_'+((i%3)+1)+'.jpg');
		$('.media_list_square').append($tmp_li);
	}

	$('.media_list_square li').eq(0).remove();
}

/*
 *	20160704 JHS
 *	tabUI : 공통댓글 & 다른 작품 탭 토글
 */
var tab_ui = {
	"init" : function () {
		if ( $('#tabUi').length > 0 ) {
			console.info('tabUi가 실행됩니다.');
			this.activatedTab = this.currentTabId = 1;
			this.activeTab();
			this.activeTabContent();
			this.setEvent();
		} else {
			return;
		}
	},
	"setEvent" : function () {
		$('#tabUi [data-tab]').click(function(e){
			e.preventDefault();
			this.activatedTab = e.currentTarget;
			this.currentTabId = $(this.activatedTab).attr("data-tab");
			this.activeTab();
			this.activeTabContent();
		}.bind(this));
	},
	"activeTab" : function () {
		$(this.activatedTab).siblings().removeClass('active');
		$(this.activatedTab).addClass('active');
	},
	"activeTabContent" : function () {
		$("[data-tab-content]").hide();
		$("[data-tab-content="+this.currentTabId+"]").show();
	}
}

/*
* 20160811
* stickerPopLayer 닫기
* */
var closeStickerPopLayer = function () {
	if ( ! $('.btn_pop_layer').length > 0 ) {
		return false;
	}
	$('.btn_pop_layer').click(function(){
		$(this).parents('.stickerPopLayer').css({display: "none"});
	})
};

/*
* 20160905
* layer_processing 레이어 닫기
* 마크업 전용 소스
* * */
var closeProcessingLayer = function () {
	if ( ! $('.layer_processing').length > 0 ) {
		return false;
	} else {
		$('.layer_processing').click(function(){
			$(this).attr('style', 'display: none');
		})
	}
};
