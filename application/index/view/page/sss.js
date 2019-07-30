$(function(){
	/* jquery.ui tooltip.js title缇庡寲 */
	$("[data-toggle='tooltip']").tooltip({
		position: {
			my: "left top+5",
			at: "left bottom"
		}
	});
	
	/* jquery.ui tooltip.js 鍥剧墖鏀惧ぇ */
	jQuery.tooltipimg = function(){
		$("[ectype='tooltip']").tooltip({
			content: function(){
				var element = $(this);
				var url = element.data("tooltipimg");
				if(element.is('[data-tooltipImg]')){
					return "<img src='" + url + "' />";
				}
			},
			position:{
				using:function(position,feedback){
					$(this).css(position).addClass("ui-tooltipImg");
				}
			}
		});
	}
	$.tooltipimg();
	
	/*鑷姩鍔犺浇椤甸潰*/
	$(document).on("click", "a", function(){
		var url = $(this).attr("href");
		var cls= $(this).attr("class");
		var target = $(this).attr("target");
		if(url != null && url !="#" && !url.match("javascript") && target != "_blank" &&  cls != "nyroModal"){
			$.cookie('dscUrl', url , { expires: 1 ,path:'/'});
		}
	})
	
	function autoLoadPage()
	{
		if($.cookie('dscUrl'))
		{
			$("iframe[name='workspace']").attr('src', $.cookie('dscUrl'));
		}
	}
	autoLoadPage();
	
	//iframe鍐呴〉a鏍囩閾炬帴璺宠浆璋冪敤iframe澶栫殑鏂规硶
	$("*[ectype='iframeHref']").on("click",function(){
		parent.intheHref($(this));
	});
	
	//鎿嶄綔鎻愮ず灞曞紑鏀惰捣
	$("#explanationZoom").on("click",function(){
		var explanation = $(this).parents(".explanation");
		var width = $(".content").width();
		if($(this).hasClass("shopUp")){
			$(this).removeClass("shopUp");
			$(this).attr("title","鏀惰捣鎻愮ず");
			explanation.find(".ex_tit").css("margin-bottom",10);
			explanation.animate({
				width:width-28
			},300,function(){
				$(".explanation").find("ul").show();
			});
		}else{
			$(this).addClass("shopUp");
			$(this).attr("title","鎻愮ず鐩稿叧璁剧疆鎿嶄綔鏃跺簲娉ㄦ剰鐨勮鐐�");
			explanation.find(".ex_tit").css("margin-bottom",0);
			explanation.animate({
				width:"100"
			},300);
			explanation.find("ul").hide();
		}
	});
	
	//璁剧疆閫夋嫨
	$(".setup").hover(function(){
		$(this).find("s").show();
		$(this).find(".setup_select").show();
		$(".ps-container").perfectScrollbar();
	},function(){
		$(this).find("s").hide();
		$(this).find(".setup_select").hide();
	});
	
	//鍏抽棴鎵撳紑鍒囨崲
	$(document).on("click",".switch_2",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).next("input[type='hidden']").val(0);
			$(this).attr("title","鍚�");
		}else{
			$(this).addClass("active");
			$(this).next("input[type='hidden']").val(1);
			$(this).attr("title","鏄�");
		}
	});
	
	//鍐呭椤靛垏鎹�
	$(document).on("click",".tabs_info li",function(){
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".switch_info").eq(index).show().siblings(".switch_info").hide();
		if($(".switch_info").siblings(".info_btn").length>0){
			document.getElementById("info_btn_bf100").className="info_btn info_btn_bf100";
			$(".switch_info").siblings(".info_btn").addClass("button-info-item"+index);
		}
	});
	
	//璁㈠崟缁熻鍒囨崲
	$(".stat_order_tabs li").on("click",function(){
		var index = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".stat_order_table_info").eq(index).show().siblings(".stat_order_table_info").hide();
	});
	
	//娣诲姞鍟嗗搧 鍒嗙被閫夋嫨
	$(document).on("click",".sort_list li",function(){
		$(this).addClass("current").siblings().removeClass("current");
	});
	
	// 閫夋嫨鍝佺墝
	$('input[name="brand_name"]').click(function(){
		$(".brand-select-container").hide();
		$(this).parents(".selection").next(".brand-select-container").show();
		$(".brand-list").perfectScrollbar("destroy");
		$(".brand-list").perfectScrollbar();
    });
	
	/* AJAX閫夋嫨鍝佺墝 */
    // 鏍规嵁棣栧瓧姣嶆煡璇�
    $('.letter').find('a[data-letter]').click(function(){
		var goods_id = $("input[name=goods_id]").val();
		var letter = $(this).attr('data-letter');	
		$(".brand-not strong").html(letter);		
		$.jqueryAjax('get_ajax_content.php', 'act=search_brand_list&goods_id='+goods_id+'&letter='+letter, function(data){			
			if(data.content){
				$(".brand-list").html(data.content);
				$(".brand-not").hide();
			}else{
				$(".brand-list").html("");
				$(".brand-not").show();
			}
			$(".brand-list").perfectScrollbar("destroy");
			$(".brand-list").perfectScrollbar();
		})
    });
    // 鏍规嵁鍏抽敭瀛楁煡璇�
    $('.b_search').find('a').click(function(){
		var goods_id = $("input[name=goods_id]").val();
		var keyword = $(this).prev().val();
		$(".brand-not strong").html(keyword);
		$.jqueryAjax('get_ajax_content.php', 'act=search_brand_list&goods_id='+goods_id+'&keyword='+keyword, function(data){
			if(data.content){				
				$(".brand-list").html(data.content);
				$(".brand-not").hide();
			}else{
				$(".brand-list").html("");
				$(".brand-not").show();
			}
			$(".brand-list").perfectScrollbar("destroy");
			$(".brand-list").perfectScrollbar();
		})		
    });
    // 閫夋嫨鍝佺墝
    $('.brand-list').on('click', 'li', function(){
        $(this).parents('.brand-select-container').prev().find('input[data-filter=brand_id]').val($(this).data('id'));
        $(this).parents('.brand-select-container').prev().find('input[data-filter=brand_name]').val($(this).data('name'));
        $('.brand-select-container').hide();
    });
	
	//鏄惁鍟嗗搧娲诲姩鍒囨崲
	$(".goods_activity .checkbox_item input[type='radio'],.goods_special .checkbox_item input[type='radio'],.switch_info .checkbox_item input[type='radio']").on("click",function(){
		var special_div = $(this).parents(".checkbox_items").next(".special_div");
		var hidden_div = $(this).parents(".checkbox_items").find(".hidden_div");
		if($(this).is(":checked")){
			var val = $(this).val();
			if(val == 1){
				special_div.show();
				hidden_div.show();
			}else{
				special_div.hide();
				hidden_div.hide();
			}
		}
	});
	
	/*甯︽悳绱㈢殑涓嬫媺鍒楄〃*/
	$(document).on("click",'.selection input[name="user_name"]',function(){
        $('.selection_select .select-container').show();
    });
	
    $('.select-list,.select-list2').on('click', 'li', function(){
        $(this).parents('.select-container').prev().children('input[name=user_id]').val($(this).data('id'));
        $(this).parents('.select-container').prev().children('input[name=user_name]').val($(this).data('name'));
        $('.selection_select .select-container').hide();
    });
	
	$(".select-list,.select-list2").hover(function(){
		$(".select-list,.select-list2").perfectScrollbar();
	});
	/*甯︽悳绱㈢殑涓嬫媺鍒楄〃end*/
    
	/* 鎼滅储鍗栧満鐨勪笅鎷夊垪琛� */
	$(document).on("click",'.selection input[name="rs_name"]',function(){
        $('.rs_select .select-container').show();
    });
	
    $('.select-list2').on('click', 'li', function(){
        $(this).parents('.select-container').prev().children('input[name=rs_id]').val($(this).data('id'));
        $(this).parents('.select-container').prev().children('input[name=rs_name]').val($(this).data('name'));
        $('.rs_select .select-container').hide();
    });
	
	$(".select-list,.select-list2").hover(function(){
		$(".select-list,.select-list2").perfectScrollbar();
	});
	/*甯︽悳绱㈢殑涓嬫媺鍒楄〃end*/
	
	
	/* 鍝佺墝鎼滅储鐨勪笅鎷夊垪琛� by wu start */
	/*$('.selection input[name="brand_name"]').click(function(){
		$(this).parents(".selection").next(".brand-select-container").show();
    });	*/
	/* 鍝佺墝鎼滅储鐨勪笅鎷夊垪琛� by wu end */
	
	/* 灞炴€фā寮忚缃� by wu start */
	$(document).on("click","#attribute_warehouse input",function(){
		var warehouse_id = $(this).val();
		var warehouse_obj = $("#attribute_region .value[data-wareid="+warehouse_id+"]");
		warehouse_obj.show();
		warehouse_obj.siblings(".value").hide();
		warehouse_obj.find("input[type=radio]:first").prop("checked", true);
		
		var goods_id = $("input[name='goods_id']").val();
		set_attribute_table(goods_id);		
	});
	
	if($("#attribute_city_region").length > 0){
		$(document).on("click","#attribute_city_region input",function(){
			var goods_id = $("input[name='goods_id']").val();
			set_attribute_table(goods_id, 3);		
		});	
	}else{
		$(document).on("click","#attribute_region input",function(){
			var goods_id = $("input[name='goods_id']").val();
			set_attribute_table(goods_id, 3);		
		});	
	}
	/* 灞炴€фā寮忚缃� by wu end */	
	
	/* 鍏宠仈璁剧疆鏁堟灉 by wu start */
	
	//閫変腑鐘舵€佸垏鎹�
	$(document).on("click",".move_info li",function(){
		if($(this).hasClass('current')){
			$(this).removeClass("current");
		}else{
			$(this).addClass("current");
		}
	});	
	
	//鍏ㄩ€夌姸鎬佸垏鎹�
	$(document).on("click","a[ectype=moveAll]",function(){
		if($(this).hasClass('checked')){
			$(this).removeClass('checked');
			$(this).parent().prev().find("li").removeClass("current");
		}else{
			$(this).addClass('checked');
			$(this).parent().prev().find("li").addClass("current");
		}
	});
	
	//纭畾鎿嶄綔
	$(document).on("click","a[ectype=sub]",function(){
		var obj = $(this);
		var goods_id = $("input[name=goods_id]").val();
		var artic_id = $("input[name=id]").val();
		var length = $(this).parent().prev().find("li.current").length; //閫変腑椤规暟閲�
		var step = $(this).parents(".step[ectype=filter]:first");
		step.find(".move_list").perfectScrollbar();
                
		var dealType = 0; //澶勭悊绫诲瀷锛�0涓篴jax澶勭悊锛堥粯璁わ級锛�1涓簀s澶勭悊 
		var label = 0;    //绉掓潃娲诲姩鐢ㄦ爣绛撅紝 0涓洪粯璁� 1涓虹鏉€娲诲姩
		if(length == 0){
			alert("璇烽€夋嫨鍒楄〃涓殑椤圭洰"); return;
		}
		
		var operation = $(this).data("operation"); //鎿嶄綔绫诲瀷	
		//灏嗘墍鏈夊€兼彃鍏ユ暟缁勪紶閫�		
		var value = new Array();
		length = $(this).parent().prev().find("li.current").each(function(){
			value.push($(this).data("value"));
		});
		var extension = ""; //鎵╁睍鏁版嵁

	
		//娣诲姞鍏宠仈鍟嗗搧
		if(operation == "add_link_goods"){
			var is_single = $(this).parents(".step[ectype=filter]").find("input[name=is_single]:checked").val(); //鍗曞悜鍏宠仈杩樻槸鍙屽悜鍏宠仈
			extension += "&is_single="+is_single;
		}
		
		//娣诲姞閰嶄欢
		if(operation == "add_group_goods"){
			var group2 = $(this).parents(".step[ectype=filter]").find("input[name=group2]:checked").val();
			var price2 = $(this).parents(".step[ectype=filter]").find("input[name=price2]").val();		
			extension += "&group2="+group2+"&price2="+price2;			
		}
		
		//娣诲姞銆佸垹闄ょ鏉€鍟嗗搧 liu
		if(operation == 'add_seckill_goods' || operation == 'drop_seckill_goods'){
			label = 1;
			var sec_num = $(this).parents(".step[ectype=filter]").find("input[name=sec_num]").val();
			var sec_price = $(this).parents(".step[ectype=filter]").find("input[name=sec_price]").val();
			var sec_limit = $(this).parents(".step[ectype=filter]").find("input[name=sec_limit]").val();
			var sec_id = $("input[name=sec_id]").val();
			var tb_id = $("input[name=tb_id]").val();
			extension += "&sec_num="+sec_num+"&sec_price="+sec_price+"&sec_limit="+sec_limit;
		}
		
		//娣诲姞鍏宠仈鏂囩珷
		if(operation == "add_goods_article"){
		}
		
		//鍒犻櫎鏂囩珷鐨勫叧鑱斿晢鍝�
		if(operation == "drop_link_artic_goods"){
			label = 2;
			
		}
		
		//娣诲姞鏂囩珷鐨勫叧鑱斿晢鍝�
		if(operation == "add_link_artic_goods"){
			label = 3;
			
		}

		//娣诲姞鍏宠仈鍦板尯
		if(operation == "add_area_goods"){
		}
		
		//娣诲姞姗辩獥鍟嗗搧
		if(operation == "add_win_goods"){
			var win_id = $("input[name=win_id]").val();
			extension += "&win_id="+win_id;
		}else if(operation == "drop_win_goods"){ //鍒犻櫎姗辩獥鍟嗗搧
			var win_id = $("input[name=win_id]").val();
			extension += "&win_id="+win_id;		
		}

		//娣诲姞缁熶竴璇︽儏
		if(operation == "add_link_desc"){
			var id = $("input[name=id]").val();
			extension += "&id="+id;					
		}else if(operation == "drop_link_desc"){ //鍒犻櫎缁熶竴璇︽儏
			var id = $("input[name=id]").val();
			extension += "&id="+id;			
		}		
		
		//璁剧疆妤煎眰鍝佺墝
		if(operation == "add_floor_content"){
			var group = $(this).parents(".step[ectype=filter]").find("input[name=group2]").val();		
			extension += "&group="+group;
		}
		
		//鍟嗗搧鎵归噺淇敼锛屽晢鍝佹壒閲忓鍑猴紝鍟嗗搧鏁版嵁鍒�
		if(operation == "add_edit_goods" || operation == "add_export_goods" || operation == "add_goods_fields"){
			dealType = 1;
			$(this).parent().prev().find("li.current").each(function(){
				//妫€鏌ユ槸鍚﹂噸澶�
				var thisCatId = $(this).data("value");
				var thisCatExist = obj.parents(".step[ectype=filter]:first").find(".move_right .move_list ul:first li[data-value="+thisCatId+"]").length;
				if(!thisCatExist)
				{
					var thisCat = $(this).clone();
					thisCat.find("i").removeClass("sc_icon_ok").addClass("sc_icon_no");
					obj.parents(".step[ectype=filter]:first").find(".move_right .move_list ul:first").append(thisCat);					
				}
			});
		}else if(operation == "drop_edit_goods" || operation == "drop_export_goods" || operation == "drop_goods_fields"){ //鍒犻櫎鍏宠仈鍦板尯
			dealType = 1;
			$(this).parent().prev().find("li.current").remove();
		}

		if(dealType == 0){
			if(label == 0){
				$.jqueryAjax("get_ajax_content.php", "act="+operation+"&goods_id="+goods_id+"&value="+value+extension, function(data){
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").html(data.content);
					
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar('destroy');
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar();
				});
			}else if(label == 1){
				$.jqueryAjax("get_ajax_content.php", "act="+operation+"&sec_id="+sec_id+"&tb_id="+tb_id+"&value="+value+extension, function(data){
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").html(data.content);
					
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar('destroy');
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar();
				});					
			}else if(label == 2){
				$.jqueryAjax("get_ajax_content.php", "act="+operation+"&article_id="+artic_id+"&value="+value+extension, function(data){
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").html(data.content);
					
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar('destroy');
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar();
				});
			}else if(label == 3){
				$.jqueryAjax("get_ajax_content.php", "act="+operation+"&article_id="+artic_id+"&value="+value+extension, function(data){
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").html(data.content);
					
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar('destroy');
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar();
				});
			}
		}
	});
	
	$(".move_middle .move_point").on("click",function(){
		var obj = $(this);
		var goods_id = $("input[name=goods_id]").val();
		var dealType = 0;
		var label = 0;    //绉掓潃娲诲姩鐢ㄦ爣绛撅紝 0涓洪粯璁� 1涓虹鏉€娲诲姩
		var operation = $(this).data("operation");
		var extension = "";
		var thisCatExist = 0;
		var i = 0;
		var thisCatId = "";
		var li = obj.parents(".move_middle").prev().find("li.current");
		var value = new Array();
		
		if(operation == "add_edit_goods" || operation == "add_export_goods" || operation == "add_goods_fields"){
			dealType = 1;
		}
		
		//娣诲姞姗辩獥鍟嗗搧
		if(operation == "add_win_goods"){
			var win_id = $("input[name=win_id]").val();
			extension += "&win_id="+win_id;
		}else if(operation == "drop_win_goods"){ //鍒犻櫎姗辩獥鍟嗗搧
			var win_id = $("input[name=win_id]").val();
			extension += "&win_id="+win_id;		
		}

		//娣诲姞缁熶竴璇︽儏
		if(operation == "add_link_desc"){
			var id = $("input[name=id]").val();
			extension += "&id="+id;					
		}else if(operation == "drop_link_desc"){ //鍒犻櫎缁熶竴璇︽儏
			var id = $("input[name=id]").val();
			extension += "&id="+id;			
		}
		
		//娣诲姞銆佸垹闄ょ鏉€鍟嗗搧 liu
		if(operation == 'add_seckill_goods' || operation == 'drop_seckill_goods'){
			label = 1;
			var sec_num = $(this).parents(".step[ectype=filter]").find("input[name=sec_num]").val();
			var sec_price = $(this).parents(".step[ectype=filter]").find("input[name=sec_price]").val();
			var sec_limit = $(this).parents(".step[ectype=filter]").find("input[name=sec_limit]").val();
			var sec_id = $("input[name=sec_id]").val();
			var tb_id = $("input[name=tb_id]").val();
			extension += "&sec_num="+sec_num+"&sec_price="+sec_price+"&sec_limit="+sec_limit;
		}
		
		if(li.length>0){
			li.each(function(){
				value.push($(this).data("value"));
				
				thisCatId = $(this).data("value");
				thisCatExist = obj.parents(".step[ectype=filter]:first").find(".move_right .move_list li[data-value="+thisCatId+"]").length;
				if(thisCatExist>0){
					i++;
				}
				if(dealType == 1 && !thisCatExist){
					var thisCat = $(this).clone();
					thisCat.find("i").removeClass("sc_icon_ok").addClass("sc_icon_no");
					obj.parents(".step[ectype=filter]:first").find(".move_right .move_list ul:first").append(thisCat);					
				}
			});
		}else{
			alert("璇烽€夋嫨鍒楄〃涓殑椤圭洰"); return;
		}
		
		if(i>0){
			alert("鎮ㄩ€夋嫨鐨勭被鐩湁閲嶅閫夐」璇锋煡鐪嬫竻妤氬湪閫夋嫨"); return;
		}
		
		if(dealType == 0){
			if(label == 0){
				$.jqueryAjax("get_ajax_content.php", "act="+operation+"&goods_id="+goods_id+"&value="+value+extension, function(data){
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").html(data.content);
					
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar('destroy');
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar();
				});				
			}else if(label == 1){
				$.jqueryAjax("get_ajax_content.php", "act="+operation+"&sec_id="+sec_id+"&tb_id="+tb_id+"&value="+value+extension, function(data){
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").html(data.content);
					
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar('destroy');
					obj.parents(".step[ectype=filter]").find(".move_right .move_list").perfectScrollbar();
				});					
			}
		}
	});
	
	/* 鍏宠仈璁剧疆鏁堟灉 by wu end */
	
	//涓婁紶鍥剧墖绫诲瀷
	/*$('input[class="type-file-file"]').change(function(){
		var state = $(this).data('state');
		var filepath=$(this).val();
		var extStart=filepath.lastIndexOf(".");
		var ext=filepath.substring(extStart,filepath.length).toUpperCase();

		if(state == 'txtfile'){
			if(ext!=".TXT"){
				alert("涓婁紶鏂囦欢闄愪簬txt鏍煎紡");
					$(this).attr('value','');
				return false;
			}
		}else if(state == 'imgfile'){
			if(ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
				alert("涓婁紶鍥剧墖闄愪簬png,gif,jpeg,jpg鏍煎紡");
					$(this).attr('value','');
				return false;
			}
		}else if(state == 'csvfile'){
			if(ext!=".CSV"){
				alert("涓婁紶鏂囦欢闄愪簬csv鏍煎紡");
					$(this).attr('value','');
				return false;
			}
		}else if(state == 'sqlfile'){
                    if(ext!=".SQL"){
				alert("涓婁紶鏂囦欢闄愪簬sql鏍煎紡");
					$(this).attr('value','');
				return false;
			}
    	}
	});*/
	
	//file绉诲姩涓婂幓鐨刯s
	/*$(".type-file-box").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});*/
	
	
	//鍏ㄩ€夊垏鎹㈡晥鏋�
	$(document).on("click","input[name='all_list']",function(){
		if($(this).prop("checked") == true){
			$(".list-div").find("input[type='checkbox']").prop("checked",true);
			$(".list-div").find("input[type='checkbox']").parents("tr").addClass("tr_bg_org");
		}else{
			$(".list-div").find("input[type='checkbox']").prop("checked",false);
			$(".list-div").find("input[type='checkbox']").parents("tr").removeClass("tr_bg_org");
		}
		btnSubmit();
	});
	
	//鍒楄〃鍗曢€�
	$(document).on("click",".sign .checkbox",function(){
		if($(this).is(":checked")){
			$(this).parents("tr").addClass("tr_bg_org");
		}else{
			$(this).parents("tr").removeClass("tr_bg_org");
		}
		btnSubmit();
	});
	
	//鍥惧簱鐩稿唽鍥剧墖鍗曢€�
	$(".pic-items .ui-checkbox").click(function(){
		btnSubmit();
	});
	
	function btnSubmit(){
		var length = $(".list-div").find("input[name='checkboxes[]']:checked").length;
		
		$(".list-div").find("input[name='checkboxes[]']:checked").parents("tr").addClass("tr_bg_org");
		
		if(length>0){
			if($("#listDiv *[ectype='btnSubmit']").length>0){
				$("#listDiv *[ectype='btnSubmit']").removeClass("btn_disabled");
				$("#listDiv *[ectype='btnSubmit']").attr("disabled",false);
			}
		}else{
			if($("#listDiv *[ectype='btnSubmit']").length>0){
				$("#listDiv *[ectype='btnSubmit']").addClass("btn_disabled");
				$("#listDiv *[ectype='btnSubmit']").attr("disabled",true);
			}
		}
	}
	//榛樿鎵ц
	btnSubmit();
	
	$(document).on("mouseenter",".list-div tbody td",function(){
		$(this).parents("tr").addClass("tr_bg_blue");
	});

	$(document).on("mouseleave",".list-div tbody td",function(){
		$(this).parents("tr").removeClass("tr_bg_blue");
	});

	//灞炴€ч€変腑鏁堟灉 by wu start
	$(document).on("click","#tbody-goodsAttr .checkbox_items label",function(){
		if($(this).siblings("input[type=checkbox]:first").prop("checked") == true){
			$(this).siblings("input[type=checkbox]:first").prop("checked",false);
		}else{
			$(this).siblings("input[type=checkbox]:first").prop("checked",true);
		}
		var goods_id = $("input[name='goods_id']").val();
		set_attribute_table(goods_id);
	});	
	//灞炴€ч€変腑鏁堟灉 by wu end
	
	//鍒楄〃椤甸粯璁ゆ悳绱� by wu start
	/*$(document).on("click",".search .btn",function(){
		$(this).parents(".search:first").find("input").each(function(){
			var name = $(this).attr('name');
			if($(this).is(":checkbox")){
				if($(this).is(":checked")){
					listTable.filter[name] = Utils.trim($(this).val());
				}else{
					listTable.filter[name] = '';
				}
			}else{
				listTable.filter[name] = Utils.trim($(this).val());
			}
		});
		listTable.filter['page'] = 1;
        listTable.loadList();		
	});*/
	//鍒楄〃椤甸粯璁ゆ悳绱� by wu end
	
	//鍒楄〃椤靛埛鏂� by wu start
	$(".refresh .refresh_tit").click(function(){
		var page = $("#gotoPage").val();
		listTable.gotoPage(page);
	})
	//鍒楄〃椤靛埛鏂� by wu end	
	
	//绛涢€夋悳绱㈠晢鍝�/鏂囩珷/鍏朵粬鍒楄〃 by wu start
	$("a[ectype='search']").on("click",function(){
		var obj = $(this);
		var step = $(this).parents(".step[ectype=filter]:first");
		var search_type = step.data("filter");
		var search_data = "";
        var ru_data = "";
		var search_div = $(this).parents(".goods_search_div:first"); //鎼滅储div
		if(search_type == "goods"){
			//鍟嗗搧绛涢€�
			//var search_div = $(this).parents(".goods_search_div");
			var cat_id = search_div.find("input[data-filter=cat_id]").val();
			var brand_id = search_div.find("input[data-filter=brand_id]").val();
			var keyword = search_div.find("input[data-filter=keyword]").val();
            var ru_id = search_div.find("input[data-filter=ru_id]").val();
            var limit_start = search_div.find("input[data-filter=limit_start]").val();
            var limit_number = search_div.find("input[data-filter=limit_number]").val();
            if(ru_id == null || typeof ru_id == "undefined"){
                ru_id = 0;
            }
            if(limit_start != null && typeof limit_start != "undefined"){
                search_data += "&limit_start="+limit_start;
            }
            if(limit_number != null && typeof limit_number != "undefined"){
                search_data += "&limit_number="+limit_number;
            }
            
			if(cat_id){
				search_data += "&cat_id="+cat_id;
			}
			if(brand_id){
				search_data += "&brand_id="+brand_id;
			}
			if(keyword){
				search_data += "&keyword="+keyword;
			}		
			if(ru_id){
				ru_data += "&ru_id="+ru_id;
			}	
            
		}else if(search_type == "article"){
			//鏂囩珷绛涢€�
			//var search_div = $(this).parents(".goods_search_div");
			var keyword = search_div.find("input[data-filter=keyword]").val();
			if(keyword){
				search_data += "&keyword="+keyword;
			}			
		}else if(search_type == "area"){
			//鍦板尯绛涢€�
			//var search_div = $(this).parents(".goods_search_div");
			var keyword = search_div.find("input[data-filter=keyword]").val();
			if(keyword){
				search_data += "&keyword="+keyword;
			}			
		}else if(search_type == "goods_type"){
			//鍟嗗搧绫诲瀷
			//var search_div = $(this).parents(".goods_search_div");
			var keyword = search_div.find("input[data-filter=keyword]").val();
			if(keyword){
				search_data += "&keyword="+keyword;
			}			
		}else if(search_type == "get_content"){
			//鍟嗗搧绛涢€�
			var cat_id = search_div.find("input[data-filter=cat_id]").val();
			var brand_id = search_div.find("input[data-filter=brand_id]").val();
			var keyword = search_div.find("input[data-filter=keyword]").val();
			if(cat_id){
				search_data += "&cat_id="+cat_id;
			}
			if(brand_id){
				search_data += "&brand_id="+brand_id;
			}
			if(keyword){
				search_data += "&keyword="+keyword;
			}				
		}
		
		step.find(".move_left .move_list:first,.move_all .move_list:first").html('<i class="icon-spinner icon-spin"></i>');

		function ajax(){
			$.jqueryAjax('get_ajax_content.php', 'act=filter_list&search_type='+search_type+search_data+ru_data, function(data){
				step.find(".move_left .move_list:first, .move_all .move_list:first").html(data.content);
				step.find(".move_left .move_list , .move_all .move_list").perfectScrollbar('destroy');
				step.find(".move_left .move_list, .move_all .move_list").perfectScrollbar();
			});
		}
		setTimeout(function(){ajax()},300);
	});
	//绛涢€夋悳绱㈠晢鍝�/鏂囩珷/鍏朵粬鍒楄〃 by wu end
	
	$(".text_time").click(function(){
		if(!$("#xv_Dates_box").is(":hidden")){
			$(".iframe_body").addClass("relative");
		}
	});
	
	$(document).click(function(e){
		/*
		**鐐瑰嚮绌虹櫧澶勯殣钘忓睍寮€妗�	
		*/
		
		//浼氬憳鎼滅储
		if(e.target.id !='user_name' && !$(e.target).parents("div").is(".select-container")){
			$('.selection_select .select-container').hide();
		}
		//鍗栧満鎼滅储
		if(e.target.id !='rs_name' && !$(e.target).parents("div").is(".select-container")){
			$('.rs_select .select-container').hide();
		}
		//鍝佺墝
		if(e.target.id !='brand_name' && !$(e.target).parents("div").is(".brand-select-container")){	
			$('.brand-select-container').hide();
			$('.brandSelect .brand-select-container').hide();
		}
		//鍒嗙被
		if(e.target.id !='category_name' && !$(e.target).parents("div").is(".select-container")){
			$('.categorySelect .select-container').hide();
		}
		//浠縮elect
		if(e.target.className !='cite' && !$(e.target).parents("div").is(".imitate_select")){
			$('.imitate_select ul').hide();
		}
		//鏃ユ湡閫夋嫨鎻掍欢
		if(!$(e.target).parent().hasClass("text_time")){
			$(".iframe_body").removeClass("relative");
		}
		//鏌ョ湅妗堜緥
		if(e.target.className !='view-case-tit' && !$(e.target).parents("div").is(".view-case")){
			$('.view-case-info').hide();
		}
	});
        
	//select涓嬫媺榛樿鍊艰祴鍊�
	$('.imitate_select').each(function()
	{
		var sel_this = $(this)
		var val = sel_this.children('input[type=hidden]').val();
		sel_this.find('a').each(function(){
			if($(this).attr('data-value') == val){
				sel_this.children('.cite').html($(this).html());
			}
		})
	});
	
	//鍒嗙被閫夋嫨
	$.category();
	
	$(document).on("click",".xds_item .xds_up",function(){
		var parent = $(this).parents(".xds_item");
		var _div = parent.clone();
		_div.find("input[type='input']").val("");
		_div.find(".xds_up").removeClass("xds_up").addClass("xds_down");
		parent.parents(".xds_items").append(_div);
	});
	$(document).on("click",".xds_item .xds_down",function(){
		var parent = $(this).parents(".xds_item");
		parent.remove();
	});
	
	//鏌ョ湅妗堜緥
	$(".view-case-tit").on("click",function(){
		var $this = $(this);
		$this.siblings(".view-case-info").slideToggle(300);
	});
	
	/*鏌ョ湅浼氬憳绛夌骇浠锋牸 鎵归噺淇敼*/
	$("[ectype='seeRank']").hover(function(){
		$(this).find(".rankPrice_tip").show();
	},function(){
		$(this).find(".rankPrice_tip").hide();
	});
	
	//杩斿洖涓婁竴椤�
	$(document).on("click","a[ectype=goback]",function(){
		history.go(-1);
	});
	
	//灞炴€ч€変腑鏁堟灉 by wu start
	$(document).off("click","#tbody-wholesale-goodsAttr .checkbox_items label").on("click","#tbody-wholesale-goodsAttr .checkbox_items label",function(){
		if($(this).siblings("input[type=checkbox]:first").prop("checked") == true){
			$(this).siblings("input[type=checkbox]:first").prop("checked",false);
		}else{
			$(this).siblings("input[type=checkbox]:first").prop("checked",true);
		}
		var goods_id = $("input[name='goodsId']").val();

		wholesale_set_attribute_table(goods_id);
	});
	
	//listTable span eidt 鐐瑰嚮淇敼
	$(document).on("click","*[ectype='editSpanInput'] .icon-edit",function(){
		$(this).siblings("span").click();
	});
	
	//閫氱敤 璇︽儏椤� 瀹℃牳鐘舵€佸垏鎹�
	$("*[ectype='general_audit_status'] input[type='radio']").on("click",function(){
		var val = $(this).val();
		
		if(val == 2){
			$("#review_content").show();
		}else{
			$("#review_content").hide();
		}
		if(val == 3){
			$("*[ectype='userInfo']").show();
		}else{
			$("*[ectype='userInfo']").hide();
		}   
	});
});

//娣诲姞闃舵浠锋牸 鏈夊垹闄�
function add_clonetd(obj,type){
    var obj = $(obj);
	var table = obj.parents(".table_div");
    var number_td = obj.parent().prev();
    var price_tr = obj.parents("tr").next();
    var price_td = price_tr.find("td:last-child");
    var handle_tr = obj.parents("tr").siblings().last();
	var handle_td = handle_tr.find("td:last-child");
	
    var copy_number_td = number_td.clone();
    var copy_price_td = price_td.clone();
	var copy_handle_td = handle_td.clone();
    var td_num = table.find(".td_num").length;
	
	var number = 3;
	
	if( obj.parents("*[ectype='volumeNumber']").length > 0){
		number = obj.parents("*[ectype='volumeNumber']").data("number");
	}
	
    if(td_num < number && td_num != 0){
        copy_number_td.find(".text").val("");
        copy_price_td.find(".text").val("");
        number_td.after(copy_number_td);
        price_tr.append(copy_price_td);
		handle_tr.append(copy_handle_td);
    }else if(td_num == 0){
		if(type == "mj"){
			number_td.after("<td><input type='text' name='cfull[]' value='' class='text w50 td_num'><input type='hidden' name='c_id[]' value='0' autocomplete='off'></td>");
			price_tr.append("<td><input type='text' name='creduce[]' value='' class='text w50'></td>");
		}else{
			number_td.after("<td><input type='text' name='volume_number[]' value='' class='text w50 td_num'><input type='hidden' name='id[]' value='0' autocomplete='off'></td>");
			price_tr.append("<td><input type='text' name='volume_price[]' value='' class='text w50'></td>");
		}
		handle_tr.append("<td><a href='javascript:;' class='btn btn25 blue_btn' data-id='0' ectype='remove_volume'>鍒犻櫎</a></td>");
	}else{
		pbDialog("鏈€澶氳缃笉鑳借秴杩�"+number+"涓�","",0);
    }
}

//娣诲姞闃舵浠锋牸 鏃犲垹闄�
function add_clonetd_two(obj,type){
	var obj = $(obj);
	var number_td = obj.parent().prev();
	var price_tr = obj.parents("tr").next();
	var price_td = price_tr.find("td:last-child");

	var copy_number_td = number_td.clone();
	var copy_price_td = price_td.clone();

	
	copy_number_td.find(".text").val("");
	copy_price_td.find(".text").val("");
	number_td.after(copy_number_td);
	price_tr.append(copy_price_td);
	if(type == null){
		var handle_tr = obj.parents("tr").siblings().last();
		var handle_td = handle_tr.find("td:last-child");
		var copy_handle_td = handle_td.clone();
		handle_tr.append(copy_handle_td);
	}
}



//绉诲姩鍒拌鍗曞彿鎮诞灞曠ず璁㈠崟璇︽儏鏂规硶
function orderLevitate(over,layer,top,left){
	var hoverTimer, outTimer,hoverTimer2;
	var left2 = $('.'+over).position().left + $('.'+over).outerWidth() + 30;
	$(document).on('mouseenter','.' + over,function(){
		var content = $("#order_goods_layer").html();
		var order_goods_layer = $(document.createElement('div')).addClass(layer);
		var $this = $(this);
		clearTimeout(outTimer);
		hoverTimer = setTimeout(function(){
			$(".order_goods_layer").remove();
			$this.parent().css("position","relative");
			order_goods_layer.html(content);
			if(left != null){
				order_goods_layer.find(".brank_s").addClass("brank_s_r");
				order_goods_layer.css({"left":left,"top":-top});
			}else{
				order_goods_layer.find(".brank_s").removeClass("brank_s_r");
				order_goods_layer.css({"left":left2,"top":-top});
			}
			$this.after(order_goods_layer);
		},200);
		
	});
	
	$(document).on('mouseleave','.'+over,function(){
		clearTimeout(hoverTimer);
		outTimer = setTimeout(function(){
			$('.'+layer).remove();
		},100);	
	});
	
	$(document).on('mouseenter','.'+layer,function(){
		clearTimeout(outTimer);
	});
	
	$(document).on('mouseleave','.'+layer,function(){
		$(this).remove();
	});
}

/* 鍒楄〃鎼滅储閫氱敤js */
function searchGoodsname(frm){
	var frm = $(frm);
	frm.find("input").each(function(){
		var t = $(this),
			name = t.attr("name");
	
		if(t.is(":checkbox")){
			if(t.is(":checked")){
				listTable.filter[name] = Utils.trim(t.val());
			}else{
				listTable.filter[name] = '';
			}
		}else{
			listTable.filter[name] = Utils.trim(t.val());
		}
	});
	
    listTable.filter['page'] = 1;
    
	listTable.loadList();
}


function searchGoodsname2(frm){
    alert(111);
    document.getElementById("workspace").location.href="http://google.com";
}

//棣栭〉绯荤粺淇℃伅鏀惰捣灞曞紑
jQuery.upDown = function(obj,title,section,w) {
	var obj = $(obj);
	var title = obj.parent(title);
	var section = obj.parents(section);
	var content = title.next();
	var width = $(".warpper").width();
	$(window).resize(function(){
		width = $(".warpper").width();
		if(! section.hasClass("w190")){
			section.css("width",width-w);
		}
	});
	
	obj.click(function(){
		if(obj.hasClass("stop_jia")){
			obj.removeClass("stop_jia");
			obj.attr("title","鏀惰捣璇︽儏")
			title.css("border-bottom","1px solid #e4eaec");
			section.removeClass("w190");
			section.animate({
				width:width-w
			},300,function(){
				content.show();
			});
		}else{
			obj.addClass("stop_jia");
			obj.attr("title","灞曞紑璇︽儏")
			title.css("border","0");
			section.animate({
				width:"190"
			},300);
			section.addClass("w190");
			content.hide();
		}
	});
}
/*鍒嗙被鎼滅储鐨勪笅鎷夊垪琛�*/
jQuery.category = function(){
	$(document).on("click",'.selection input[name="category_name"]',function(){
		$(this).parents(".selection").next('.select-container').show();
		$(".select-list").perfectScrollbar("destroy");
		$(".select-list").perfectScrollbar();
	});
	
	$(document).on('click', '.select-list li', function(){
		var obj = $(this);
		var cat_id = obj.data('cid');
		var cat_name = obj.data('cname');
		var cat_type_show = obj.data('show');
		var user_id = obj.data('seller');
		var table = obj.data('table');
		var url = obj.data('url');
		var lib	= obj.data('diff');
		

		/* 鑷畾涔夊鑸� start */
		if(document.getElementById('item_name')){
			$("#item_name").val(cat_name);
		}
		
		if(document.getElementById('item_url')){
			$("#item_url").val(url);
		}
		
		if(document.getElementById('item_catId')){
			$("#item_catId").val(cat_id);
		}
		/* 鑷畾涔夊鑸� end */
		
		$.jqueryAjax('get_ajax_content.php', 'act=filter_category&cat_id='+cat_id+"&cat_type_show=" + cat_type_show + "&user_id=" + user_id + "&table=" + table + "&lib=" + lib , function(data){
			if(data.content){
				if(data.cat_level != 1){
					if($("input[name='cat_alias_name']").length > 0){
						$("input[name='cat_alias_name']").attr("disabled",true);
						$("input[name='cat_alias_name']").val(" ");
					}
				}else{
					$("input[name='cat_alias_name']").attr("disabled",false);
					$("input[name='cat_alias_name']").val(" ");
				}
				obj.parents(".categorySelect").find("input[data-filter=cat_name]").val(data.cat_nav); //淇敼cat_name
				obj.parents(".select-container").html(data.content);
				$("#cate_title").val(data.cate_title);
				$("#cate_keywords").val(data.cate_keywords);
				$("#cate_description").val(data.cate_description);
				$(".select-list").perfectScrollbar("destroy");
				$(".select-list").perfectScrollbar();
			}
		});
		obj.parents(".categorySelect").find("input[data-filter=cat_id]").val(cat_id); //淇敼cat_id
		
		var cat_level = obj.parents(".categorySelect").find(".select-top a").length; //鑾峰彇鍒嗙被绾у埆
		if(cat_level >= 3){
			$('.categorySelect .select-container').hide();		
		}
	});
	
	//鐐瑰嚮a鏍囩杩斿洖鎵€閫夊垎绫� by wu
	$(document).on('click', '.select-top a', function(){
		
		var obj = $(this);
		var cat_id = obj.data('cid');
		var cat_name = obj.data('cname');
		var cat_type_show = obj.data('show');
		var user_id = obj.data('seller');
		var table = obj.data('table');
		var url = obj.data('url');
		var lib	= obj.data('diff');
		
		/* 鑷畾涔夊鑸� start */
		if(document.getElementById('item_name')){
			$("#item_name").val(cat_name);
		}
		
		if(document.getElementById('item_url')){
			$("#item_url").val(url);
		}
		
		if(document.getElementById('item_catId')){
			$("#item_catId").val(cat_id);
		}
		/* 鑷畾涔夊鑸� end */

		$.jqueryAjax('get_ajax_content.php', 'act=filter_category&cat_id='+cat_id+"&cat_type_show=" + cat_type_show + "&user_id=" + user_id + "&table=" + table + "&lib=" + lib, function(data){
			if(data.content){
				if(data.cat_level != 1){
					if($("input[name='cat_alias_name']").length > 0){
						$("input[name='cat_alias_name']").attr("disabled",true);
						$("input[name='cat_alias_name']").val(" ");
					}
				}else{
					$("input[name='cat_alias_name']").attr("disabled",false);
					$("input[name='cat_alias_name']").val(" ");
				}
				obj.parents(".categorySelect").find("input[data-filter=cat_name]").val(data.cat_nav); //淇敼cat_name
				obj.parents(".select-container").html(data.content);
				$(".select-list").perfectScrollbar("destroy");
				$(".select-list").perfectScrollbar();
			}
		});
		obj.parents(".categorySelect").find("input[data-filter=cat_id]").val(cat_id); //淇敼cat_id
	});	
	/*鍒嗙被鎼滅储鐨勪笅鎷夊垪琛╡nd*/
}

// 楂樼骇鎼滅储杈规爮鍔ㄧ敾
jQuery.gjSearch = function(right){
	$('#searchBarOpen').click(function() {
		$('.search-gao-list').animate({'right': '-40px'},200,
		function() {
			$('.search-gao-bar').animate({'right': '0'},300);
		});
	});
	$('#searchBarClose').click(function() {
		$('.search-gao-bar').animate({'right': right}, 300,
		function() {
			$('.search-gao-list').animate({'right': '0'},  200);
		});            
	});
}
// 楂樼骇鎼滅储杈规爮鍔ㄧ敾end