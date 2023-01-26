var iscashgreater;
var balance_amount;
var matbrand={

		matbrandList:[]

}
var selectmatbrand = {
		selectmatbrandList:[]
}
var taxamtarray={
		taxarray:[]
};

var TaxList;
var invoiceItems=[];
var inventoryItems=[];
var payment={
		paymentList:[{
			"id":"IMMEDIATE",
			"value":"IMMEDIATE",
		},
		{
			"id":"CREDIT",
			"value":"CREDIT"
		}
		]
};

var mainTemplate;
var popdiscamt = 0;
var popdiscperc = 0;
var popmaxpricePrice;

var inclusiveTax1Percentage = 0;
var inclusiveTax2Percentage = 0;
var inclusiveTax3Percentage = 0;

var inclusiveTax1Amount = 0 ;
var inclusiveTax2Amount = 0;
var inclusiveTax3Amount = 0;

var discountArray;
var finalOrderList = {
		orderItemList :[],
		orderTaxList :[],
		orderSurchargeList:[],
	    grandTotl:0,
	    subTotl:0
	};

var finalInvoiceList = {
		invoiceItemList :[],
		invoiceTaxList :[],
		invoiceSurchargeList:[],
		invoiceGrandTotl:0,
		invoiceSubTotl:0,
		discountList:[]
	};


var itemOrder = {
		itemTax:[],
	    itemSurcharge:[]
};

var sessiondata ={
		sessiondataList:[]
}

var mainCategory ={
		mainCategoryList:[]
}

var orderedMainCategoryList;

var material ={
		materialList:[]
}

var oldTotalPrice;
var cashDays="";
var creditDays="";
var immediatePaymentAmount=0;
var creditPaymentAmount=0;
var cashLimit = 0;
var creditLimit = 0;
var invoiceTemplate ;
var finalproduct1=[];
var finalproduct2=[];

var popUptax1 ;
var popUptax2 ;
var popUptax3 ;
var orderItemsId ;
var payTemplate;
var paymntTypeId;
var paymntTypes; 
var catergoryList = {
		categoryData :[]
}
var productListTemplate;
var materialname;
var i=0;
var j=0;
var popupCount = 0;
var popproductLst;
var selectedMaterial;
var mainOrderItemsId;
var totalQty;
var   vendor = {
    	vendorList:[]
}
var count = 0;
var warehouseTemp;
var wh1={
		wh1list:[]
	};
var shipwarehouseTemp;


var result = {
		invoiceItemList :[],
		
	};
var categoryTemplate;
var brand;

var outstandingValidation = false;

$(function(){
	
	
	
	isUserLoggedIn();
	buildMenuPanel();
	
	
	 var	compURL = request_url_ro + "companyBranch/getById/" + sessionStorage.getItem("companyBranch");
		var	companyDetails = fetchDataList(compURL);
		
		$("#loginedCompanyDescription").text("");
		if(companyDetails.RESPONSE_BODY.description != null && companyDetails.RESPONSE_BODY.description != ""){
			$("#loginedCompanyDescription").text(companyDetails.RESPONSE_BODY.description);
		}
	
    
	
		popcgsttaxTemplate=$("#popcgsttaxTmpl").html();
		
		popsgsttaxTemplate=$("#popsgsttaxTmpl").html();
		warehouseTemp=$("#warehseTmpl").html();
		shipwarehouseTemp=$("#shipwarehseTmpl").html();
		 categoryTemplate = $("#txtCategoryTmpl").html();
		 mainTemplate = $("#invoicetTmpl").html();
	
	sessionStorage.removeItem("ITEMS_LIST");
	sessionStorage.removeItem("INVOICE_ITEMS");
	
	
	productListTemplate=$("#productListTmpl").html();
	
//	 $("#txtInvDt").datepicker({
//			dateFormat : "dd-mm-yy",
//			 changeYear: true,
//			 changeMonth:true
//		});
//		$("#txtInvDt").val($.datepicker.formatDate('dd-mm-yy', new Date()));
//		
		
		payTemplate = $("#paymentListTmpl").html();
		
		/*strUrl=	request_url + "materialMST/getMatListByCategory/" + sessionStorage.getItem("PARENT_COMPANY_BRANCH")+"/"+sessionStorage.getItem("PROCESS_MATERIAL_ID");
		popproductLst = getJSONData(strUrl);*/
		
		 $("#paymentDueDate").datepicker({
				dateFormat : "dd-mm-yy",
				 changeYear: true,
				 changeMonth:true
			});
			$("#paymentDueDate").val($.datepicker.formatDate('dd-mm-yy', new Date()));	
			
			
			
			
			if(sessionStorage.getItem("KCB_COMPANY_LIST") !=null && sessionStorage.getItem("KCB_COMPANY_LIST") !="" ){
		 
		 wh1.wh1list = JSON.parse(sessionStorage.getItem("KCB_COMPANY_LIST"));
		 
		 $("#fromwhDL").html(_.template(warehouseTemp, wh1.wh1list));
		 $('#fromwhDL').trigger("create");
			
	 }else{
		 
	 
	 
	 var strURL = request_url_ro + "companyBranch/getBranchCompanyList";
		deptList = getJSONData(strURL);
		
			_.each(deptList.RESPONSE_BODY,function(vend){
				wh1.wh1list.push({
				 id:vend.wareHouseId,
			     value:vend.branchName,
			     companyRegion:vend.region,
			     companyRegionId:vend.id,
			     state:vend.state
			    // code:vend.whCode
			 });
		});
			 
			//alert(JSON.stringify(wh1.wh1list)+"...............");
			$("#fromwhDL").html(_.template(warehouseTemp, wh1.wh1list));
			$('#fromwhDL').trigger("create");
			
			sessionStorage.setItem("KCB_COMPANY_LIST",JSON.stringify(wh1.wh1list));
			
	 }
				
			//	alert(JSON.stringify(wh1.wh1list));
				
				
				$("#shipfromwhDL").html(_.template(shipwarehouseTemp, wh1.wh1list));
				$('#shipfromwhDL').trigger("create");
				
				
  if(sessionStorage.getItem("PRODUCT_BRANDS") !=null && sessionStorage.getItem("PRODUCT_BRANDS") !=""){
  
	  allproductBrands ={

				allproductBrandList:[]

		}

	 allproductBrands.allproductBrandList = JSON.parse(sessionStorage.getItem("PRODUCT_BRANDS"));

	/*	_.each(brndDetails,function(items){

			allproductBrands.allproductBrandList.push({

				id:items.id,

				value:items.name

			})

		});*/

	  
  }else{
	var strURL = request_url_ro + "productBrands/getBrandsList/" + sessionStorage.getItem("PARENT_COMPANY_BRANCH")+"/"+FOUR_WHEELER;

	probrandlList = getJSONData(strURL);

	

	allproductBrands ={

			allproductBrandList:[]

	}

	

	_.each(probrandlList.RESPONSE_BODY,function(items){

		allproductBrands.allproductBrandList.push({

			id:items.id,

			value:items.name,
			type:items.type

		})

	});

	sessionStorage.setItem("PRODUCT_BRANDS",JSON.stringify(allproductBrands.allproductBrandList));
  }
	
				
	 invoiceTemplate = $("#invoicetTmpl").html();

	 totalQty = 1;
	 
	 
//	 $("#invoiceDate").datepicker({
//			dateFormat : "dd-mm-yy",
//			changeYear:true,
//			changeMonth:true,
//		});
//		$("#invoiceDate").val($.datepicker.formatDate('dd-mm-yy', new Date()));
		
		 $("#orderDate").datepicker({
				dateFormat : "dd-mm-yy",
				changeYear:true,
				changeMonth:true,
			});
			$("#orderDate").val($.datepicker.formatDate('dd-mm-yy', new Date()));
			
			
			 $("#deliveryDate").datepicker({
					dateFormat : "dd-mm-yy",
					changeYear:true,
					changeMonth:true,
				});
				$("#deliveryDate").val($.datepicker.formatDate('dd-mm-yy', new Date()));
	 
	 var currentDate = new Date();
	    var dd = currentDate.getDate();
	    var mm = currentDate.getMonth();
	    mm = mm+1;
	    var yy = currentDate.getFullYear();
	    var today = dd+"-"+mm+"-"+yy;
	
	
	$("#cashPaydetails").change(function(){
		
		var grandTot=parseFloat(grandTotal);
		var payrec=parseFloat($("#cashPaydetails").val()); 

		balance_amount=payrec-grandTot;
		if(payrec<grandTot){
			iscashgreater=false;
			$("#balanceamt").val("");
			$("#msgcash").html("Amount should be greater than total.");		
		}
		else{
		$("#balanceamt").val(balance_amount.toFixed(2));
		$("#msgcash").html("");	
		iscashgreater=true;
		}
	});
	
	$("#cardname").change(function(){
		sessionStorage.setItem("PAY_MODE",$("#cardname").val());
		var paymentmode=sessionStorage.getItem("PAY_MODE");
		$("#msgtxt").html("please swipe the card.");
		
		$("#cardtype").html(paymentmode+" card details");
	});
	

	$("#txtcarddetails").keypress(function() {
	
		if ($(this).val().length == 78) {	
			
		processSwipe($(this).val());
		//$('#txtcarddetails').css("display", "hidden");
		}
		//$("#msgtxt").html('');
		
		});
	
	
	
	//$("#txtcarddetails").attr('readonly',true);
	$("#txtCardholderNamepop").attr('readonly',true);
	$("#txtCardNumberfrstfour").attr('readonly',true);
	$("#txtCardNumbermiddlefour").attr('readonly',true);
	$("#txtCardNumbermiddlefr").attr('readonly',true);
	$("#txtCardNumberlastfour").attr('readonly',true);
	$("#textexpdate").attr('readonly',true);
	
	
	$("#payModedialogue").blur(function(){
		
		
	});
	
	
	
	
	$("#insidetable").removeClass('tblaltclr');
	

	/*strURL = request_url + "product/getCategoryListByMaterial/" + sessionStorage.getItem("PARENT_COMPANY_BRANCH");
	categoryList = getJSONData(strURL);*/
	
//	console.log("categoryList..............."+JSON.stringify(categoryList));
	if (sessionStorage.getItem("PARTS_MAIN_CAT_LIST") == null) {

		var stringURL = request_url_ro + "materialCategory/getTopCategoryList/"
				+ sessionStorage.getItem("PARENT_COMPANY_BRANCH");
		mainCategoryList = getJSONData(stringURL);

		orderedMainCategoryList = _.sortBy(mainCategoryList.RESPONSE_BODY,
				function(items) {
					return items.id;
				});

		sessionStorage.setItem("PARTS_MAIN_CAT_LIST", JSON
				.stringify(orderedMainCategoryList));
	} else if (sessionStorage.getItem("PARTS_MAIN_CAT_LIST") != null) {

		orderedMainCategoryList = JSON.parse(sessionStorage
				.getItem("PARTS_MAIN_CAT_LIST"));

	}
	

	filteredMainCategory = _.sortBy(orderedMainCategoryList, function(items) {
		return items.materialCategoryName;
	});

	    _.each(filteredMainCategory,function(mat){

	    	mainCategory.mainCategoryList.push({

				 id:mat.id,

			     value:mat.materialCategoryName

			 });

		 });

	    

	    

	    
	    $("#maincategoryContainer").html(_.template(categoryTemplate, mainCategory.mainCategoryList));
		$('#maincategoryContainer').trigger("create");
	    
	    
      
  /*	product = {
			productList:[]
	}
      
  	
  	$("#categoryId").val("");*/
    
//    $("#categoryDL").val("ALL");
  

	
	/* _.each(categoryList.RESPONSE_BODY,function(item){
			catergoryList.categoryData.push({
				id:item.id,
				value:item.materialCategoryName,
			});
		});*/
  	
  	
//  	console.log("items................."+JSON.stringify(catergoryList.categoryData));
	
	       
	       /* $("#categoryDL").autocomplete({
	    	     source:catergoryList.categoryData,
	    	     select: function(e, ui) {
	    	    	 $("#productDL").val("");
	    	    	 $("#categoryId").val((ui.item.id));
	      
	    	        $("#categoryDL").val((ui.item.value));
	    	      
	    	        categoryId = $("#categoryId").val();
	    	        
	    	        
	    	      // alert(categoryId+"............categoryId")
	    	        
	    	    
	    	        if($("#categoryId").val() !=""){
	    	        	
	    	      //  alert("if......................")
	    	        	
	    	        	product = {
	    	        			productList:[]
	    	        	}
	    	        	
	    	    	strUrl=	request_url + "materialMST/getMatListByCategory/" + sessionStorage.getItem("PARENT_COMPANY_BRANCH")+"/"+categoryId;
	    	        	//alert(strUrl+"...................strUrl")
	    	    	productLst = getJSONData(strUrl);
	    	    	
	    	    	sessionStorage.setItem("ITEMS_LIST", JSON.stringify(productLst.RESPONSE_BODY));
	    	    	//console.log(JSON.stringify(productLst));
	    	    	
	    	    	 _.each(productLst.RESPONSE_BODY,function(prdlist){
		    	        	product.productList.push({
		    	        		 id:prdlist.id,
		    	    		     value:prdlist.materialName,
		    	        	    qty:prdlist.availableQuantity
		    	        	});
		    	        });
	    	         
    	        }else{
    	        	
    	        	
    	        //	alert("else............")
    	        	
    	        }
	    	        $("#productDL").autocomplete({
	    			     source:product.productList,
	    			     select: function(e, ui) {
	    			    	 $("#productId").val((ui.item.id).trim());
	    			         $(this).val(ui.item.value);   
	    			        $("#productDL").val((ui.item.value).trim());
	    			        $("#avialQnty").val(ui.item.qty);
	    			     
	    			        productId = $("#productId").val();
	    			        
	    			    //    updatePopupMaterialdetails(productId);
	    			    
	    			     },
	    			     change: function(e,ui){
	    			    	  $(this).val((ui.item ? ui.item.value : ""));
	    			    	},
	    			    	open: function(event, ui) { 
	    			   	         $(".ui-autocomplete").css("z-index", "2147483647 ");
	    			   	         }
	    			 });
	    	     
	    	       
	    	        },
	    		     change: function(e,ui){
	    		    	  $(this).val((ui.item ? ui.item.value : ""));
	    		    	},
	    		    	open: function(event, ui) { 
	    		   	         $(".ui-autocomplete").css("z-index", "2147483647 ");
	    		   	         }
	    	        });*/
	        
	        
	        
	        
	    	
//	        console.log("....eee................."+sessionStorage.getItem("ITEMS_LIST"));
	    	/*productLst = JSON.parse(sessionStorage.getItem("ITEMS_LIST"));
	  	
	  	 _.each(productLst,function(prdlist){
	          	product.productList.push({
	          		 id:prdlist.id,
	      		     value:prdlist.materialName,
	          	    qty:prdlist.availableQuantity
	          	});
	          });*/
//	  	console.log("....array................."+JSON.stringify(product.productList));

	     /* $("#productDL").autocomplete({
	  	     source:product.productList,
	  	     select: function(e, ui) {
	  	    	 $("#productId").val((ui.item.id).trim());
	  	         $(this).val(ui.item.value);   
	  	        $("#productDL").val((ui.item.value).trim());
	  	        $("#avialQnty").val(ui.item.qty);
	  	     
	  	        productId = $("#productId").val();
	  	        
	  	//      updatePopupMaterialdetails(productId);
	  	    
	  	     },
	  	     change: function(e,ui){
	  	    	  $(this).val((ui.item ? ui.item.value : ""));
	  	    	},
	  	    	 open: function(event, ui) { 
	  	   	         $(".ui-autocomplete").css("z-index", "2147483647 ");
	  		         }
	  	 });
	*/
	      
	      var strURL = request_url_ro + "vendor/getVendorList/"+sessionStorage.getItem("PARENT_COMPANY_BRANCH");
			vendorList = getJSONData(strURL);
			
	console.log("vendorList...."+JSON.stringify(vendorList));
			
			_.each(vendorList.RESPONSE_BODY,function(ven){
					vendor.vendorList.push({
						 id:ven.id,
					     value:ven.name,
					     vendorCode:ven.vendorCode,
                         gstin:ven.gstin
					 });
				 });

		 
		 $("#vendorDL").autocomplete({
		     source:  vendor.vendorList,
		     select: function(e, ui) {
		         // <--- Prevent the value from being inserted.
		         $("#vendorId").val((ui.item.id).trim());
		         $("#vendorCode").val((ui.item.vendorCode).trim());
		         $(this).val(ui.item.value);   
		        $("#vendorDL").val((ui.item.value).trim());
		          $("#vendorGstin").val((ui.item.gstin));
		        vendorId = $("#vendorId").val().trim();
		        vendorId = $("#vendorId").val();
		         vendorCode = $("#vendorCode").val();  
		     
		    	    	 
		    	//console.log("categoryList............."+JSON.stringify(materialCategoryList))
		     }
		     });
		 
		 	if(sessionStorage.getItem("PRODUCT_BRANDS") !=null && sessionStorage.getItem("PRODUCT_BRANDS") !=""){
  
	  allproductBrands ={

				allproductBrandList:[]

		}

	 allproductBrands.allproductBrandList = JSON.parse(sessionStorage.getItem("PRODUCT_BRANDS"));		
	
		}else{
	var strURL = request_url_ro + "productBrands/getBrandsList/" + sessionStorage.getItem("PARENT_COMPANY_BRANCH")+"/"+FOUR_WHEELER;

	probrandlList = getJSONData(strURL);

	

	allproductBrands ={

			allproductBrandList:[]

	}

	

	_.each(probrandlList.RESPONSE_BODY,function(items){

		allproductBrands.allproductBrandList.push({

			id:items.id,

			value:items.name,
			type:items.type

		})

	});

	sessionStorage.setItem("PRODUCT_BRANDS",JSON.stringify(allproductBrands.allproductBrandList));
  }
  
  
  
		 if(sessionStorage.getItem("FROM_STOCK") == "Y"){
			 
			 var stockInvoicedata = JSON.parse(sessionStorage.getItem("STOCK_VENDOR_INVOICE"));
				
				console.log("...stockInvoicedata........"+JSON.stringify(stockInvoicedata));
				
				sessiondata.sessiondataList = stockInvoicedata;
				
				
				
			console.log("...salesReport........"+JSON.stringify(sessiondata.sessiondataList));
		 
		 
			 stockList=JSON.parse(sessionStorage.getItem("STOCK_VENDOR_INVOICE"));
			 
			 _.each(stockList,function(itemList){
					
					$("#vendorDL").val(itemList.vendorName);
					
				});
			 
			 console.log("stockList........"+JSON.stringify(stockList));
			 
			 finalInvoiceList.invoiceItemList =  sessiondata.sessiondataList; 

		 
			 sessionStorage.setItem("INVOICE_DATA",JSON.stringify(sessiondata.sessiondataList));
			 createVendorItemsForInvoice();
			
		        result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
			 
			 
		 
			 
			 console.log(".....finalInvoiceList........"+JSON.stringify(result));
		 
		    $("#invoiceContainer").html(_.template(invoiceTemplate, result));
			$('#invoiceContainer').trigger("create");
			 
			 
		 }else{
			 
			 
			 $("#invoiceContainer").html(_.template(invoiceTemplate, finalInvoiceList));
				$('#invoiceContainer').trigger("create");
			 
			
		 }
		 
			
		
			 if(sessionStorage.getItem("TAX_LIST") ==null || sessionStorage.getItem("TAX_LIST") ==""){
			
			StrTaxURL = request_url_ro + "taxMaster/getTaxList/"
					+ sessionStorage.getItem("companyBranch") + "//";
			taxItemList = getJSONData(StrTaxURL);
			
			taxItemList.RESPONSE_BODY = _.reject(taxItemList.RESPONSE_BODY,function(item){
				return item.taxCategory !="GOODS GST"
			});

			sessionStorage.setItem("TAX_LIST", JSON.stringify(taxItemList.RESPONSE_BODY));
			
			 }
			 
			 $("#txt_cgst_tax").html(_.template(popcgsttaxTemplate, TaxList));
				$('#txt_cgst_tax').trigger("create");
				
				 $("#txt_sgst_tax").html(_.template(popsgsttaxTemplate, TaxList));
					$('#txt_sgst_tax').trigger("create");
					
		
				
					
});






function fetchDataList(requestURL) {
	return JSON.parse($.ajax({
		async : false,
		global : false,
		crossDomain : true,
		type : "GET",
		url : requestURL,
		contentType : "application/json",
		dataType : 'json',
		success : function(data) {
			return data;
		},
		error : onError
	}).responseText);
}

function onError(data, status) {
	alert("There was an error while fetching search results. Please try again!");
}



//search()

function vendorInvoice()
{
	
	
	var date;
	var vald = $('#orderCreateformForm').validate({
		rules : {
			vendorDL : {
				required : true
			},
			invoiceNumber : {
				required : true
			}
		}
	});
	vald.form();
	if($("#orderCreateformForm").valid()){
		
	var warehouse;
	var companyBranch;


	var StrUrl =request_url_ro + "materialInventory/getInvDetailsByVendorInv/"+"/"+$("#vendorId").val()+"/"+$("#invoiceNumber").val().replaceAll("/", "&")+"/"+"/";
	
	var vendorInvoiceDetails = getJSONData(StrUrl);
	
	
	console.log("vendorInvoiceDetails......."+JSON.stringify(vendorInvoiceDetails.RESPONSE_BODY));
		
	vendorInvoiceDetails.RESPONSE_BODY.forEach((item,key) =>{
		if(key == 0){
		date=item.vdrInvoiceDt;	
		
		warehouse = item.warehouseId;
		companyBranch = item.companyBranchId;
		return;
		}

	});
	
 //alert("date..."+date);		
 
	//alert("companyBranch..."+companyBranch);
	
	//alert("warehouse..."+warehouse);
	$("#invoiceDate").val(date);
	$("#fromwhDL").val(companyBranch);
	
	$("#shipfromwhDL").val(warehouse);
	shipcompanyBranchChange();
	billcompanyBranchChange();
	
	//$("#materialType-"+item.rowId).val(item.materialType);
				 
	
		
	sessionStorage.setItem("INVOICE_DATA",JSON.stringify(vendorInvoiceDetails.RESPONSE_BODY));

	
	createVendorItemsForInvoice();
	

	   invoicelist = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
		
	console.log("json..quotation lis afteraddd............"+JSON.stringify(invoicelist));
		 $("#invoiceContainer").html(_.template(invoiceTemplate, invoicelist));
	     $('#invoiceContainer').trigger("create");
	     
	    
//	      invoicelist.invoiceItemList.forEach((items)=>{
//		 date=items.invoiceDt
//	});
	       
	       
	     _.each(invoicelist.invoiceItemList,function(items){
	  		
	  		//alert(JSON.stringify(items));
	  		
	  		$("#cgsttax_"+items.rowId).val(items.tax1);
	  		
	  		$("#sgsttax_"+items.rowId).val(items.tax2);
	  		$("#sgsttax_"+items.rowId).prop('disabled',true);
	  		
	  		$("#matbrand-"+items.rowId).val(items.prdBrand);
	  		
	  		//alert("Brands..."+items.prdBrand);
	  		
	  		$("#materialType-"+items.rowId).val(items.materialType);
			
			
			//$("#itemMrp-"+items.rowId).val(items.maxRetailPrice)- $("#itemMrp-"+items.rowId).val(items.maxRetailPrice)
	  		
	  	});
	     
	     invoicelist.invoiceItemList = finalInvoiceList.invoiceItemList
	     
	//     invoicelist.invoiceItemList.push(finalInvoiceList.invoiceItemList);
	     
	     console.log(".....sss...."+JSON.stringify(finalInvoiceList.invoiceItemList));
	}    
	
}
//




/*function createOrderItem()
{
	//alert("inside");
	if(sessionStorage.getItem("ITEMS_LIST") != null){
	productList = JSON.parse(sessionStorage.getItem("ITEMS_LIST"));

			
		
			 _.each(productList, function(recpList) {
				
				
						
						alert(recpList.unitPrice+"recpList.sellingPrice");
						if(recpList.unitPrice == null)
							{
							recpList.unitPrice = 0.00;
							}
						  var discAmt  = 0;
						  var prdOrdQty = recpList.finalOrderQty;
						  var discount = recpList.discount;
						  if (discount > 0) {
							  discAmt = ((discount/100) * (prdOrdQty * recpList.sellingPrice));
						  }
						  			 
						   var prdTotalPrice = ((recpList.unitPrice * prdOrdQty) - discAmt);
						
						   recpList.totalPrice = prdTotalPrice.toFixed(2);
					
						   if(recpList.tax1Id != null)
							   {
							
							   calulateTaxDetails(recpList.totalPrice,0,recpList.tax1Id);
							   }
						   if(recpList.tax2Id != null)
						   {
						   calulateTaxDetails(recpList.totalPrice,0,recpList.tax2Id);
						   }
						   if(recpList.tax3Id != null)
						   {
						   calulateTaxDetails(recpList.totalPrice,0,recpList.tax3Id);
						   }
						   recpList.taxArr = itemOrder.itemTax;
				           recpList.surArr = itemOrder.itemSurcharge;
					
						
						   
						  recpList.orderQty = prdOrdQty;
						  recpList.discAmt = discAmt.toFixed(2);
						  recpList.discount = discount;
						  recpList.imageurl="";
						  if(recpList.imageMedia != null)
							  {
							  recpList.imageurl = recpList.imageMedia.mediaUrl;
							  }
						 
						
				  finalOrderList.orderItemList.push({
					  "matId" : recpList.id,
					  "orderQty": recpList.orderQty,
					  "unitPrice" : recpList.unitPrice,
					  "totalPrice" :  recpList.totalPrice,
					  "catId": recpList.materialCategoryId,
					  "matName": recpList.matName,
					  "catName": recpList.materialCategoryName,
					  "discAmt" : recpList.discAmt,
					  "discount": recpList.discount,
					  "taxArray":itemOrder.itemTax,
					  "surchargeArray":itemOrder.itemSurcharge,
					  "tax1" : recpList.tax1Id,
					  "tax2" : recpList.tax2Id,
					  "tax3" : recpList.tax3Id,
					  "surcharge1" : recpList.surcharge1Id,
					  "surcharge2" : recpList.surcharge2Id,
					  "surcharge3" : recpList.surcharge3Id,
					  "aQnty":recpList.availableQuantity,
					  "matCode":recpList.matCode,
					  "optionListName":recpList.matOptionName,
					  "optionListId":recpList.optionId,
					  "mediaFolder":recpList.mediaFolderPath,
					  "mediaDomain":recpList.mediaDomainURI,
					  "mediaImage":recpList.imageurl
				  });
				 
				//  return recpList;
				 
										
					 itemOrder.itemTax = [];
					 itemOrder.itemSurcharge = [];
					 
				

				 });
			

			alert("addoption"+JSON.stringify(finalOrderList));
			
			 var subTl = 0;
			 var taxTl = 0;
			 var surTl = 0;
			 var grnTl = 0;
			 _.each(finalOrderList.orderItemList,function(oItem){
				
				 subTl = parseFloat(subTl) + parseFloat(oItem.totalPrice);
				 
			 });
			 _.each(finalOrderList.orderTaxList,function(tItem){
				
				 taxTl = parseFloat(taxTl) + parseFloat(tItem.totalamount);
				
			 });
			 _.each(finalOrderList.orderSurchargeList,function(sItem){
				
				 surTl = parseFloat(surTl) + parseFloat(sItem.totalamount);
				 
			 });
			grnTl = subTl + taxTl + surTl; 
			
			 grnTl = grnTl.toFixed(2);
			
			 subTl = subTl.toFixed(2);
			 
			
			 finalOrderList.grandTotl = grnTl;
			 
			 finalOrderList.subTotl = subTl;
			  console.log(JSON.stringify(finalOrderList));
				
				console.log(JSON.stringify(itemOrder));

	
			 sessionStorage.setItem("ORDER_ITEMS", JSON.stringify(finalOrderList));
					
			 console.log("final ranjan .........."+sessionStorage.getItem("ORDER_ITEMS"));
			 
			 productLst = JSON.parse(sessionStorage.getItem("ORDER_ITEMS"));
			 
				$("#invoiceContainer").html(_.template(invoiceTemplate, productLst));
//				$("#invoiceContainer").listview('refresh');
				$('#invoiceContainer').trigger("create");
				
      }
	


}*/





function displaydialgcredeb(){
	
	$("#msg").html("");
	var paymentmode=sessionStorage.getItem("PAY_MODE");


	var data=$("#txtcarddetails").val();
	
	$('#payModedialogue').popup();
	
	$('#payModedialogue').popup('open');
	$('#txtcarddetails').focus();
	$('#txtcarddetails').val("");

}

function displayCashdialg(paymode){
	var amt=0.00;
	iscashgreater=true;
	sessionStorage.setItem("PAY_MODE",paymode);
	$("#msg").html("");
	$("#cash").html(paymode +" Details");
	$("#cashPaydetails").val('');
	$('#cashModedialogue').popup();
	$("#balanceamt").val("");	
	$("#cashPaydetails").val("");
	$("#invoiceamount").val(grandTotal);
	$('#invoiceamount').attr('readonly',true);
	if(paymode=='Cash'){
		
	}else if(paymode=='Credit'){
		
	$("#cashPaydetails").val(amt);
	var cashamt=parseInt($("#cashPaydetails").val());
	$("#invoiceamount").val(grandTotal);
	var inv=parseInt($("#invoiceamount").val());
	$("#balanceamt").val(grandTotal);
	 balance_amount=$("#balanceamt").val();
	}
	$('#cashModedialogue').popup('open');
}

function CancelDiagCash(){
	$('#cashModedialogue').popup('close');
	
}

function processSwipe(value) {

    var parsedSwipe = parseSwipe(value);
    if (parsedSwipe.CreditCardNumber) {
    
    	var number=parsedSwipe.CreditCardNumber;
          var firstNum= number.substring(0, 4);
          var secNum=number.substring(4,8);
          var thirdNum=number.substring(8,12);
          var fouthNum=number.substring(12,16);
       
       $("#txtCardNumberfrstfour").val(firstNum);
       $("#txtCardNumbermiddlefour").val(secNum);
       $("#txtCardNumbermiddlefr").val(thirdNum);
       $("#txtCardNumberlastfour").val(fouthNum);
   //   $("#txtCardNumber").val(parsedSwipe.CreditCardNumber);
      $("#textexpdate").val("");
      $("#txtCardholderNamepop").val("");
    }
    if (parsedSwipe.ExpirationDate) {
      $("#textexpdate").val(parsedSwipe.ExpirationDate);
    }
    if (parsedSwipe.NameOnCard) {
      $("#txtCardholderNamepop").val(parsedSwipe.NameOnCard);
    }


  }


function parseSwipe(swipe) {
	
    var swipeData = {};
    if (swipe.indexOf('^') > -1) {
      var cardData = swipe.split('^');
      swipeData.CreditCardNumber = $.trim(cardData[0].replace(/[^0-9]/g, ''));
      if (swipe.length > 1)
        swipeData.NameOnCard = $.trim(cardData[1].replace(/\//, ' '));
      if (swipe.length > 2)
        swipeData.ExpirationDate = $.trim(cardData[2].substring(2, 4) + cardData[2].substring(0, 2));
    }
    else if (swipe.indexOf('=') > -1) {
      var cardData = swipe.split('=');
      swipeData.CreditCardNumber = $.trim(cardData[0].replace(/[^0-9]/g, ''));
      
      
      if (swipe.length > 1)
        swipeData.ExpirationDate = $.trim(cardData[1].substring(2, 4) + cardData[1].substring(0, 2));
    }
    return swipeData;
  }

function displayOrderTypeDialog(){

/*	var vald = $('#paymentmode').validate({
		rules : {
			txtCardholderNamepop : {
				required : true
			},
			txtCardNumberfrstfour : {
				required:true
			},
			txtCardNumbermiddlefour :{
				required:true
			},
			txtCardNumbermiddlefr :{
				required:true
			},
			txtCardNumberlastfour :{
				required:true
			},
			textexpdate :{
				required:true
			}
		}
	});
	vald.form();

	if ($('#paymentmode').valid()) {*/
	
	if(iscashgreater!=false){
	
	var grandTot=parseInt($("#grandTotal").val());
	var payrec=parseInt($("#payreceived").val());   
	
	var balance_amount=grandTot-payrec;

	regURL = request_url + "posOrder/updateInvoiceDetails";
	
	var dataString = JSON.stringify({
		id:sessionStorage.getItem('orderId'),
		paymentType:sessionStorage.getItem("PAY_MODE"),
		orderStatus:$("#orderStatus").val(),
	//	pymtRcvdAmt:$("#payreceived").val(),
		balAmt:balance_amount,
		customerName:$("#txtCustomerName").val(),
		updatedBy:sessionStorage.getItem("userName"),
		paymentStatus:"PAID"
	});

	$.ajax({
		type : "POST",
		url :regURL ,
		crossDomain : true,
		data : dataString,
		contentType : "application/json",
		dataType : 'json',
		beforeSend: function(){
            $("#loading").show();
                $(".spinner-border").css("display", "block");
             },
             complete: function(){
                     setTimeout(function(){
             $(".spinner-border").hide();
                      }, 1000);
                   }, 
		success : onInvoiceupdate,
		error : onInvoiceError
	});
	}
	
	}





function onCashSave(){
	
	var paymode=sessionStorage.getItem("PAY_MODE");

	
	var vald = $('#cashModeform').validate({
		rules : {
			cashPaydetails : {
				required : true,number:true
			}
		}
	});
	
	vald.form();
	
	if ($('#cashModeform').valid()) {
		
	if(iscashgreater!=false){
	//alert(balance_amount);
	regURL = request_url + "posInvoice/updateInvoiceDetails";
	
	var dataString = JSON.stringify({
		id:sessionStorage.getItem('orderId'),
		paymentType:paymode,
		poNum: $("#txtPonumber").val(),
		pymtRcvdAmt:$("#cashPaydetails").val(),
		balAmt:balance_amount,
		customerName:$("#txtCustomerName").val(),
		updatedBy:sessionStorage.getItem("userName"),
		paymentStatus:"PAID"
	});
	
	//console.log("dataString..................................."+(dataString));

	$.ajax({
		type : "POST",
		url :regURL ,
		crossDomain : true,
		data : dataString,
		contentType : "application/json",
		dataType : 'json',
		beforeSend: function(){
            $("#loading").show();
                $(".spinner-border").css("display", "block");
             },
             complete: function(){
                     setTimeout(function(){
             $(".spinner-border").hide();
                      }, 1000);
                   }, 
		success : onInvoiceCashupdate,
		error : onInvoiceCashError
	});
}
}
}
function cancelDiag(){
	$('#payModedialogue').popup('close');
}

function onInvoiceCashupdate(){
	$('#cashModedialogue').popup('close');
	alert("Invoice created successfully.");

	location.href="viewinvoice_withdimension.html";
	
}

function onInvoiceCashError(){
	alert("There was an error while fetching search results. Please try again!");
}

function onInvoiceupdate(){
	$('#payModedialogue').popup('close');
	alert("Invoice update successful.");
	
	
	
}
function onInvoiceError(){
	alert("There was an error while fetching search results. Please try again!");
}



function getJSONData(reqURL) {
	return JSON.parse($.ajax({
		async : false,
		global : false,
		crossDomain : true,
		beforeSend: function(){
	            $("#loading").show();
	                $(".spinner-border").css("display", "block");
	             },
	             complete: function(){
	                     setTimeout(function(){
	             $(".spinner-border").hide();
	                      }, 1000);
	                   }, 
		type : "GET",
		url : reqURL,
		contentType : "application/json",
		dataType : 'json',
		success : function(data) {
			return data;
		}
	}).responseText);
}

function saveInvoiceDetails(){
		
	var vald = $('#orderCreateformForm').validate({
		rules : {
			vendorDL : {
				required : true
			}
			
		}
	});
	vald.form();
	
	
	if ($('#orderCreateformForm').valid()) {
		
	var surcharge1TotAmt;
	var surcharge2TotAmt;
	var surcharge3TotAmt;
	var miscAmount;
	var overallsurcharge1Id;
	var overallsurcharge2Id;
	var overallsurcharge3Id

	var overallTdis1Id;
	var overallTdis2Id;
	var overallTdis3Id;
	var dis1TotAmt;
	var dis2TotAmt;
	var dis3TotAmt;
	var overallDis1Name;
	var overallDis2Name;
	var overallDis3Name;
    var	overallDis1Perc;
    var	overallDis2Perc;
    var	overallDis3Perc;
	
	var future = new Date();
	var dd = future.getDate();
	var mm = future.getMonth()+1; //January is 0!
	var yyyy = future.getFullYear();
	var min=future.getMinutes();
	var hh=future.getHours();
	var sec = future.getSeconds();
	if(dd<10){
		dd="0"+dd;
	}
	if(mm<10){
		mm="0"+mm;
	}
	var todaydate=dd+"-"+mm+"-"+yyyy+" "+hh+":"+min;
	
	
	 var date = $("#txtInvDt").val();
	 
	 overallTaxable1Amt = 0;
	 overallTaxable2Amt = 0;
	 overallTaxable3Amt = 0;
	 overallTaxable4Amt = 0;
	 overallTaxable5Amt = 0;
	 overallTaxable6Amt = 0;
	 overallTaxable7Amt = 0;
	 overallTaxable8Amt  = 0;
	 overallTaxable9Amt = 0;
	 overallTaxable10Amt = 0;
	 overallTaxable11Amt = 0;
	 overallTaxable12Amt = 0;
	 
	 var totalFreightAmt = 0;
	 
//	    var invoiceDate;
//	    if(date != "")
//	    	{
//	    	invoiceDate =date+" "+hh+":"+min+":"+sec;
//	    	}else{
//	      invoiceDate = dd+"-"+mm+"-"+yy+" "+hh+":"+min+":"+sec;
//	    	}
	    
	     var resultList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
		var invoiceNum ;
		

		if($("#txtInvoiceNumber").val() != null && $("#txtInvoiceNumber").val() !=""){
			invoiceNum = $("#txtInvoiceNumber").val();
		}
	    
		/* var stockInvoicedata = JSON.parse(sessionStorage.getItem("STOCK_VENDOR_INVOICE"));
			
			console.log("...stockInvoicedata........"+JSON.stringify(stockInvoicedata));
			
			sessiondata.sessiondataList = stockInvoicedata;
			
		console.log("...salesReport........"+JSON.stringify(sessiondata.sessiondataList));
	 
	 
		 stockList=JSON.parse(sessionStorage.getItem("STOCK_VENDOR_INVOICE"));
		 
		 console.log("stockList........"+JSON.stringify(stockList));
	 
	 
		 finalInvoiceList.invoiceItemList =  sessiondata.sessiondataList; 	*/
		
	
          var invoiceGrnNumber;
	
		_.each(finalInvoiceList.invoiceItemList,function(oitem){
			
			var dis1Name;
		var dis2Name;
		var dis3Name;
		var dis1Amt;
		var dis2Amt;
		var dis3Amt;
		var dis1Perc;
		var dis2Perc;
		var dis3Perc;
		var tax1Id;
		var tax2Id;
		var tax3Id;
		var tax1Amt;
		var tax2Amt;
		var tax3Amt;
		var tax1Name;
		var tax2Name;
		var tax3Name;
		var tax1Perc;
		var tax2Perc;
		var tax3Perc;
		var surcharge1Amt;
		var surcharge2Amt;
		var surcharge3Amt;
		var surcharge1Id;
		var surcharge2Id;
		var surcharge3Id;
		
		var m =0;
		
		//console.log("oitem.taxArray........"+JSON.stringify(oitem.taxArray));
		
				_.find(oitem.taxArray,function(tItems){
					
					if(m == 0){
						tax1Amt = tItems.taxAmount;
						tax1Id  = tItems.taxId;
						tax1Perc = tItems.taxPercent;
						tax1Name = tItems.taxType;
					}
					if(m == 1){
						tax2Amt = tItems.taxAmount;
						tax2Id  = tItems.taxId;
						tax2Perc = tItems.taxPercent;
						tax2Name = tItems.taxType;
					}
					if(m == 2){
					
					tax3Amt = tItems.taxAmount;
					tax3Id  = tItems.taxId;
					tax3Perc = tItems.taxPercent;
					tax3Name = tItems.taxType;
					}
					m++;
				});
				var n = 0;
				_.find(oitem.surchargeArray,function(tItems){
					if(n == 0){
					
						surcharge1Amt = tItems.taxAmount;
						surcharge1Id  = tItems.taxId;
						
					}
					if(n == 1){
					
						surcharge2Amt = tItems.taxAmount;
						surcharge2Id  = tItems.taxId;
					
					}
					if(n == 2){
					
						surcharge3Amt = tItems.taxAmount;
						surcharge3Id  = tItems.taxId;
				
					}
					n++;
				});
				var d =0;
				
				
		_.find(oitem.discArray,function(dItems){
			if(d == 0){
				dis1Amt = dItems.disAmt;
				dis1Perc = dItems.discPerc;
				dis1Name = dItems.discType;
			}
			if(d == 1){
				dis2Amt = dItems.disAmt;
				dis2Perc = dItems.discPerc;
				dis2Name = dItems.discType;
			}
			if(d == 2){
			
				dis3Amt = dItems.disAmt;
				dis3Perc = dItems.discPerc;
				dis3Name = dItems.discType;
			}
			d++;
		});
		
				
				
				
				if(oitem.materialCategoryName != null && oitem.materialCategoryName != undefined){
					
					categoryname = oitem.materialCategoryName;
				}
				else{
					
					categoryname = "";
				}
				
			    invoiceGrnNumber = oitem.batchNumber;
				
			    invoiceItems.push({
		            "materialCategoryId":oitem.materialCategoryId,
					"matId" : oitem.materialId,
					"finalOrderQty" : oitem.finalOrderQty,
					"unitPrice" : parseFloat(oitem.unitPrice).toFixed(2),
					"itemQty" : oitem.itemQty,
					"orderId" : oitem.orderId,
					"orderItemId" : oitem.orderItemId,
					"matName" : oitem.matName,
					"hsnCode" : oitem.hsnCode,
					//"finalOrderQty":oitem.finalOrderQty,
					"itemStatus":oitem.itemStatus,
					"discountAmt" : oitem.discAmt,
					"discount":oitem.batchDiscountPercentage,
					"totalPrice" : oitem.totalPrice,
					"matTaxAblePrice" :parseFloat(oitem.unitPrice).toFixed(2),
					"matCode":oitem.matCode,
					"tax1Id":tax1Id,
						"tax1Amt":tax1Amt,
						"tax1Name":tax1Name,		
						"tax2Id":tax2Id,
						"tax2Amt":tax2Amt,
						"tax2Name":tax2Name,
						"tax3Id":tax3Id,
						"tax3Amt":tax3Amt,	
						"tax3Name":tax3Name,
						"tax1Percent" : tax1Perc,
						"tax2Percent" : tax2Perc,
						"tax3Percent" : tax3Perc,
						"surcharge1Id":surcharge1Id,
						"surcharge1Amt":surcharge1Amt,
						"surcharge2Id":surcharge2Id,
						"surcharge2Amt":surcharge2Amt,
						"surcharge3Id":surcharge3Id,
						"surcharge3Amt":surcharge3Amt,	
						
					"companyBranchId":$("#billcompanyRegionId").val(),
					"warehouseId":$("#shipfromwhDL").val(),
					
					"createdBy" : sessionStorage.getItem("userName"),
					"updatedBy" : sessionStorage.getItem("userName"),
					"matUnqNum":oitem.matUnqNum,
					"isManageInventory":'N',
					"maxRetailPrice":oitem.maxRetailPrice,
					"custMatCode":oitem.custMatCode,
					"brandId":oitem.brandId,
					"prdBrand":oitem.prdBrand,
					"poId":oitem.poId,
					"poNum":oitem.poNum,
					"rackNumber":oitem.rackNumber,
					"goodsReceivedDt":oitem.goodsReceivedDt,
					"batchNumber":oitem.batchNumber,
					"grnNumber":oitem.batchNumber,
					"materialType":oitem.materialType,
					"materialUOM":oitem.materialUOM,
					"disc1Name":dis1Name,
					"disc1Amt":dis1Amt,
					"disc1Pctg":dis1Perc,
					"disc2Name":dis2Name,
					"disc2Amt":dis2Amt,
					"disc2Pctg":dis2Perc,
					"disc3Name":dis3Name,
					"disc3Amt":dis3Amt,
					"disc3Pctg":dis3Perc,
					"vendorName":$("#vendorDL").val(),
				    "vendorId":$("#vendorId").val(),
				    "vendorCode":$("#vendorCode").val(),
					"isActive":"Y",
					"itemStatus":"OPEN",
					"invoiceType":"REGULAR", 
					"invoiceNum" : $("#invoiceNumber").val(),
				   "vendorCode":$("#vendorCode").val(),
					"materialCategoryName":oitem.catName
				});
			    
			  /*  inventoryItems.push({
			    	"matCode":oitem.matCode,
					"matUnqNum":oitem.matUnqNum,
					"materialName":oitem.matName,
					"materialMRP":oitem.maxRetailPrice,
					"materialId":oitem.matId,
					"materialUOM":oitem.materialUOM,
					"matDimThick":oitem.matDimThick,
					"matDimLength":oitem.matDimLength,
					"matDimBreadth":oitem.matDimBreadth,
					"companyBranchId":sessionStorage.getItem("companyBranch"),
					"materialCategoryId":oitem.materialCategoryId,
					"batchGoodsReceivedDate":invoiceDate,
					"batchPurchaseOrderNumber":invoiceNum,
					"batchGoodsReceiptNumber":invoiceNum,
					"batchQuantity":oitem.finalOrderQty, 	
					"createdBy":sessionStorage.getItem("userName"),
					"updatedBy":sessionStorage.getItem("userName"),
					"isActive":"Y",
					  "vendorId":$("#vendorId").val(),
					  "vendorName":$("#vendorDL").val(),
					"warehouseId": sessionStorage.getItem("WAREHOUSE_ID")
				});*/

					});
		
	/*	var j = 0;
		_.each(resultList.invoiceTaxList,function(taxsItem){
			if(j == 0)
				{
				overallTax1Id = taxsItem.taxId;
				tax1TotAmt = taxsItem.totalamount;
				overallTax1Name =taxsItem.taxName;
				overallTax1Perc = taxsItem.taxPercent;
				}
			else if(j == 1)
				{
				overallTax2Id = taxsItem.taxId;
				tax2TotAmt = taxsItem.totalamount;
				overallTax2Name =taxsItem.taxName;
				overallTax2Perc = taxsItem.taxPercent;
				}
			else if(j == 2)
			{
				overallTax3Id = taxsItem.taxId;
			tax3TotAmt = taxsItem.totalamount;
			overallTax3Name =taxsItem.taxName;
			overallTax3Perc = taxsItem.taxPercent;
			}
			j++;
		});*/
		
		/*var surcharge1TotAmt;
		var surcharge2TotAmt;
		var surcharge3TotAmt;
		var miscAmount;
		var overallsurcharge1Id;
		var overallsurcharge2Id;
		var overallsurcharge3Id*/
		
		

//		taxassigntoInvoice(productLst.invoiceTaxList);

	/*	var k = 0;
		_.each(productLst.invoiceSurchargeList,function(taxsItem){
			if(k == 0)
				{
				overallsurcharge1Id = taxsItem.taxId;
				surcharge1TotAmt = taxsItem.totalamount;
				}
			else if(k == 1)
				{
				overallsurcharge2Id = taxsItem.taxId;
				surcharge2TotAmt = taxsItem.totalamount;
				}
			else if(k == 2)
			{
			overallsurcharge3Id = taxsItem.taxId;
			surcharge3TotAmt = taxsItem.totalamount;
			}
			k++;
		});
	*/
taxassigntoInvoice(resultList);
	
	
var dj = 0;
_.each(resultList.discountList,function(taxsItem){
	if(dj == 0)
		{
		overallTdis1Id = taxsItem.discId;
		dis1TotAmt = taxsItem.totalDisamount;
		overallDis1Name =taxsItem.discType;
		overallDis1Perc = taxsItem.discPerc;
		}
	else if(dj == 1)
		{
		overallTdis2Id = taxsItem.discTypeId;
		dis2TotAmt = taxsItem.totalDisamount;
		overallDis2Name =taxsItem.discType;
		overallDis2Perc = taxsItem.discPerc;
		}
	else if(dj == 2)
	{
		overallTdis3Id = taxsItem.discId;
		dis3TotAmt = taxsItem.totalDisamount;
		overallDis3Name =taxsItem.discType;
		overallDis3Perc = taxsItem.discPerc;
	}
	dj++;
});

var k = 0;
_.each(resultList.invoiceSurchargeList,function(taxsItem){
	if(k == 0)
		{
		overallsurcharge1Id = taxsItem.taxId;
		surcharge1TotAmt = taxsItem.totalamount;
		}
	else if(k == 1)
		{
		overallsurcharge2Id = taxsItem.taxId;
		surcharge2TotAmt = taxsItem.totalamount;
		}
	else if(k == 2)
	{
	overallsurcharge3Id = taxsItem.taxId;
	surcharge3TotAmt = taxsItem.totalamount;
	}
	k++;
});

taxableValueassigntoInvoice(resultList);

	var datastring=JSON.stringify({
		"vendorInvoiceItemsList":invoiceItems,
		"invoiceTotalAmount" : Math.round($("#txtgrandTotal").val()).toFixed(2),
		"invoiceSubTotalAmount" :$("#subTotalCd").val(),
		"vendorId":$("#vendorId").val(),
		"vendorName":$("#vendorDL").val(),
		"vendorCode":$("#vendorCode").val(),
		
	
		"invoiceStatus":"INVOICED",
		
		"paymentType":$("#paymentType").val(),
		"invoiceDt":$("#invoiceDate").val(),
		"invoiceNum":$("#invoiceNumber").val(),
		"poNum":$("#orderNumber").val(),
		"poDt":$("#orderDate").val(),
		"dispatchDt":$("#deliveryDate").val(),
		"customerReference":$("#custCode").val(),
		"vendorNote":$("#supplyRefNo").val(),
		"ewaybillNumber":$("#ewaybillNum").val(),
		"shiptoCompanyName":$("#shipfromwhDL option:selected").text(),
		"billtoCompanyName":$("#fromwhDL option:selected").text(),
		"deliveryTerms":$("#termsOfDelivery").val(),
		"transportMode":$("#dispatchThrough").val(),
		"transportDestLoc":$("#destination").val(),
		"billingAddressId":$("#billToaddressId").val(),
		"shippingAddressId":$("#shipToaddressId").val(),
		
 		"invoiceCreatedByName": sessionStorage.getItem("userName"),
		"companyBranchId":$("#billcompanyRegionId").val(),
		"createdBy" : sessionStorage.getItem("userName"),
		"updatedBy" : sessionStorage.getItem("userName"),
		"invoiceType":"REGULAR",
		"tax1Id":overallTax1Id,
		"tax1Name":overallTax1Name,
		"tax1Pctg":overallTax1Perc,
		"tax1Amt":tax1TotAmt,
		"tax2Name":overallTax2Name,
		"tax2Id":overallTax2Id,
		"tax2Amt":tax2TotAmt,
		"tax2Pctg":overallTax2Perc,
		"tax3Id":overallTax3Id,
		"tax3Name":overallTax3Name,
		"tax3Amt":tax3TotAmt,
		"tax3Pctg":overallTax3Perc,
		"tax4Id":overallTax4Id,
		"tax4Name":overallTax4Name,
		"tax4Pctg":overallTax4Perc,
		"tax4Amt":tax4TotAmt,
		"tax5Id":overallTax5Id,
		"tax5Name":overallTax5Name,
		"tax5Pctg":overallTax5Perc,
		"tax5Amt":tax5TotAmt,
		"tax6Id":overallTax6Id,
		"tax6Name":overallTax6Name,
		"tax6Pctg":overallTax6Perc,
		"tax6Amt":tax6TotAmt,
		"tax7Id":overallTax7Id,
		"tax7Name":overallTax7Name,
		"tax7Pctg":overallTax7Perc,
		"tax7Amt":tax7TotAmt,
		"tax8Id":overallTax8Id,
		"tax8Name":overallTax8Name,
		"tax8Pctg":overallTax8Perc,
		"tax8Amt":tax8TotAmt,
		"surcharge1Id":overallsurcharge1Id,
		"surcharge1Amt":surcharge1TotAmt,
		"surcharge2Id":overallsurcharge2Id,
		"surcharge2Amt":surcharge2TotAmt,
		"surcharge3Id":overallsurcharge3Id,
		"surcharge3Amt":surcharge3TotAmt,
		"tax1TaxableAmt":overallTaxable1Amt,
		"tax2TaxableAmt":overallTaxable2Amt,
		"tax3TaxableAmt":overallTaxable3Amt,
		"tax4TaxableAmt":overallTaxable4Amt,
		"tax5TaxableAmt":overallTaxable5Amt,
		"tax6TaxableAmt":overallTaxable6Amt,
		"tax7TaxableAmt":overallTaxable7Amt,
		"tax8TaxableAmt":overallTaxable8Amt,
		"tax9TaxableAmt":overallTaxable9Amt,
		"tax10TaxableAmt":overallTaxable10Amt,
		"tax11TaxableAmt":overallTaxable11Amt,
		"tax12TaxableAmt":overallTaxable12Amt,
		  "isManageInventory":"N",
		  "gstin":$("#vendorGstin").val(),
		  "grnNumber":invoiceGrnNumber
	});
   
	
	
         console.log("dataStringdataString..........."+datastring);


	   var invURL = request_url + "vendorInvoice/add";
	   
		
		
		$.ajax({
			type : "POST",
			url : invURL,
			crossDomain : true,
			data : datastring,
			contentType : "application/json",
			dataType : 'json',
			beforeSend: function(){
	            $("#loading").show();
	                $(".spinner-border").css("display", "block");
	             },
	             complete: function(){
	                     setTimeout(function(){
	             $(".spinner-border").hide();
	                      }, 1000);
	                   }, 
		
			success : onInvSuccess,
			error : onInvError
		});
		
		
}
	
}


function onInvSuccess(data) {
	
	alert("Purchase invoice created successfully.");
	location.href="vendor_invoiceinq.html";
}

function onInvError() {
	alert("System Error!! Please try again...");
}

function cancelInvoice(){
	
	//location.href="../../order/order-noinventory/pataaki/orderinq.html";
	
	location.href="invoiceinq_withdimension.html";
}



function calculateDeliveryCharges(grndTotal,element){
	var amt = element.value;
	if(amt != ""){
		var packamt = $("#packageCharges").val();
		var lessamt = $("#lessAmt").val();
		$("#otherCharges").val(parseFloat(amt).toFixed(2));
		
	    var currentSubTotal = parseFloat(amt)+parseFloat(grndTotal)+parseFloat(packamt)-parseFloat(lessamt);
		currentSubTotal = currentSubTotal.toFixed(2);
		$("#txtgrandTotal").val(currentSubTotal);
		$("#txtgrandTotalPrint").html('<b>'+currentSubTotal+'</b>');
		
		
		
	}
}

function calculatePackageCharges(grndTotal,element){
	var amt = element.value;

	if(amt != ""){
		var transamt = $("#otherCharges").val();
		var lessamt = $("#lessAmt").val();
		$("#packageCharges").val(parseFloat(amt).toFixed(2));
	    var currentSubTotal = parseFloat(amt)+parseFloat(grndTotal)+parseFloat(transamt)-parseFloat(lessamt);
		currentSubTotal = currentSubTotal.toFixed(2);
		$("#txtgrandTotal").val(currentSubTotal);
		$("#txtgrandTotalPrint").html('<b>'+currentSubTotal+'</b>');
		
		
		
	}
}


function calculatelessAmt(grndTotal,element){
	var amt = element.value;

	if(amt != ""){
		var transamt = $("#otherCharges").val();
		
		var packamt = $("#packageCharges").val();
		$("#lessAmt").val(parseFloat(amt).toFixed(2));
	    var currentSubTotal = parseFloat(packamt)+parseFloat(grndTotal)+parseFloat(transamt)-parseFloat(amt);
		currentSubTotal = currentSubTotal.toFixed(2);
		$("#txtgrandTotal").val(currentSubTotal);
		$("#txtgrandTotalPrint").html('<b>'+currentSubTotal+'</b>');
		
		
		
	}
}

function onSaveInvoice()
{
	
	//var type= $('input[name=paymode]:checked').val();
//	var surcharge1TotAmt;
//	var surcharge2TotAmt;
//	var surcharge3TotAmt;
//	var miscAmount;
//	var overallsurcharge1Id;
//	var overallsurcharge2Id;
//	var overallsurcharge3Id
//
//	var overallTdis1Id;
//	var overallTdis2Id;
//	var overallTdis3Id;
//	var dis1TotAmt;
//	var dis2TotAmt;
//	var dis3TotAmt;
//	var overallDis1Name;
//	var overallDis2Name;
//	var overallDis3Name;
//    var	overallDis1Perc;
//    var	overallDis2Perc;
//    var	overallDis3Perc;

	
	var invDate = new Date();
	var dd = invDate.getDate();
	var mm = invDate.getMonth();
	mm = mm +1;
	var yy = invDate.getFullYear();
	var hh = invDate.getHours();
    var min = invDate.getMinutes();
    var sec = invDate.getSeconds();
    var date = $("#invoiceDate").val();
//    overallTaxable1Amt = 0;
//	 overallTaxable2Amt = 0;
//	 overallTaxable3Amt = 0;
//	 overallTaxable4Amt = 0;
//	 overallTaxable5Amt = 0;
//	 overallTaxable6Amt = 0;
//	 overallTaxable7Amt = 0;
//	 overallTaxable8Amt  = 0;
//	 overallTaxable9Amt = 0;
//	 overallTaxable10Amt = 0;
//	 overallTaxable11Amt = 0;
//	 overallTaxable12Amt = 0;
//	 
//	 var totalFreightAmt = 0;
	 
    var invoiceDate;
    if(date != "")
    	{
    	invoiceDate =date+" "+hh+":"+min+":"+sec;
    	}else{
      invoiceDate = dd+"-"+mm+"-"+yy+" "+hh+":"+min+":"+sec;
    	}
   // alert(invoiceDate)
	
	
	
	$("#msgtxt").html("");
	 var vald = $('#orderCreateformForm').validate({
			rules : {
	
				vendorDL : {
					required : true
				},
				txtInvoiceNumber : {
					required : true
				}
			}
		});
		vald.form();
	
	//$("#saveButton").attr("disabled","disabled");
	var immediatePaymentChecking = false;
	var creditPaymentChecking = false;
	
	/*alert("payment type...."+$("#paymentType").val());*/
	
	if(paymntTypes == "IMMEDIATE")
		{
		//alert(cashLimit+" "+immediatePaymentAmount);
		if(parseFloat(immediatePaymentAmount) > parseFloat(cashLimit))
			{
			immediatePaymentChecking = true;
			}
		}
	else if(paymntTypes == "CREDIT")
		{
		//alert(creditLimit+" "+creditPaymentAmount);
		
		if(parseFloat(creditPaymentAmount) > parseFloat(creditLimit))
			{
			creditPaymentChecking = true;
			}
		}
	/*alert(immediatePaymentAmount+" *** "+creditPaymentAmount);
	alert(creditLimit+" "+cashLimit);
	alert(immediatePaymentChecking+"...."+creditPaymentChecking);*/
	
	if(!immediatePaymentChecking && !creditPaymentChecking){
		
		saveInvoiceDetails();
	
	}
else if(immediatePaymentChecking)
{
$("#saveButtonTr").hide();
$("#saveOverrideButton").show();
creditChecking = false;
cashChecking = true;
$("#msgtxt").text("Credit lock has been activated for this customer. Please take necessary approvals to create invoice.");
}
else if(creditPaymentChecking)
{
	$("#saveButtonTr").hide();
	$("#saveOverrideButton").show();
	creditChecking = true;
	cashChecking = false;
$("#msgtxt").text("Credit lock has been activated for this customer. Please take necessary approvals to create invoice.");
}


	}
		/*	else
			{
			$("#msgtxt").html("Please select payment from the list");
			}*/
/*		}
}
*/
function getPaymentDetails(paymentType)
{
	var noOfDays="";
	if(paymentType == "IMMEDIATE")
		{
		noOfDays = cashDays;
		}
	else if(paymentType == "CREDIT")
		{
		noOfDays = creditDays;
		}
	
	//alert(paymentType+"..................paymentType")
	
	
	$("#saveButton").attr("disabled",false);
	var strURL = request_url_ro + "posInvoice/getOutstandingDetailsByCustomer/"+sessionStorage.getItem("companyBranch")+"/"+ 
	sessionStorage.getItem("btobcustomerid")+"/"+noOfDays+"/"+paymentType;
	paymentDetails = getJSONData(strURL);
	//console.log(JSON.stringify(paymentDetails));
	immediatePaymentAmount=0;
	creditPaymentAmount=0;
	if(paymentDetails.RESPONSE_BODY != null){
		
	if(paymentDetails.RESPONSE_BODY.cashOutstandingAmount != null)
		{
		
		immediatePaymentAmount = paymentDetails.RESPONSE_BODY.cashOutstandingAmount ;
		
		}
	if(paymentDetails.RESPONSE_BODY.creditOutstandingAmount != null)
	{
		
		creditPaymentAmount = paymentDetails.RESPONSE_BODY.creditOutstandingAmount ;
		
	}
	}
	//alert(creditPaymentAmount+"creditPaymentAmount"+immediatePaymentAmount+"immediatePaymentAmount")
}

function onOverrideSaveInvoice()
{
	$("#msgtxt").text("");
	saveInvoiceDetails();
}


function onOverrideSave()
{

	/*if(creditChecking){
		
	   $("#outstandingMessage").text("Do you like to override the credit lock and continue to save invoice?");
	}
	else if(cashChecking)
		{
		*/
		 $("#outstandingMessage").text("Do you like to override the credit lock and continue to save invoice?");
	/*	}*/
	
	    $('#confirmDialog').popup({
	    	
	    	position: 'center',
	    	 modal: false,
			closeOnEscape: false ,
	    		});
		$('#confirmDialog').popup();
		$('#confirmDialog').popup('open');
		$("#confirmDialog").modal({
              escapeClose: false,
              clickClose: false,
              showClose: false
			});

}

function onOverrideCancel()
{
	 
		$('#confirmDialog').popup('close');
}


function onCancelOrder()
{
	location.href = "vendor_invoiceinq.html";
	//location.href = "../../../order/btob/snm/orderinq.html";
}


function deleteItem(rowId)
{
	
	//alert("orderItemId..."+orderItemId);
	var orderList = {
			details:[]
		};
	
	var bool = window.confirm("Are you sure you want to delete?");
	
	if (bool == true) {
		
		updateDeleteItemForVendorInvoice(0,rowId);
		var updatedInvoiceItemList= JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	//	console.log("here we go.........."+JSON.stringify(updatedInvoiceItemList));
		 _.each(updatedInvoiceItemList.invoiceItemList,function(item){ 

			/* alert(item.matId+"...."+matId);
			 alert(item.orderItemId+"...."+orderItemId);*/
			 if(item.rowId == rowId)
				{
				 
				 				 
				/*	var dataString=JSON.stringify({
						"id":item.orderId,
					     "isActive":"N",
					     "updatedBy":sessionStorage.getItem("userName")
					});*/
					
				/*console.log("dataString...."+dataString);
					alert("dataString...."+dataString);*/
					
					
			//		var invURL = request_url + "posOrder/deleteOrderItem";
					
				/*	$.ajax({
						type : "POST",
						url : invURL,
						crossDomain : true,
						beforeSend: function(){
				            $("#loading").show();
				                $(".spinner-border").css("display", "block");
				             },
				             complete: function(){
				                     setTimeout(function(){
				             $(".spinner-border").hide();
				                      }, 1000);
				                   }, 
						data : dataString,
						contentType : "application/json",
						dataType : 'json',
						success : onItemDeleteSuccess,
						error : onError
					});*/
				 
				 
				 if(item.isNewItem == 'Y'){
					 updatedInvoiceItemList.invoiceItemList = _.reject (updatedInvoiceItemList.invoiceItemList, function (rejectItem) {
							return (rejectItem.rowId == rowId);
					  });
					 }else{

					     item.isActive = 'N';
				
					 }
				 
				// alert("here we go... for delete..");
				// updatedInvoiceItemList.invoiceItemList = _.reject (updatedInvoiceItemList.invoiceItemList, function (rejectItem) {
				//		return (rejectItem.orderId == orderId);
						/*return (rejectItem.orderItemId == orderItemId);*/
			//	  });
				 
				
				 
				 }
		 });
		 
		 console.log(JSON.stringify(updatedInvoiceItemList)+".....111....invoiceitemslist............");

		 sessionStorage.setItem("INVOICE_ITEMS",JSON.stringify(updatedInvoiceItemList));

	   } 
	
	 productLst = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));

     $("#invoiceContainer").html(_.template(invoiceTemplate, productLst));
   $('#invoiceContainer').trigger("create");
}	

function onItemDeleteSuccess(){
	
	
	   productLst = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));

       $("#invoiceContainer").html(_.template(invoiceTemplate, productLst));
     $('#invoiceContainer').trigger("create");
     
     updateTaxDetailsForVendorInvoice();
     
     productLst = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));

     
     _.each(productLst.invoiceItemList,function(items){
 		
 		//alert(JSON.stringify(items));
    	 $("#cgsttax_"+items.rowId).val(items.tax1);
   		
   		$("#sgsttax_"+items.rowId).val(items.tax2);
   		$("#sgsttax_"+items.rowId).prop('disabled',true);
   		
   		//$("#productBrand-"+items.rowId).val(items.brandId);
   		
   		$("#matbrand-"+items.rowId).val(items.prdBrand);
	  		
	  	$("#materialType-"+items.rowId).val(items.materialType);
			
 		
 	});
	
}

function onError(){
	
	alert("System Error!! Please try again...");
	
}

function openPricePopup(matId){
	 popUptax1 ;
	 popUptax2 ;
	 popUptax3 ;
	
	 orderItemsId = matId ;
	
	/*alert(JSON.stringify(invoiceList));*/
	
	 result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
_.each(result.invoiceItemList,function(item){
	
	if(item.matCountId == orderItemsId){
		popUptax1 = item.tax1;
		popUptax2 = item.tax2;
		popUptax3 = item.tax3;
	}
});





$("#sellingPrice").val("");


$('#displayDiscDialog').modal();
$('#displayDiscDialog').modal('open');

$("#displayDiscDialog").modal({
    escapeClose: false,
    clickClose: false,
    showClose: false
	});
	
	
}

function ChangeSellingPrice(){
	
	var sellingPrice ;
	var isInclTax ;
	var inclusiveTax1Percentage ;
	var inclusiveTax2Percentage ;
	var inclusiveTax3Percentage ;
	
	var inclusiveTax1Amount = 0 ;
	var inclusiveTax2Amount = 0;
	var inclusiveTax3Amount = 0;
	
//	var vald = $('#pricingForm').validate({
//
//		rules : {
//			sellingPrice : {
//				required : true
//			}
//			
//		}
//	});
//	
//	vald.form();
//	
//	if($("#pricingForm").valid()){
		
		var sellingPrice = $("#sellingPrice").val();
		var isInclTax = $("#txt_dis_tax").val();
		
	//	alert("selling price and ........."+sellingPrice+".........."+isInclTax);
	//	alert("TAXLISTTTTTTTTT"+sessionStorage.getItem("TAX_LIST"));
		//console.log("TAXLISTTTTTTTTT"+sessionStorage.getItem("TAX_LIST"));
		
		if(isInclTax == "YES")
			{
			
		var inclusiveTax1Percentage = 0 ;
		var inclusiveTax2Percentage = 0;
		var inclusiveTax3Percentage = 0;
		
			var taxlistAll = JSON.parse(sessionStorage.getItem("TAX_LIST"));
			
			_.each(taxlistAll,function(item){
				//alert("inside tax loop");
				
				if(item.id == popUptax1 ){
					inclusiveTax1Percentage = item.percentage  ;
					//inclusiveTax1Amount =	(parseFloat(sellingPrice)*(parseFloat(inclusiveTax1Percentage)/100));
				}
				
				if(item.id == popUptax2 ){
					inclusiveTax2Percentage = item.percentage  ;
					//inclusiveTax2Amount =	(parseFloat(sellingPrice)*(parseFloat(inclusiveTax1Percentage)/100));
				}
				
				if(item.id == popUptax3 ){
					inclusiveTax3Percentage = item.percentage  ;
					//inclusiveTax3Amount =	(parseFloat(sellingPrice)*(parseFloat(inclusiveTax1Percentage)/100));
				}
				
				
			});
			
			var totalTaxAmount = parseFloat(inclusiveTax1Percentage)+parseFloat(inclusiveTax2Percentage)+parseFloat(inclusiveTax3Percentage);
			
		
			
			
			var newSellingPrice = calculateUtPrice(sellingPrice,totalTaxAmount)
			
			
			
			newSellingPrice = parseFloat(newSellingPrice).toFixed(2);
			
			
	
			
			updateMrpForInvoiceforvendorinvoice(newSellingPrice,orderItemsId);
			
			
			
			result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
			
		//	console.log("json............"+JSON.stringify(result));
			 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
		     $('#invoiceContainer').trigger("create");
		     $.modal.close();
			 $(".blocker").css("background-color","rgba(0,0,0,0)");
	

 	_.each(result.invoiceItemList,function(items){
				
				//alert(JSON.stringify(items));
 		 $("#cgsttax_"+items.matCountId).val(items.tax1);
  		
  		$("#sgsttax_"+items.matCountId).val(items.tax2);
  		$("#sgsttax_"+items.matCountId).prop('disabled',true);
  		
  		//$("#productBrand-"+items.matCountId).val(items.brandId);
  		
  		$("#matbrand-"+items.matCountId).val(items.prdBrand);
	  		
	  	$("#materialType-"+items.matCountId).val(items.materialType);
			
				
			});
		     	} else {
				
				var sellingPrice = $("#sellingPrice").val();
				
				//alert("else condition"+ sellingPrice + orderItemsId);
				updateMrpForInvoiceforvendorinvoice(sellingPrice,orderItemsId);
				
				result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
				
				 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
			     $('#invoiceContainer').trigger("create");
			     $.modal.close();
				 $(".blocker").css("background-color","rgba(0,0,0,0)");
			     
			  	_.each(result.invoiceItemList,function(items){
					
					//alert(JSON.stringify(items));
					
			  		 $("#cgsttax_"+items.matCountId).val(items.tax1);
			  		
			  		$("#sgsttax_"+items.matCountId).val(items.tax2);
			  		$("#sgsttax_"+items.matCountId).prop('disabled',true);
			  		
			  		//$("#productBrand-"+items.matCountId).val(items.brandId);
			  		$("#matbrand-"+items.matCountId).val(items.prdBrand);
	  		
	  			$("#materialType-"+items.matCountId).val(items.materialType);
					
				});
			}
		
		
		
		
	
		
		
		
//	} 
}

function cancelSellingPrice(){
	$.modal.close();
	 $(".blocker").css("background-color","rgba(0,0,0,0)");
}


function updateHsn(hsnCode,rowId,olderMatId,orderId,type,tax,discountArray,type){
	var hsnCode = hsnCode.value;
	var matCode = $("#itemMatCode-"+rowId).val();
	

 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
 	
	_.each(result.invoiceItemList,function(items){
		if(items.rowId == rowId){
			items.hsnCode = hsnCode;
		}
	});
	
//	console.log("result"+JSON.stringify(result));
	
	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
 	
 
 	
 _.each(result.invoiceItemList,function(items){
 		
 		//alert(JSON.stringify(items));
 		
 		$("#cgsttax_"+items.rowId).val(items.tax1);
 		
 		$("#sgsttax_"+items.rowId).val(items.tax2); 		 	
 		$("#sgsttax_"+items.rowId).prop('disabled',true);
 		$("#matbrand-"+items.rowId).val(items.prdBrand);
	  		
	 	$("#materialType-"+items.rowId).val(items.materialType);

	
		if(items.materialPackageId != undefined && items.materialPackageId != null && items.materialPackageId != ""){

		   
		   $("#cgsttax_"+items.rowId).prop('disabled',true);
			
			$("#sgsttax_"+items.rowId).prop('disabled',true);						
		   
		   
		   
	   }
 		
 	
 		
 	});

 }



function updateCustomerMatCode(custMatCodes,matId,orderis){
	
	
	
	var custMatCode = custMatCodes.value ;
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	//conaole.log("kkk............."+JSON,stringify(result));

	_.each(result.invoiceItemList,function(items){
		if(items.matId == matId){
			items.custMatCode = custMatCode;
		}
	});
	
//	console.log("result"+JSON.stringify(result));

	

	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
	// 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
		
}

function taxpercent(tax){
	
	//alert("tax percentage...."+$("#taxPercentage").val())
	var taxpercentage =parseFloat(tax);
	var totalAmount = 100;
	 disc1 = parseFloat(totalAmount - (totalAmount * taxpercentage)/100);
	
	
		disc2 = parseFloat(disc1 + (disc1 * taxpercentage)/100) ;
	
	
	 diff1 = parseFloat(totalAmount - disc2);

	 diff2 = (disc1 * diff1)/disc2
	
	 finresult = totalAmount - (disc1 + diff2);
	
	finresult = finresult.toFixed(2)
		
	taxPer = finresult;
	


}
function calculateUtPrice(amount,tax){
//alert("new fuction....without count..")
	
	taxpercent(tax);
	

		 var newsellingPrize = (parseFloat(amount)) - (parseFloat(amount)*(parseFloat(taxPer)/100) ) 
	//	 alert("new data..with tax....."+newsellingPrize);
		 itemPrice = newsellingPrize;
	     return itemPrice;
	
}

function getTime(id)
{   
	
	
	        $("#"+id).removeClass("ui-state-hover");
			$("#"+id).datetimepicker({
				  format:'d-m-Y H:i:s',
				  step:15,
			}).on('change',function(e){
				$("#"+id).datetimepicker('hide');
			});
			
			$("#"+id).focus();
		
	
}

function updateMaterialdetails(matId,olderMatId)
{


//	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
//    _.each(result.invoiceItemList,function(items){
//    	if(items.orderItemId == orderItemId){
//    		
//    		items.brandId = $("#productBrand-"+orderItemId).val();
//    		items.brandName = $("#productBrand-"+orderItemId+" option:selected").text();
//    		
//    	}
//    	
//    	
//    });
//    sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
	
	var itemLength = $("#itemLength-"+matId).val();
	var itemBreadth = $("#itemBreadth-"+matId).val();
	var itemSize = $("#itemThick-"+matId).val();
	
	
//	alert(itemThick+"...itemThick")

	//updateMaterialLengthandBreadthforVendorInvoice(itemLength,itemBreadth,itemThick,matId);
	
	
	//result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	//conaole.log("kkk............."+JSON,stringify(result));
	_.each(result.invoiceItemList,function(items){
		if(items.matCountId == matId){
			items.matDimLength = itemLength;
			items.matDimBreadth = itemBreadth;
			items.materialSize = itemSize;
		}
	});
	
//	console.log("result"+JSON.stringify(result));
	
	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
	

}

function updateProductBrandDetails(matId){
	
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
    _.each(result.invoiceItemList,function(items){
    	if(items.matCountId == matId){
    		
    		items.brandId = $("#matbrand-"+matId).val();
    		items.brandName = $("#matbrand-"+matId+" option:selected").text();
    		
    	}
    	
    	
    });
    
    sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
    
    
    result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	
	
	
//	console.log("json............"+JSON.stringify(result));
	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
     $('#invoiceContainer').trigger("create");
     $.modal.close();
	 $(".blocker").css("background-color","rgba(0,0,0,0)");
     
     _.each(result.invoiceItemList,function(items){
 		
 		//alert(JSON.stringify(items));
 		
 		$("#cgsttax_"+items.matCountId).val(items.tax1);
 		
 		$("#sgsttax_"+items.matCountId).val(items.tax2);
 		
 		//$("#productBrand-"+items.matCountId).val(items.brandId);
 		$("#matbrand-"+items.matCountId).val(items.prdBrand);
	  		
	  	$("#materialType-"+items.matCountId).val(items.materialType);
 		
 	});
     
}

function isNumber(evt) {
	
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
        return false;
    }
    return true;
}

function addTaxCost(tax,rowId,orderId,taxPosition,unitPrice){
	
	//alert(tax+"tax");
	/*alert(orderid+"orderid");
	alert(matid+"matid");
	alert(taxPosition+"taxPosition");
	alert(unitPrice+"unitPrice");*/
	
	var previousTaxAmt = 0;
	var taxper;		
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	
	var changedTaxIdCgst = $("#cgsttax_"+rowId).val();
	var changedTaxPerCgst = $("#cgsttax_"+rowId).text();
	
	//$("#sgsttax_"+items.rowId).prop('disabled',true);
	
	//var changedTaxIdSgst = $("#sgsttax_"+rowId).val();
	
	
	
	//alert(changedTaxIdCgst+"changedTaxIdCgst");

	_.each(result.invoiceItemList,function(items){
		if(items.rowId == rowId ){
			
		
			items.tax1Percent = 0;
			items.tax2Percent = 0;	
			
			if(taxPosition == 1){								
				/*	alert("tax1 updating");				
					alert(changedTaxIdCgst);*/
					items.tax1 = changedTaxIdCgst ;
					}								 
				var TaxList = JSON.parse(sessionStorage.getItem("TAX_LIST"));				 
				_.each(TaxList, function (citem) {
					if(changedTaxIdCgst !=0){
					if(citem.id == changedTaxIdCgst){														
						taxper = citem.percentage; 																									
						}					 				 
					if (citem.taxType == "SGST" && taxper == citem.percentage){	
						items.tax2 = citem.id;
						items.tax1Percent = taxper;
						items.tax2Percent = taxper;							 				 
						}
					}else{
						items.tax2 = 0;
					}
					});	
			
			
			
			
			
			
		}
		
		
		
		
		
	});
	
	
	
	//alert(previousTaxAmt+"........................previousTaxAmt");
	
	
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
	
	updateTaxDetailsForVendorInvoice();
	
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));

   //console.log("after update the tax........."+JSON.stringify(result));
	
	//console.log("json............"+JSON.stringify(result));
	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
     $('#invoiceContainer').trigger("create");
     
     
	
	
	//console.log("ggggggggggggggggggg"+sessionStorage.getItem("INVOICE_ITEMS"));
	
_.each(result.invoiceItemList,function(items){
		
		//alert(JSON.stringify(items));
		
		$("#cgsttax_"+items.rowId).val(items.tax1);
		
		$("#sgsttax_"+items.rowId).val(items.tax2);
		$("#sgsttax_"+items.rowId).prop('disabled',true);
		
		$("#matbrand-"+items.rowId).val(items.prdBrand);
		
		$("#materialType-"+items.rowId).val(items.materialType);
		
	});
}

function updateDiscountPercentage(discount,matId){
	
	//alert(tax+"tax");
	/*alert(orderid+"orderid");
	alert(matid+"matid");
	alert(taxPosition+"taxPosition");
	alert(unitPrice+"unitPrice");*/
	
	var discValue = 0;
	
	if(discount.value !="" && discount.value !=null){
		discValue = discount.value;
	}
	
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	

	
	//alert(changedTaxIdCgst+"changedTaxIdCgst");

	_.each(result.invoiceItemList,function(items){
		if(items.matCountId == matId ){
			
		items.discount = discValue;

			
		}
	});
	
	
	
	//alert(previousTaxAmt+"........................previousTaxAmt");
	
	
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
	
	updateTaxDetailsForVendorInvoice();
	
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	

sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));

   //console.log("after update the tax........."+JSON.stringify(result));
	
	//console.log("json............"+JSON.stringify(result));
	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
     $('#invoiceContainer').trigger("create");
     
     
	
	
	//console.log("ggggggggggggggggggg"+sessionStorage.getItem("INVOICE_ITEMS"));
	
_.each(result.invoiceItemList,function(items){
		
		//alert(JSON.stringify(items));
		
		$("#cgsttax_"+items.matCountId).val(items.tax1);
		
		$("#sgsttax_"+items.matCountId).val(items.tax2);
		$("#sgsttax_"+items.matCountId).prop('disabled',true);
		
		$("#matbrand-"+items.matCountId).val(items.prdBrand);
		
		$("#materialType-"+items.matCountId).val(items.materialType);
		
	});
}

function addQuantity(qtyObj, matId) {
	$("#msgtxt").html("");
	

    var prdOrdQty = qtyObj.value;
    
	
	updateInvoiceItemQtyforvendorinvoice(matId,prdOrdQty);
    result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	//console.log("json............"+JSON.stringify(result));
	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
     $('#invoiceContainer').trigger("create");
     $.modal.close();
	 $(".blocker").css("background-color","rgba(0,0,0,0)");
     
     _.each(result.invoiceItemList,function(items){
 		
 		//alert(JSON.stringify(items));
 		
    	 $("#cgsttax_"+items.matCountId).val(items.tax1);
 		
 		$("#sgsttax_"+items.matCountId).val(items.tax2);
 		$("#sgsttax_"+items.matCountId).prop('disabled',true);
 		
 		$("#matbrand-"+items.matCountId).val(items.prdBrand);
		
		$("#materialType-"+items.matCountId).val(items.materialType);
 		
 	});
}


function addPerSqmQuantity(qtyObj, matId) {
	$("#msgtxt").html("");
	

    var prdOrdQty = qtyObj.value;
	
	updateInvoiceItemPerSqmQtyforVendorInvoice(matId,prdOrdQty);
result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	//console.log("json............"+JSON.stringify(result));
	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
     $('#invoiceContainer').trigger("create");
     $.modal.close();
	 $(".blocker").css("background-color","rgba(0,0,0,0)");
     
     _.each(result.invoiceItemList,function(items){
 		
 		//alert(JSON.stringify(items));
 		
			$("#cgsttax_"+items.matId).val(items.tax1);
	  		
	  		$("#sgsttax_"+items.matId).val(items.tax2);
	  		$("#sgsttax_"+items.matId).prop('disabled',true);
	  		
	  		$("#matbrand-"+items.matId).val(items.prdBrand);
		
			$("#materialType-"+items.matId).val(items.materialType);
 		
 	});
}

function paymentChange(){
	
	paymntTypeId = $("#paymentListContainer option:selected").val() ;
	paymntTypes = $("#paymentListContainer option:selected").text();
	
	
     $("#saveButtonTr").show();
     $("#saveOverrideButton").hide();
     $("#msgtxt").text("");
    // getPaymentDetails(paymntTypes);
	
}


function addItemOpenPopup()

{   finalproduct=
	{
		finalproductList:[]
    }
	
/*var vald = $('#orderCreateformForm').validate({
	rules : {
		vendorDL : {
			required : true
		}
		
	}
});
vald.form();

if ($('#orderCreateformForm').valid()) {*/
	$("#categoryDL").val("");
	   $("#productDL").val("");
	   $("#maincategoryContainer").val("");
	   $("#productId").val("");
	   $("#length").val("");
	   $("#txtpopPrice").val("");
	   $("#txtpopmrpPrice").val("");
	   $("#popdiscperc").val("");
	   $("#pop_dis_tax").val("");
	   $("#txt_cgst_tax").val("");
	   $("#txtamut").val("");
	   $("#txt_sgst_tax").val("");
	   $("#txtsgstamut").val("");
	   $("#totlPrice").val("");
	   
	   $("#qty").val("1");
	   $("#qtysqm").val("");
	 /*  $("#mainCategoryId").val("");
       $("#mainCategoryDL").val("");
       $("#categoryId").val("");
	   $("#categoryDL").val("");
       $("#productId").val("");
       $("#productDL").val("");*/
       $("#salesorderItemsDialog").modal();
	   $("#salesorderItemsDialog").modal("open");
	   
	   $("#salesorderItemsDialog").modal({
		    escapeClose: false,
		    clickClose: false,
		    showClose: false
			});
	   
//}
}


function addNewMaterialToList(){
	
	updatePopupMaterialdetails();
	var ismatavailble = false;
//	console.log("invoiceList is........"+JSON.stringify(invoiceList));
	invoicelist = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));

	
	updateTaxDetailsForVendorInvoice();
	
	//invoicelist = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	console.log("add items................"+JSON.stringify(invoicelist));
	
	  // updateTaxDetailsForInvoice();
	
	 //result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	   invoicelist = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
		
	console.log("json..quotation lis afteraddd............"+JSON.stringify(invoicelist));
		 $("#invoiceContainer").html(_.template(invoiceTemplate, invoicelist));
	     $('#invoiceContainer').trigger("create");
	     
	    
	
	   
	     _.each(invoicelist.invoiceItemList,function(items){
	  		
	  		//alert(JSON.stringify(items));
	  		
	  		$("#cgsttax_"+items.rowId).val(items.tax1);
	  		
	  		$("#sgsttax_"+items.rowId).val(items.tax2);
	  			$("#sgsttax_"+items.rowId).prop('disabled',true);
	  		
	  		$("#matbrand-"+items.rowId).val(items.prdBrand);
		
			$("#materialType-"+items.rowId).val(items.materialType);
	  		
	  		
	  		
	  	});
	     
	     invoicelist.invoiceItemList = finalInvoiceList.invoiceItemList
	     
	//     invoicelist.invoiceItemList.push(finalInvoiceList.invoiceItemList);
	     
	     console.log(".....sss...."+JSON.stringify(finalInvoiceList.invoiceItemList));
	    
	     $.modal.close();
		 $(".blocker").css("background-color","rgba(0,0,0,0)");
	
}


function onorderaddSuccess(data){

	console.log(JSON.stringify(data));
	
	invoicelist = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
		
	invoicelist.invoiceItemList = _.reject(invoicelist.invoiceItemList,function(item){
		return item.matId ==  data.RESPONSE_BODY.matId
	});
	
	
	var inclusviveTax1Percentage = 0;
	var inclusiveTax2Percentage = 0;
	var inclusiveTax3Percentage =0;
		 
	 
	
	var marginPriceNew=0.0;
	if(data.RESPONSE_BODY.isSpWithTax == "Y"){
		   var taxlistAll = JSON.parse(sessionStorage.getItem("TAX_LIST"));
			_.each(taxlistAll,function(taxItem){
				//alert("inside tax loop");
				if(taxItem.id == data.RESPONSE_BODY.tax1Id ){
					inclusiveTax1Percentage = taxItem.percentage  ;
					//inclusiveTax1Amount =	(parseFloat(data.RESPONSE_BODY.unitPrice)*(parseFloat(inclusiveTax1Percentage)/100));
				}
				
				if(taxItem.id == data.RESPONSE_BODY.tax2Id ){
					inclusiveTax2Percentage = taxItem.percentage  ;
					//inclusiveTax2Amount =	(parseFloat(data.RESPONSE_BODY.unitPrice)*(parseFloat(inclusiveTax2Percentage)/100));
				}
				
				if(taxItem.id == data.RESPONSE_BODY.tax3Id ){
					inclusiveTax3Percentage = taxItem.percentage  ;
					//inclusiveTax3Amount =	(parseFloat(data.RESPONSE_BODY.unitPrice)*(parseFloat(inclusiveTax3Percentage)/100));
				}
			});
			
			var totalTaxAmount = parseFloat(inclusiveTax1Percentage)+parseFloat(inclusiveTax2Percentage)+parseFloat(inclusiveTax3Percentage);
			
			var newSellingPrice = 0;
			
			 if(data.RESPONSE_BODY.unitPrice != null && data.RESPONSE_BODY.unitPrice != "")
			   {
				 newSellingPrice = calculateUtPrice(data.RESPONSE_BODY.unitPrice,totalTaxAmount)
			   }
			
			newSellingPrice = parseFloat(newSellingPrice).toFixed(2);
			marginPriceNew =  newSellingPrice ;
			
	   } else {
		   if(data.RESPONSE_BODY.unitPrice != null && data.RESPONSE_BODY.unitPrice != "")
		   {
		   marginPriceNew =  data.RESPONSE_BODY.unitPrice;
		   }
	   }
	
	 var qtypersqmNew = data.RESPONSE_BODY.matDimLength * data.RESPONSE_BODY.matDimBreadth * data.RESPONSE_BODY.finalOrderQty; 
	 qtypersqmNew = parseFloat(qtypersqmNew).toFixed(2);
	 var perPieceQtySqm = data.RESPONSE_BODY.matDimLength * data.RESPONSE_BODY.matDimBreadth;
	 
	 var discAmtNew = 0;
	 if(data.RESPONSE_BODY.discount != null && data.RESPONSE_BODY.discount != 0 && data.RESPONSE_BODY.discount!="" && data.RESPONSE_BODY.isSpAfterDisc == "N"){
		  discAmtNew = calculateItemLevelDiscounAmt(data.RESPONSE_BODY.unitPrice,qtypersqmNew,data.RESPONSE_BODY.discount);
		}
	 
		var  ordItemData = ({
			"matId" : data.RESPONSE_BODY.matId,
		  "matUnqNum":data.RESPONSE_BODY.matUnqNum,
		  "barcodeNum":data.RESPONSE_BODY.barcodeNum,
		  "orderQty": data.RESPONSE_BODY.orderQty,
		  "finalOrderQty":data.RESPONSE_BODY.finalOrderQty,
		  "unitPrice" : marginPriceNew,
	//	  "totalPriceWithoutAddlDisc":data.RESPONSE_BODY.totalPriceWithoutAddlDisc,
		 "matDimLength":data.RESPONSE_BODY.matDimLength ,
		 "matDimBreadth":data.RESPONSE_BODY.matDimBreadth , 
		  "qtyperSqm":qtypersqmNew,
		  "qtySqmPerPiece":perPieceQtySqm,
		  "totalPrice" :  data.RESPONSE_BODY.totalPrice,
		  "materialCategoryId": data.RESPONSE_BODY.materialCategoryId,
		  "orderId":data.RESPONSE_BODY.orderId,
		  "matName": data.RESPONSE_BODY.materialName,
		  "hsnCode": data.RESPONSE_BODY.hsnCode,
		  "materialCategoryName": data.RESPONSE_BODY.materialCategoryName,
		  "discount": data.RESPONSE_BODY.discount,
		  "discountAmt":discAmtNew,
		  "taxArray":itemOrder.itemTax,
		  "surchargeArray":itemOrder.itemSurcharge,
		  "tax1" : data.RESPONSE_BODY.tax1Id,
		  "tax2" : data.RESPONSE_BODY.tax2Id,
		  "tax3" : data.RESPONSE_BODY.tax3Id,
		  "tax1Name" : data.RESPONSE_BODY.tax1Name,
		  "tax2Name" : data.RESPONSE_BODY.tax2Name,
		  "tax3Name" : data.RESPONSE_BODY.tax3Name,
		  "tax1Percent" :data.RESPONSE_BODY.tax1Percent,
		  "tax2Percent" :data.RESPONSE_BODY.tax2Percent,
		  "tax3Percent" :data.RESPONSE_BODY.tax3Percent,
		  "status":data.RESPONSE_BODY.status,
		  "orderNum":data.RESPONSE_BODY.orderNum,
		  "itemStatus":data.RESPONSE_BODY.itemStatus,
		  "orderItemId":data.RESPONSE_BODY.id,
		  "surcharge1" : data.RESPONSE_BODY.surcharge1Id,
		  "surcharge2" : data.RESPONSE_BODY.surcharge2Id,
		  "surcharge3" : data.RESPONSE_BODY.surcharge3Id,
		  "avblStockQty":data.RESPONSE_BODY.avblStockQty,
		  "matCode":data.RESPONSE_BODY.matCode,
		  "matOptionName":data.RESPONSE_BODY.matOptionName,
		  "optionId":data.RESPONSE_BODY.optionId,
		  "maxRetailPrice":data.RESPONSE_BODY.maxRetailPrice,
		  "purchaseDiscount":data.RESPONSE_BODY.purchaseDiscount,
		  "margin":data.RESPONSE_BODY.margin,
		  "discArray": itemOrder.itemDiscount,
		  "matDimHeight":data.RESPONSE_BODY.matDimHeight,
		  "matDimThick":data.RESPONSE_BODY.matDimThick,
		/*  "maxRetailPrice":data.RESPONSE_BODY.maxRetailPrice,*/
		  "projectId":data.RESPONSE_BODY.projectId,
		   "projectName":data.RESPONSE_BODY.projectName,
		   "processOrderItemId":data.RESPONSE_BODY.processOrderItemId,
		   "brandName":data.RESPONSE_BODY.brandName,
		   "brandId":data.RESPONSE_BODY.brandId,
		   
		});
	
		invoicelist.invoiceItemList.push(ordItemData);
	
console.log("~~~~~~~~~~~~~~///............"+JSON.stringify(invoicelist));	
sessionStorage.setItem("INVOICE_ITEMS",JSON.stringify(invoicelist));
	

	 updateTaxDetailsForInvoice();
	 

	 result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
//	console.log("json..quotation lis afteraddd............"+JSON.stringify(result));
	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
     $('#invoiceContainer').trigger("create");
     
     
     _.each(result.invoiceItemList,function(items){
 		
 		//alert(JSON.stringify(items));
 		
 		$("#cgsttax_"+items.orderItemId+items.orderId).val(items.tax1);
 		
 		$("#sgsttax_"+items.orderItemId+items.orderId).val(items.tax2);
 		$("#sgsttax_"+items.orderItemId+items.orderId).prop('disabled',true);
 		
 		
 		$("#matbrand-"+items.orderItemId).val(items.prdBrand);
		
			$("#materialType-"+items.orderItemId).val(items.materialType);
 		
 	});
	
// console.log("end of save daata is ..........-----"+sessionStorage.getItem("INVOICE_ITEMS"));    
	 $("#salesorderItemsDialog").popup("close");
	 
	
	
}

function onorderaddError() {
	alert("System Error!! Please try again...");
}


function updatematDetails(){
	 result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	 
	 
	 var perqtySqm = $("#length").val() * $("#breadth").val();
	 var qtySqmPerPiece = parseFloat(perqtySqm).toFixed(2);
	  totalQty = $("#qty").val();
  var qtypersqm = $("#qty").val();
  var qtypersqm = parseFloat(qtypersqm).toFixed(2);
 
  //alert("qtysqm............."+qtypersqm);
	 
	 
	 $("#qtysqm").val(qtypersqm);
	 
	
	 
//	 console.log("here..................."+JSON.stringify(result));
	
	 
	 
	 sessionStorage.setItem("INVOICE_ITEMS",JSON.stringify(result));
}


function updatePopupMaterialdetails()
{
	
	
	productId = $("#productId").val();
		
	 finalproduct=
	{
		finalproductList:[]
    }
	 finalproduct1=[];
	 finalproduct2=[];
	 var itemlist=[];
	 var unitprices;
	 var itemprices;
	 var ispresent = false;
	// var maxpriceprices = 0;
	 var discountPercentage =0;
	 
	

	 productList = JSON.parse(sessionStorage.getItem("ITEMS_LIST"));
	 	 
    _.each(productList, function(recpList){
    	if(recpList.id==productId){
    	
    		 
    		  // $("#qty").val("1");
    		 if(recpList.matTaxAblePrice != null && recpList.matTaxAblePrice != "" && recpList.matTaxAblePrice != undefined){
    			 matTaxAblePrice = recpList.matTaxAblePrice;
    			 itemprices = recpList.unitPrice;
    			// maxpriceprices = recpList.maxRetailPrice;
    		 }else{
    			 matTaxAblePrice = "0.00";
    			 itemprices = "0.00";
    			
    		 }
    		 
    		 
    	 if($("#txtpopmrpPrice").val() != ""){
    			
    		 maxpriceprices = $("#txtpopmrpPrice").val();
    		 }else{
    			 maxpriceprices =0;
    			
    		 }
    	 
    	 
    	 if($("#popdiscperc").val() != ""){
 			
    		 discountPercentage = $("#popdiscperc").val();
    		 
    		 }else{
    			 discountPercentage = 0;
    			
    		 }
    	
    		 var invlength = finalInvoiceList.invoiceItemList.length;
    	     
    	     var newrowId = invlength + parseFloat(1);
    	          	      			   
    		   var itemlist = {
    					"matId" : recpList.materialId,
    					"materialCategoryId":recpList.materialCategoryId,
    					"materialCategoryName":recpList.materialCategoryName,
    					"maxRetailPrice" : maxpriceprices,
    					"matTaxAblePrice" : unitprices,
    					"unitPrice" : unitprices,
    					"totalPrice" : recpList.totalPrice,
    					"matName" : recpList.materialName,
    					"discountAmt" : popdiscamt,
    					"discount":discountPercentage,
    					"matCode":recpList.matCode,
    					"hsnCode":recpList.hsnCode,
    					"matOptionName":recpList.optionListName,
    					"orderItemId":recpList.orderItemId,
    					"optionId":recpList.optionListId,
    					"tax1Id":recpList.tax1,
    					"tax1Amt":recpList.tax1Name,
    					"tax2Id":recpList.tax2,
    					"tax2Amt":recpList.tax2Amt,
    					"tax1Name" :recpList.tax1Name,
    					"tax2Name" :recpList.tax2Name,
    					"companyBranchId":sessionStorage.getItem("companyBranch"),
    					"createdBy" : sessionStorage.getItem("userName"),
    					"updatedBy" : sessionStorage.getItem("userName"),
    					"isManageInventory":"N",
    					"barcodeNum":recpList.barcodeNum,
    				//	"itemPrice": itemprices,
    					"matUnqNum":recpList.matUnqNum,
    					"isSpWithTax":recpList.isSpWithTax,
    		    		"brandId" : recpList.brandId,
   			            "brandName" : recpList.brandName,
   			            "materialUOM": recpList.materialUOM,
    			   //     "maxRetailPrice": recpList.maxRetailPrice,
    			        "finalOrderQty":recpList.finalOrderQty,
    	   		        "itemQty":recpList.itemQty,
 					   "materialDescription":recpList.materialDescription,
 					 
 					   "rowId":newrowId

    					

    					
    				}
    		   
    		  
    		   
    		   
    		   
    		   
    		   console.log("items list is ............................................++"+JSON.stringify(itemlist));
    		   finalproduct2.push(itemlist);
    		   console.log("final product 2 is.........."+JSON.stringify(finalproduct2));
    		   
    		 //  alert("here we go...............")
    		   
    		   finalInvoiceList.invoiceItemList.push({
       			"matId" : recpList.materialId,
   				"materialCategoryId":recpList.materialCategoryId,
   				"materialCategoryName":recpList.materialCategoryName,
   				
   				"maxRetailPrice" : maxpriceprices,
   				"matTaxAblePrice" : $("#txtpopPrice").val(),
   				"unitPrice" : $("#txtpopPrice").val(),
   				"totalPrice" : $("#totlPrice").val(),
   				"matName" : recpList.materialName,
   				"discountAmt" : popdiscamt,
   				"discount":discountPercentage,
   				"matCode":recpList.matCode,
   				"hsnCode":recpList.hsnCode,
   				"matOptionName":recpList.optionListName,
   				"optionId":recpList.optionListId,
   				"companyBranchId":sessionStorage.getItem("companyBranch"),
   				"createdBy" : sessionStorage.getItem("userName"),
   				"updatedBy" : sessionStorage.getItem("userName"),
   				"isManageInventory":"N",
   				"itemPrice": itemprices,
   				"barcodeNum":recpList.barcodeNum,
   				"matUnqNum":recpList.matUnqNum,
   				"isSpWithTax":recpList.isSpWithTax,
   				"materialUOM": recpList.materialUOM,
   		  //      "maxRetailPrice": recpList.maxRetailPrice,
   		        "finalOrderQty":$("#qty").val(),
   		        "itemQty":$("#qty").val(),
   		    //    "tax1Percent": "28",
   		        "orderId":0,
   		 	    "itemRemarks" : recpList.itemRemarks,
   		 	    "brandId" : recpList.brandId,
		        "brandName" : recpList.brandName,
   		        "materialDescription":recpList.materialDescription,
   		     "matDimLength":$("#length").val(),
   	      "matDimBreadth": $("#breadth").val(),
   		"tax1":$("#txt_cgst_tax").val(),
		"tax1Amt":$("#txtamut").val(),
		"tax2":$("#txt_sgst_tax").val(),
		"tax2Amt":$("#txtsgstamut").val(),
		"tax1Name" :recpList.tax1Name,
		"tax2Name" :recpList.tax2Name,
		 "rowId":newrowId,
		   "materialSize":recpList.matDimHeight,
			   "materialColor":recpList.materialColor,
			   "matDimLength":recpList.matDimLength,
			   "materialDescription":recpList.materialDescription,
			   "matDimBreadth":recpList.matDimBreadth,
			   "matDimHeight":recpList.matDimHeight,
			   "matDimThick":recpList.matDimThick,
 
   	        	});
    		   
    		 
    		   
    		   
    	}
    	
    //	count++;
    	
    });
//	alert("product added .........."+JSON.stringify(finalInvoiceList));
   console.log("quotation json data.........."+JSON.stringify(finalInvoiceList));
    sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(finalInvoiceList));
    console.log("quotation json data.........."+sessionStorage.getItem("INVOICE_ITEMS"));
    
//	items.brandId = $("#productBrand-"+orderItemId).val();
//	items.brandName = $("#productBrand-"+orderItemId+" option:selected").text();
	  
    
/*    datalist = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	 
	  _.each(datalist.invoiceItemList, function(recpList){
		  
		  alert(recpList.matId+"................"+productId)
	    	if(recpList.matId==productId){
	    		
	    		alert("already exist.");
	    		
	    		datalist.invoiceItemList = _.reject (datalist.invoiceItemList, function (rejectItem) {

					return (rejectItem.matId == productId);

			  });
	    		
	    	}else{	  
	    		
	    		
	    		


}
  		
	});
	  
	  sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(datalist));*/
	   // console.log("quotation json data.........."+sessionStorage.getItem("INVOICE_I
    
/*}*/
    
}


function previousPriceDetails(matId){
	
	//alert(matId+"...............matId")

	selectedMaterial = matId;
	
	checkList={
			checkListCost:[]
	}
	
	 if(popupCount == 0){
		 $("#addContactEditDialog").css("margin-top","-25%");  
	 }else {
		 $("#addContactEditDialog").css("margin-top","5%");  
	 }
	 
	 
	$('#addContactEditDialog').modal();
	$('#addContactEditDialog').modal('open');
	$("#addContactEditDialog").modal({
	    escapeClose: false,
	    clickClose: false,
	    showClose: false
		});

	// $("#addContactEditDialog").popup("open");
	 
	 j=0;
	 i=0;
	  
	//  $("#productListContainer").html("");
		/*$("#productListContainer").html(_.template(productListTemplate, popproductLst));
		$('#productListContainer').trigger("create");*/

		
		/*_.each(popproductLst.RESPONSE_BODY,function(data){
			
			
			$("#itemRemarks_"+data.id).val(data.materialDescription);
			
		
		
		});
		*/
		
		
		 var result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
		 
		 
//		 console.log("...................123..........."+JSON.stringify(popproductLst.RESPONSE_BODY));
		 
//		 console.log("..................."+JSON.stringify(result))
			
		 
		 /* _.each(popproductLst.RESPONSE_BODY, function(item) {
		 
		  
		 _.each(result.invoiceItemList, function(items) {
			
						
			if(items.processOrderItemId == selectedMaterial){
								
							if(item.id == items.matId){
								
								$("#txt_" +item.id).prop('checked', true);
								$("#itemQtyPop_" +item.id).val(items.finalOrderQty);
							//	$("#itemQtyPop_" +recpList.matId).val(items.orderQty);
								$("#itemPrice_" +item.id).val(items.unitPrice);
								$("#itemRemarks_" +item.id).val(items.materialDescription);
								
							}
							
						}
						
						
						
		 });
		
		 });*/
		 
		 
		//alert("............345........."+checkList.checkListCost.length);
		 
			/*if (popproductLst.RESPONSE_BODY.length == checkList.checkListCost.length) {
				$("#cbAll").prop('checked', true);
			} else{
			$("#cbAll").prop('checked', false);
			}*/
		
		if(i > 2){
		 $("#invoice").css("overflow-y", "scroll"); 
		}
		
		if(j > 2){
			 $("#quotation").css("overflow-y", "scroll"); 
			}
		popupCount++;
		
		
	
}

function cancelpopup(){
	
	$('#addContactEditDialog').modal();
	$.modal.close();
	 $(".blocker").css("background-color","rgba(0,0,0,0)");

}


/*function getCheckAll(){
	
	

	//salesReportdata = salesReport.RESPONSE_BODY;
	
	

	
if ($("#cbAll").is(":checked")) {	
	
	_.each(popproductLst.RESPONSE_BODY,function(item){
	
		
		$("#txt_" +item.id).prop('checked', true);
		var duplicateCheck = false;
		
		
		_.find(checkList.checkListCost,function(chItem){
			
			
			if(item.id == chItem.matId)
				{
				duplicateCheck = true;
				}
			});
		
	if(!duplicateCheck)
			{   
	    _.each(popproductLst.RESPONSE_BODY,function(data){
			
	    	var isOutSource = 'N';
   			if(data.matType == "OUTSOURCING"){
   				isOutSource = 'Y';
   			}
   			
	    	  var ItemArr = {
				  "matId" : data.id,
				  "finalOrderQty": $("#itemQtyPop_"+data.id).val(),
				  "unitPrice" :$("#itemPrice_"+data.id).val(),
				  "totalPrice" :"0.00",
				  "materialCategoryId": data.materialCategoryId,
				  "matName": data.materialName,
				  "materialCategoryName": data.materialCategoryName,
				  "materialDescription": $("#itemRemarks_"+data.id).val(),
				  "hsnCode": data.hsnCode,
				  "discount": data.discount,
			//	  "taxArray":itemOrder.itemTax,
			//	  "surchargeArray":itemOrder.itemSurcharge,
				  "tax1Id" : data.tax1,
				  "tax2Id" : data.tax2,
				  "tax3Id" : data.tax3,
				  "tax1Name" : data.tax1Name,
				  "tax2Name" : data.tax2Name,
				  "tax3Name" : data.tax3Name,
				
				//  "aQnty":data.availableQuantity,
				  "matCode":data.matCode,
			//	  "optionListName":optionName,
		//		  "optionListId":optionId,
			//	  "isSpAfterDisc":data.isSpAfterDisc,
			//	  "mediaFolder":data.mediaFolderPath,
			//	  "mediaDomain":data.mediaDomainURI,
			//	  "mediaImage":data.imageurl,
				  "matUnqNum":data.matUnqNum,
				  "barcodeNum":data.barcodeNum,
				  "isSpWithTax":data.isSpWithTax,
				  "matDimLength":data.matDimLength ,
				  "matDimBreadth":data.matDimBreadth ,
				  "matDimHeight":data.matDimHeight,
				  "matDimThick":data.matDimThick, 
				  
				  "materialUOM":data.materialUOM, 
				  
			//	  "qtyperSqm":qtypersqm,
				  "maxRetailPrice":data.maxRetailPrice,
				//  "processOrderItemId":selectedMaterial,
				  "customerName":$("#customerDL").val(),
			        "customerId":$("#customerId").val(),
			        "btobCustomerId":$("#customerId").val(),
			        "itemStatus":"OPEN",
			    	"companyBranchId":sessionStorage.getItem("companyBranch"),
					"createdBy" : sessionStorage.getItem("userName"),
					"updatedBy" : sessionStorage.getItem("userName"),
					"isManageInventory":"N",
					"isPwOutsourced":isOutSource,
					"processOrderItemId":selectedMaterial,
			//	  "rowId":productcount,
				  
			  };
	    	  
					
					checkList.checkListCost.push(ItemArr);
						
			
	    });
	
			}
	$("#txt_" +item.id).prop('checked', true);	
	$("#cbAll").prop('checked', true);
});		
	}else{
		
//	alert("inside else.......")
		
			_.each(checkList.checkListCost,function(ids){
				$("#txt_" +ids.matId).prop('checked', false);	
				
			});
			$("#cbAll").prop('checked', false);
			checkList={
					checkListCost:[]
			}
		}	


//console.log("salesReportdata..check all.."+JSON.stringify(checkList.checkListCost));
}


function getchekedlist(id,itemid){
	
	

	if ($("#txt_"+id).is(":checked")) {
		
   	
   	_.each(popproductLst.RESPONSE_BODY,function(data){
		
   		
   	
   		if(data.id == id)
				{		
   			var isOutSource = 'N';
   			if(data.matType == "OUTSOURCING"){
   				isOutSource = 'Y';
   			}
   						
   		  var ItemArr = {
				  "matId" : data.id,
				  "finalOrderQty": $("#itemQtyPop_"+data.id).val(),
				  "unitPrice" :$("#itemPrice_"+data.id).val(),
				  "totalPrice" :"0.00",
				  "materialCategoryId": data.materialCategoryId,
				  "matName": data.materialName,
				  "materialCategoryName": data.materialCategoryName,
				  "materialDescription": $("#itemRemarks_"+data.id).val(),
				  "hsnCode": data.hsnCode,
				  "discount": data.discount,
				  "tax1Id" : data.tax1,
				  "tax2Id" : data.tax2,
				  "tax3Id" : data.tax3,
				  "tax1Name" : data.tax1Name,
				  "tax2Name" : data.tax2Name,
				  "tax3Name" : data.tax3Name,
				  "matCode":data.matCode,
		          "matUnqNum":data.matUnqNum,
				  "barcodeNum":data.barcodeNum,
				  "isSpWithTax":data.isSpWithTax,
				  "matDimLength":data.matDimLength ,
				  "matDimBreadth":data.matDimBreadth ,
				  "matDimHeight":data.matDimHeight,
				  "matDimThick":data.matDimThick, 
		    	  "maxRetailPrice":data.maxRetailPrice,
		    	  "materialUOM":data.materialUOM, 
				  "customerName":$("#customerDL").val(),
			        "customerId":$("#customerId").val(),
			        "btobCustomerId":$("#customerId").val(),
			        "itemStatus":"OPEN",
			    	"companyBranchId":sessionStorage.getItem("companyBranch"),
					"createdBy" : sessionStorage.getItem("userName"),
					"updatedBy" : sessionStorage.getItem("userName"),
					"isManageInventory":"N",
					"isPwOutsourced":isOutSource,
					"processOrderItemId":selectedMaterial,
					"orderId": sessionStorage.getItem("orderId"),
				//	"orderItemId":data.id,
			
				  
			  };
   		  
   		checkList.checkListCost.push(ItemArr);
   		  
				}
				});
				
		
		
		if (popproductLst.RESPONSE_BODY.length == checkList.checkListCost.length) {
			$("#cbAll").prop('checked', true);
		} else{
		$("#cbAll").prop('checked', false);
		}
		}else{
			removeMaterial(checkList.checkListCost,id);
			$("#itemQtyPop_"+id).val("")
			if (popproductLst.RESPONSE_BODY.length == checkList.checkListCost.length) {
				$("#cbAll").prop('checked', true);
			} else{
			$("#cbAll").prop('checked', false);
			}
			
		}
	
//	console.log("1....check single items..........."+JSON.stringify(checkList.checkListCost));
  
}

function removeMaterial(arr, itemId){


	for ( var i = 0; i < arr.length; i++) {
		if (arr[i].matId == itemId) {
			arr.splice(i, 1);
			return arr;
		}
	}
	
}*/

function saveOrder()
{

	
	var tax1Id;
	var tax2Id;
	var tax3Id;
	var surcharge1Id;
	var surcharge2Id;
	var surcharge3Id;
	var tax1Amt;
	var tax2Amt;
	var tax3Amt;
	var surcharge1Amt;
	var surcharge2Amt;
	var surcharge3Amt;
	var tax1TotAmt;
	var tax2TotAmt;
	var tax3TotAmt;
	var surcharge1TotAmt;
	var surcharge2TotAmt;
	var surcharge3TotAmt;
	$("#msgtxt").html("");
	var vald = $('#orderCreateformForm1').validate({
		rules : {
			itemQty : {
				required : true
			}
		}
	});
	vald.form();
	if($('#orderCreateformForm1').valid())
	{
		var future = new Date();
		var dd = future.getDate();
		var mm = future.getMonth()+1; //January is 0!
		var yyyy = future.getFullYear();
		var min=future.getMinutes();
		var hh=future.getHours();
		if(dd<10){
			dd="0"+dd;
		}
		if(mm<10){
			mm="0"+mm;
		}
		var todaydate=dd+"-"+mm+"-"+yyyy+" "+hh+":"+min;
		

	//	var invURL = request_url + "posOrder/addProcessWorkOrder";
		 var resultList = invoiceList.RESPONSE_BODY;
		 
		 
//		 console.log("here....update order......."+JSON.stringify(resultList));

	
	var qntyChecking= false;
	_.each(resultList.orderItemList, function(oitem) {
		if(oitem.finalOrderQty == "0")
			{
			qntyChecking = true;
			}
	});
	if(!qntyChecking){
		var invOrderItemList = [];

		_.each(resultList.orderItemList, function(oitem) {
	
			 tax1Amt = 0;
			 tax2Amt = 0;
			 tax3Amt = 0;
			 tax1Id ="";
			 tax2Id ="";
			 tax3Id ="";
			 tax1Name="";
			 tax2Name="";
			 tax3Name="";
			 
			
			 _.find(oitem.taxArray,function(tItems){
					
					if(tItems.taxType == "CGST"  ){
						
						if(oitem.tax1 == tItems.taxId)
							{
							tax1Amt = tItems.taxAmount;
							tax1Id  = tItems.taxId;
							tax1Name = tItems.taxType;
							} else
								
								if(oitem.tax2 == tItems.taxId)
							{
								tax1Amt = tItems.taxAmount;
								tax1Id  = tItems.taxId;
								tax1Name = tItems.taxType;
								} else
									
									if(oitem.tax3 == tItems.taxId)
								{
									tax1Amt = tItems.taxAmount;
									tax1Id  = tItems.taxId;
									tax1Name = tItems.taxType;
									}
						
					}
					
					
					if(tItems.taxType == "SGST" ){

						if(oitem.tax1 == tItems.taxId)
							{
							tax2Amt = tItems.taxAmount;
							tax2Id  = tItems.taxId;
							tax2Name = tItems.taxType;
							}
						   else if(oitem.tax2 == tItems.taxId)
							{
								tax2Amt = tItems.taxAmount;
								tax2Id  = tItems.taxId;
								tax2Name = tItems.taxType;
								} 
						   else if(oitem.tax3 == tItems.taxId)
								{
									tax2Amt = tItems.taxAmount;
									tax2Id  = tItems.taxId;
									tax2Name = tItems.taxType;
									}
					}
					
				});
			 
			
			_.find(oitem.surchargeArray,function(tItems){
				if(oitem.surcharge1 != null){
				if(oitem.surcharge1 == tItems.taxId)
					{
					surcharge1Amt = tItems.taxAmount;
					surcharge1Id  = tItems.taxId;
					}
				}
				if(oitem.surcharge2 != null){
				if(oitem.surcharge2 == tItems.taxId)
					{
					surcharge2Amt = tItems.taxAmount;
					surcharge2Id  = tItems.taxId;
					}
				}
				if(oitem.surcharge3 != null){
				if(oitem.surcharge3 == tItems.taxId)
				{
					surcharge3Amt = tItems.taxAmount;
					surcharge3Id  = tItems.taxId;
				}
				}
			});

	
		
		
				var itemsArr = {
					"matId" : oitem.matId,
					"materialCategoryId":oitem.catId,
					"catName":oitem.materialCategoryName,
					"finalOrderQty" : oitem.finalOrderQty,
					"unitPrice" : oitem.unitPrice,
					"totalPrice" : oitem.totalPrice,
					"matName" : oitem.materialName,
					"discountAmt" : oitem.discAmt,
					"discount":oitem.discount,
					"matCode":oitem.matCode,
					"invoiceNum":oitem.vendorInvoiceNum,
					"hsnCode":oitem.hsnCode,
					"invoiceDt":oitem.invoiceDt,
					//"materialName":oitem.matName,
					"invoiceType":"INVOICED",
					"matOptionName":oitem.optionListName,
					"optionId":oitem.optionListId,
					"tax1Id":tax1Id,
					"tax1Amt":tax1Amt,
					"tax2Id":tax2Id,
					"tax2Amt":tax2Amt,
					//"tax3Id":tax3Id,
					//"tax3Amt":tax3Amt,
					"tax1Name" :tax1Name,
					"tax2Name" :tax2Name,
					//"tax3Name" : oitem.tax3Name,
					"surcharge1Id":surcharge1Id,
					"surcharge1Amt":surcharge1Amt,
					"surcharge2Id":surcharge2Id,
					"surcharge2Amt":surcharge2Amt,
					"surcharge3Id":surcharge3Id,
					"surcharge3Amt":surcharge3Amt,	
					"companyBranchId":sessionStorage.getItem("companyBranch"),
					"createdBy" : sessionStorage.getItem("userName"),
					"updatedBy" : sessionStorage.getItem("userName"),
					"isManageInventory":"N",
					"barcodeNum":oitem.barcodeNum,
					"matUnqNum":oitem.matUnqNum,
					"isSpWithTax":oitem.isSpWithTax,
					"customerName":$("#customerDL").val(),
			        "customerId":$("#customerId").val(),
			        "btobCustomerId":$("#customerId").val(),
			       // "warehouseId":$("#shipcompanyRegionId").val(),
			        "matDimLength":oitem.matDimLength,
					"matDimBreadth":oitem.matDimBreadth,
					"matDimHeight":oitem.matDimHeight,
					"matDimThick":oitem.matDimThick, 
					"orderQtySqm":oitem.qtyperSqm,
					"unitSqm":oitem.unitPrice,
					"materialUOM": oitem.materialUOM,
			        "maxRetailPrice": oitem.materialMRP,
					"itemStatus":"OPEN",
					//"productImgFileName":oitem.itemImgFileName,
					"processWorkItemList":oitem.processWorkItemList
					
				};
				invOrderItemList.push(itemsArr);
			
		});


 //console.log("check me......"+JSON.stringify(invOrderItemList));
var j = 0;

_.each(resultList.orderTaxList,function(taxsItem){
	if(j == 0)
		{
		tax1Id = taxsItem.taxId;
		tax1TotAmt = taxsItem.totalamount;
		}
	else if(j == 1)
		{
		tax2Id = taxsItem.taxId;
		tax2TotAmt = taxsItem.totalamount;
		}
	else if(j == 2)
	{
	tax3Id = taxsItem.taxId;
	tax3TotAmt = taxsItem.totalamount;
	}
	j++;
});
var k = 0;
_.each(resultList.orderSurchargeList,function(taxsItem){
	if(k == 0)
		{
		surcharge1Id = taxsItem.taxId;
		surcharge1TotAmt = taxsItem.totalamount;
		}
	else if(k == 1)
		{
		surcharge2Id = taxsItem.taxId;
		surcharge2TotAmt = taxsItem.totalamount;
		}
	else if(k == 2)
	{
	surcharge3Id = taxsItem.taxId;
	surcharge3TotAmt = taxsItem.totalamount;
	}
	k++;
});

		var dataString = "";
		
		 dataString  = JSON.stringify({
				/*"companyBranchId" : sessionStorage.getItem("companyBranch"),*/
			    "customerName":$("#customerDL").val(),
		        "customerId":$("#customerId").val(),
		        "btobCustomerId":$("#customerId").val(),
		        "billingAddressId":addressId,
		        "shippingAddressId":deliveryaddressId,
		        "orderTotalAmount":resultList.grandTotl,
		        "orderSubTotalAmount":resultList.subTotl,	
				"tax1Id":tax1Id,
				"tax1Amt":tax1TotAmt,
				"tax2Id":tax2Id,
				"tax2Amt":tax2TotAmt,
				"tax3Id":tax3Id,
				"tax3Amt":tax3TotAmt,	
				"surcharge1Id":surcharge1Id,
				"surcharge1Amt":surcharge1TotAmt,
				"surcharge2Id":surcharge2Id,
				"surcharge2Amt":surcharge2TotAmt,
				"surcharge3Id":surcharge3Id,
				"surcharge3Amt":surcharge3TotAmt,
				"orderDt":todaydate,
				"createdBy" : sessionStorage.getItem("userName"),
				"updatedBy" :  sessionStorage.getItem("userName"),
				"companyBranchId":sessionStorage.getItem("companyBranch"),
				
				"orderStatus":"OPEN",
				"invoiceStatus":"INVOICED",
				"isStatusLog" : 'Y',
				"posOrderItems" : invOrderItemList,
				"orderType":"REGULAR"
			 });
	//alert(dataString);
		//console.log("final........."+dataString);
		
$.ajax({
			type : "POST",
			url : invURL,
			crossDomain : true,
			beforeSend: function(){
	            $("#loading").show();
	                $(".spinner-border").css("display", "block");
	             },
	             complete: function(){
	                     setTimeout(function(){
	             $(".spinner-border").hide();
	                      }, 1000);
	                   }, 
			data : dataString,
			contentType : "application/json",
			dataType : 'json',
			success : onInvSuccess,
			error : onInvError
		});
	}
	else
		{
		$("#msgtxt").html("please enter the order quantity");
		}

	}
	
}
/*function onInvSuccess(data) {
	alert("Order successfully created.");
	
}*/

function onInvError() {
	alert("System Error!! Please try again...");
}

function addpopup(){
	
	var datalist = {
			dataItemList:[]
	}
	
	var itemArray=[]
	var invOrderItemList = [];
	
	//alert(selectedMaterial+".....selectedMaterial");
	
	 var resultList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	 
 console.log("check............."+JSON.stringify(checkList.checkListCost));
	 
	 console.log("result............"+JSON.stringify(resultList));
/*	_.each(resultList.invoiceItemList,function(items){
		if(items.matId == selectedMaterial){
			items.processWorkItemList = checkList.checkListCost;
		}
	});*/
	
//	 resultList.invoiceItemList.push(checkList.checkListCost);
	 
	 var surl =  request_url + "posOrder/update";
	 
	
					
	 
	 _.each(checkList.checkListCost,function(item){		 

		 
			itemArray ={
					"createdBy":sessionStorage.getItem("userName"),
					"updatedBy":sessionStorage.getItem("userName"),
					"companyBranchId":sessionStorage.getItem("companyBranch"),
					"orderId" :sessionStorage.getItem("orderId"),
			  "matId" : item.matId,
			  "matUnqNum":item.matUnqNum,
			  "barcodeNum":item.barcodeNum,
			  "orderQty": item.finalOrderQty,
			  "finalOrderQty":item.finalOrderQty,
			  "unitPrice" : item.unitPrice,
			  "materialUOM":item.materialUOM,
			  "materialDescription":item.materialDescription,
		//	  "totalPriceWithoutAddlDisc":item.totalPriceWithoutAddlDisc,
			 "matDimLength":item.matDimLength ,
			 "matDimBreadth":item.matDimBreadth , 
			  "qtyperSqm":item.qtypersqm,
			 // "qtySqmPerPiece":item.qtySqmPerPiece,
			  "totalPrice" :  item.totalPrice,
			  "materialCategoryId": item.materialCategoryId,
			  "orderId":sessionStorage.getItem("orderId"),
			  "matName": item.materialName,
			  "hsnCode": item.hsnCode,
			  "materialCategoryName": item.materialCategoryName,
			  "discount": item.discount,
			  "discountAmt":item.discountAmt,
			//  "taxArray":itemOrder.itemTax,
			 // "surchargeArray":itemOrder.itemSurcharge,
			 /* "tax1" : item.tax1Id,
			  "tax2" : item.tax2Id,
			  "tax3" : item.tax3Id,
			  "tax1Name" : item.tax1Name,
			  "tax2Name" : item.tax2Name,
			  "tax3Name" : item.tax3Name,
			  "tax1Percent" :item.tax1Percent,
			  "tax2Percent" :item.tax2Percent,
			  "tax3Percent" :item.tax3Percent,*/
			  "status":item.status,
			  "orderNum":item.orderNum,
			  "itemStatus":item.itemStatus,
			  "orderItemId":item.id,
		/*	  "surcharge1" : item.surcharge1Id,
			  "surcharge2" : item.surcharge2Id,
			  "surcharge3" : item.surcharge3Id,*/
			  "avblStockQty":item.avblStockQty,
			  "matCode":item.matCode,
			  "matOptionName":item.matOptionName,
			  "optionId":item.optionId,
			  "maxRetailPrice":item.materialMRP,
			  "purchaseDiscount":item.purchaseDiscount,
			  "margin":item.margin,
			 // "discArray": itemOrder.itemDiscount,
			  "matDimHeight":item.matDimHeight,
			  "matDimThick":item.matDimThick,
			//  "maxRetailPrice":item.maxRetailPrice,
			  "projectId":item.projectId,
			   "projectName":item.projectName,
			   "processOrderItemId":item.processOrderItemId,
			   "isActive" : "Y",
		  };
		 
			invOrderItemList.push(itemArray);
			
		 });
	 
	 
		var dataString = "";
		
		 dataString  = JSON.stringify({
			 	"id":sessionStorage.getItem("orderId"),
		       /* "orderTotalAmount":resultList.grandTotl,
		        "orderSubTotalAmount":resultList.subTotl,	
				"tax1Id":tax1Id,
				"tax1Amt":tax1TotAmt,
				"tax2Id":tax2Id,
				"tax2Amt":tax2TotAmt,
				"tax3Id":tax3Id,
				"tax3Amt":tax3TotAmt,	*/
				"createdBy" : sessionStorage.getItem("userName"),
				"updatedBy" :  sessionStorage.getItem("userName"),
				"companyBranchId":sessionStorage.getItem("companyBranch"),
				"posOrderItems" : invOrderItemList,
				/*"paymentStatus" : paymentStatusData,
				"orderStatus" : orderStatusData,*/
			 });
	 
//	 console.log("JSON.stringify(datalist.dataItemList)..............."+dataString);
	 
	 $.ajax({
			type : "POST",
			url : surl,
			crossDomain : true,
			beforeSend: function(){
	            $("#loading").show();
	                $(".spinner-border").css("display", "block");
	             },
	             complete: function(){
	                     setTimeout(function(){
	             $(".spinner-border").hide();
	                      }, 1000);
	                   }, 
			data : dataString,
			contentType : "application/json",
			dataType : 'json',
			success : onprocessWorkaddSuccess,
			error : onprocessWorkaddError
		});
	 
	
		 
		 
}



function addPopQuantity(qty,itemId){
	
	var quantity = qty.value;
	
//	console.log("items..1............"+JSON.stringify(checkList.checkListCost));
	
	_.each(checkList.checkListCost,function(list){
		if(list.matId == itemId){
		//	alert("inside........")
			list.finalOrderQty = quantity;
		}
		
	});
	
	
		 
}

function addPopPrice(price,itemId){
	
	var pricevalue = price.value;
	
//	console.log("items..2............"+JSON.stringify(checkList.checkListCost));
	
	_.each(checkList.checkListCost,function(list){
		if(list.matId == itemId){
		//	alert("inside........")
			list.unitPrice = pricevalue;
		}
		
	});
	
	
		 
}

function addPopRemarks(remarks,itemId){
	
	var remarksvalue = remarks.value;
	
//	console.log("items...3..........."+JSON.stringify(checkList.checkListCost));
	
	_.each(checkList.checkListCost,function(list){
		if(list.matId == itemId){
		//	alert("inside........")
			list.materialDescription = remarksvalue;
		}
		
	});
	
	
		 
}

function updateTotalPrice(totalprice,itemid,orderId){
	
	var subTl = 0;
	 var taxTl = 0;
	 var surTl = 0;
	 var grnTl = 0;
	
	  var totprice = totalprice.value;
	
//	alert(itemid+"...itemid"+"..............totprice"+totprice)
	
	 
	 
	  updateMatUnitPriceForReverseOrderforVendorInvoice(itemid,orderId,totprice);
	
//	console.log(".......hello........."+JSON.stringify(resultList));
	 
//	 _.each(resultList.invoiceItemList, function(items) {
//			
//								
//							if(itemid == items.orderItemId){
//								
//							//	alert("if...............")
//								
//								items.totalPrice = totprice;
//								
//								
//								
//							}
//							
//							
//					
//							
//					
//	 });
	 
//	 console.log(".......resultList.invoiceItemList........."+JSON.stringify(resultList.invoiceItemList));
	 
	 
//	 _.each(resultList.invoiceItemList, function(its) {
//		 
//		 
//		// alert(its.totalPrice+"............its.totalPrice")
//		 
//		 subTl = parseFloat(subTl) + parseFloat(its.totalPrice);
//		 
//		
//		 
//	 });
//	 
//	// alert(subTl+"...............subTl")
//	 
//	 _.each(resultList.invoiceTaxList,function(tItem){
//			
//		 taxTl = parseFloat(taxTl) + parseFloat(tItem.totalamount);
//		
//	 });
//	 _.each(resultList.invoiceSurchargeList,function(sItem){
//		
//		 surTl = parseFloat(surTl) + parseFloat(sItem.totalamount);
//		 
//	 });
//	grnTl = subTl + taxTl + surTl; 
//
//	grnTl = grnTl.toFixed(2);
//
//
//	 subTl = subTl.toFixed(2);
//	 resultList.invoiceGrandTotl = grnTl;
//	 resultList.invoiceSubTotl = subTl;
//	// resultList.discountList=finalDiscount.discountList;
//	 
//	
//	 
////	 console.log(".......hello..22......."+JSON.stringify(resultList));
//	 
//	
//	 
//	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(resultList));
	 
//	 console.log("................"+JSON.parse(sessionStorage.getItem("INVOICE_ITEMS")));
	 
	 var resultList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	 
	 
	 console.log("..Ranjan.............."+sessionStorage.getItem("INVOICE_ITEMS"));
	 
	 $("#invoiceContainer").html(_.template(invoiceTemplate, resultList));
//		$("#invoiceContainer").listview('refresh');
		$('#invoiceContainer').trigger("create");
		
		_.each(resultList.invoiceItemList,function(items){
			
			//alert(JSON.stringify(items));
			
			$("#cgsttax_"+items.rowId).val(items.tax1);
			
			$("#sgsttax_"+items.rowId).val(items.tax2);
			
			//$("#productBrand-"+items.rowId).val(items.brandId);
			$("#matbrand-"+items.rowId).val(items.prdBrand);
	  		
	  	$("#materialType-"+items.rowId).val(items.materialType);
		});
	 
}









function updateDiscountPer(dis,orderItemId){
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	
	_.each(result.invoiceItemList,function(items){
		if(items.orderItemId == orderItemId){
			items.discount = dis.value;
		}
		
	});
	
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
	
	updateTaxDetailsForInvoice();
	
	 result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
     
	   	var discountAmt = result.inoviceDiscountAmt;
		var grandTotal =  result.invoiceGrandTotl ;
		var couponAmt = result.couponDiscountAmt;
		
//	alert(isPercentage+"....isPercentage");
	
		
		 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
		 	
	  
	 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	 	

	        $("#invoiceContainer").html(_.template(invoiceTemplate, result));
	//$("#invoiceContainer").listview('refresh');
	      $('#invoiceContainer').trigger("create");
	      
	      $("#txtinvoicetotal").val(Math.round(result.invoiceGrandTotl).toFixed(2));
	      
	     // $("#txtinvoicetotal").val(parseFloat(result.invoiceGrandTotl).toFixed(2));
	 	_.each(result.invoiceItemList,function(items){
			
//	  			alert(JSON.stringify(items));
	  			
	  			$("#cgsttax_"+items.orderItemId+items.orderId).val(items.tax1);
	  			
	  			$("#sgsttax_"+items.orderItemId+items.orderId).val(items.tax2);
	  			
	  			//$("#productBrand-"+items.orderItemId).val(items.brandId);
	  			
	  			$("#matbrand-"+items.orderItemId).val(items.prdBrand);
	  		
	  	$("#materialType-"+items.orderItemId).val(items.materialType);
	  			
	  		});
}











function calculateExtraChatgesCharges(){
	var invItems = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	var lesAmountChargesValue = 0;
	var deliveryChargesValue = 0;
	var packagingCargesValue = 0;
	
	var les = $("#lessAmt").val().trim();
	var del = $("#otherCharges").val().trim();
	var pak = $("#packageCharges").val().trim();
	
	if(les != null && les != ""){
		lesAmountChargesValue = parseFloat(les);
	}else{
		lesAmountChargesValue = 0;
	}
	
	
	if(del != null && del != ""){
		deliveryChargesValue = parseFloat(del);
	}else{
		deliveryChargesValue = 0;
	}
	

	if(pak != null && pak != ""){
		packagingCargesValue = parseFloat(pak);
	}else{
		packagingCargesValue = 0;
	}
	
	previousPackingDeliveryAmount = invItems.packingDeliveryAmount;
	
	
	invItems.lessAmount = lesAmountChargesValue;
	invItems.packingDeliveryAmount = deliveryChargesValue;
	invItems.miscAmount = packagingCargesValue;
	
	sessionStorage.setItem("INVOICE_ITEMS",JSON.stringify(invItems));
	
	calculateExtraCharges();
	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	$("#invoiceContainer").html(_.template(invoiceTemplate, result));
//	$("#invoiceContainer").listview('refresh');
	$('#invoiceContainer').trigger("create");
	
	
	
	_.each(result.invoiceItemList,function(items){
		
		$("#cgsttax_"+items.orderItemId+items.orderId).val(items.tax1);
 		
 		$("#sgsttax_"+items.orderItemId+items.orderId).val(items.tax2);
 		
 		//$("#productBrand-"+items.orderItemId).val(items.brandId);
 		$("#matbrand-"+items.orderItemId).val(items.prdBrand);
	  		
	  	$("#materialType-"+items.orderItemId).val(items.materialType);
 	});
}

function modalContactPopupClose(){
//	$('#displayteamcustdetails').popup();
	$.modal.close();
	 $(".blocker").css("background-color","rgba(0,0,0,0)");
	
}




function ChangeunitPrice(type){
	
	
	

		var popsellingPrice = $("#txtpopPrice").val();
		var popdiscperc = $("#popdiscperc").val();
		var poptotlprice  = $("#totlPrice").val();
		var poptxtqty = $("#qty").val();
		var popmaxpricePrice = $("#txtpopmrpPrice").val();
		
		var popCGSTTax = $("#txt_cgst_tax option:selected").text();
		
		
		var popSGSTTax = $("#txt_sgst_tax option:selected").text();
		
		var finalqtyprc;
		 var popdiscamt;
		var popnewunitprice;
		var popnewmaxprice;
		var popdiscamtmrp = 0;
		var unitPriceDisplay = 0;
		
		if(type == "MRP"){
					
			 finalqtyprc=  parseFloat(poptxtqty).toFixed(2) *parseFloat(popmaxpricePrice).toFixed(2);
			 				
			 popdiscamtmrp= finalqtyprc*(popdiscperc/100);
			 popdiscamtmrp= parseFloat(popdiscamtmrp).toFixed(2);

			 popnewmaxprice= finalqtyprc-popdiscamtmrp;
			 
			 unitPriceDisplay = popnewmaxprice - popdiscamtmrp;
			 
			 $("#txtpopPrice").val(parseFloat(unitPriceDisplay).toFixed(2));
			       
	         if(popCGSTTax != null && popCGSTTax != "" && popCGSTTax > 0){
	 			var	popfinalcgstamtmrp = parseFloat(popmaxpricePrice).toFixed(2) * (popCGSTTax/100);
	     		var	popfinalsgstamtmrp = parseFloat(popmaxpricePrice).toFixed(2) * (popSGSTTax/100);
	     		
	     		 $("#txtamut").val(parseFloat(popfinalcgstamtmrp).toFixed(2));
	     		 $("#txtsgstamut").val(parseFloat(popfinalsgstamtmrp).toFixed(2));	     		  
	         }
			
	         
	         var finalpopamountmrp = parseFloat(popnewmaxprice).toFixed(2) +parseFloat(popfinalcgstamtmrp).toFixed(2) +parseFloat(popfinalsgstamtmrp).toFixed(2);
			  $("#totlPrice").val(parseFloat(finalpopamountmrp).toFixed(2));
	         
			
		}else{
			
			
			 finalqtyprc=  parseFloat(poptxtqty).toFixed(2) *parseFloat(popsellingPrice).toFixed(2);
			
			 popdiscamt= finalqtyprc*(popdiscperc/100);
			 popdiscamt= parseFloat(popdiscamt).toFixed(2);

	         popnewunitprice= finalqtyprc-popdiscamt;
	         
	         
	         
	         if(popCGSTTax != null && popCGSTTax != "" && popCGSTTax > 0){
	 			
	 			
	 			
	 			
	     		var	popfinalcgstamt = parseFloat(popsellingPrice).toFixed(2) * (popCGSTTax/100);
	     		
	     		var	popfinalsgstamt = parseFloat(popsellingPrice).toFixed(2) * (popSGSTTax/100);
	     		
	     		
	     		
	     		 $("#txtamut").val(parseFloat(popfinalcgstamt).toFixed(2));
	     			
	     			
	     		  $("#txtsgstamut").val(parseFloat(popfinalsgstamt).toFixed(2));
	        
			
		}
		
	         var finalpopamount = parseFloat(popnewunitprice).toFixed(2) +parseFloat(popfinalcgstamt).toFixed(2) +parseFloat(popfinalsgstamt).toFixed(2);
			  
			  
	 		
			  $("#totlPrice").val(parseFloat(finalpopamount).toFixed(2));
			
		}
		
		 
		  
		
		  
		  
		
		

}


function discountChange(){
	

	var popsellingPrice = $("#txtpopPrice").val();
	var popdiscperc = $("#popdiscperc").val();
	var poptotlprice  = $("#totlPrice").val();
	var poptxtqty = $("#qty").val();
	var popmaxpricePrice = $("#txtpopmrpPrice").val();
	
	var popCGSTTax = $("#txt_cgst_tax option:selected").text();
	
	
	var popSGSTTax = $("#txt_sgst_tax option:selected").text();
	
	var finalqtyprc;
	 popdiscamt;
	var popnewunitprice;
	
	var popdiscamtmrp = 0;
	
	var unitPriceDisplay = 0;
	
	if(popmaxpricePrice != 0 && popmaxpricePrice != ""){
		
		 finalqtyprc=  parseFloat(poptxtqty).toFixed(2) *parseFloat(popmaxpricePrice).toFixed(2);
			
		 popdiscamtmrp= finalqtyprc*(popdiscperc/100);
		 popdiscamtmrp= parseFloat(popdiscamtmrp).toFixed(2);

		 popnewmaxprice= finalqtyprc-popdiscamtmrp;
		  
		 unitPriceDisplay = popnewmaxprice - popdiscamtmrp;
		 
		 $("#txtpopPrice").val(parseFloat(unitPriceDisplay).toFixed(2));
		       
        if(popCGSTTax != null && popCGSTTax != "" && popCGSTTax > 0){
			
			
			
			
    		var	popfinalcgstamtmrp = parseFloat(popmaxpricePrice).toFixed(2) * (popCGSTTax/100);
    		
    		var	popfinalsgstamtmrp = parseFloat(popmaxpricePrice).toFixed(2) * (popSGSTTax/100);
    		
    		
    		
    		 $("#txtamut").val(parseFloat(popfinalcgstamtmrp).toFixed(2));
    			
    			
    		  $("#txtsgstamut").val(parseFloat(popfinalsgstamtmrp).toFixed(2));
    		  
        }
		
        
        
        
        var finalpopamountmrp = parseFloat(popnewmaxprice).toFixed(2) +parseFloat(popfinalcgstamtmrp).toFixed(2) +parseFloat(popfinalsgstamtmrp).toFixed(2);
		  
		  
		
		  $("#totlPrice").val(parseFloat(finalpopamountmrp).toFixed(2));
        
		
	}else{
		
		finalqtyprc=  parseFloat(poptxtqty).toFixed(2) *parseFloat(popsellingPrice).toFixed(2);
		
		 popdiscamt= finalqtyprc*(popdiscperc/100);
		 popdiscamt= parseFloat(popdiscamt).toFixed(2);

         popnewunitprice= finalqtyprc-popdiscamt;
         
         
         
         if(popCGSTTax != null && popCGSTTax != "" && popCGSTTax > 0){
 			
 			
 			
 			
     		var	popfinalcgstamt = parseFloat(popsellingPrice).toFixed(2) * (popCGSTTax/100);
     		
     		var	popfinalsgstamt = parseFloat(popsellingPrice).toFixed(2) * (popSGSTTax/100);
     		
     		
     		
     		 $("#txtamut").val(parseFloat(popfinalcgstamt).toFixed(2));
     			
     			
     		  $("#txtsgstamut").val(parseFloat(popfinalsgstamt).toFixed(2));
		
	}
	
	
	 
	  
	  var finalpopamount = parseFloat(popnewunitprice).toFixed(2) +parseFloat(popfinalcgstamt).toFixed(2) +parseFloat(popfinalsgstamt).toFixed(2);
	  
	  
	
	  $("#totlPrice").val(parseFloat(finalpopamount).toFixed(2));
	  
	  
	}
	


	
}





function billcompanyBranchChange(){
	
	_.each(wh1.wh1list,function(vendList){
		if(vendList.companyRegionId == $("#fromwhDL").val()){
			
			$("#billcompanyRegionId").val(vendList.companyRegionId);

		}
		
});
	
	
	var companyon1Name = $("#billcompanyRegionId").val();
	
	//alert("TEST......"+companyon1Name);
	
	var strUrl1=request_url_ro + "companyBranch/getById/" + companyon1Name;
	companyList = getJSONData(strUrl1);	
	
	var addressDescription;
	var location;
	var city;
	var pinCode;
	
	if(companyList.RESPONSE_BODY.address != null && companyList.RESPONSE_BODY.address != "" && companyList.RESPONSE_BODY.address != undefined){
		
		$("#billToaddressId").val(companyList.RESPONSE_BODY.address.id);

		
		 addressDescription = companyList.RESPONSE_BODY.address.addressDescription1;
		 location = companyList.RESPONSE_BODY.address.location;	 
		 city = companyList.RESPONSE_BODY.address.city;		 
		 pinCode = companyList.RESPONSE_BODY.address.pinCode;
		
		
	}
	
	if(addressDescription != null && addressDescription != "" && addressDescription != undefined && location != null && location != "" && location != undefined
			&& city != null && city != "" && city != undefined && pinCode != null && pinCode != "" && pinCode != undefined){

	var addressDetails = addressDescription + " " + location + " " + city + " " + pinCode;
	}
	
	if(addressDetails != null && addressDetails != "" && addressDetails != undefined){

	$("#address").val(addressDetails);
	}else{
		
		$("#address").val("");

	}
	
}



function shipcompanyBranchChange(){
	
	
	_.each(wh1.wh1list,function(vendList){
		if(vendList.id == $("#shipfromwhDL").val()){
			
			$("#shipcompanyRegionId").val(vendList.companyRegionId);

		}
		
});
	
	
	var companyon1Name = $("#shipcompanyRegionId").val();
	
	var strUrl1=request_url_ro + "companyBranch/getById/" + companyon1Name;
	companyList = getJSONData(strUrl1);	
	
	var shipaddressDescription;
	var shiplocation;
	var shipcity;
	var shippinCode;
	
	if(companyList.RESPONSE_BODY.address != null && companyList.RESPONSE_BODY.address != "" && companyList.RESPONSE_BODY.address != undefined){
		
		$("#shipToaddressId").val(companyList.RESPONSE_BODY.address.id);
		
		shipaddressDescription = companyList.RESPONSE_BODY.address.addressDescription1;		 
		 shiplocation = companyList.RESPONSE_BODY.address.location;		 
		 shipcity = companyList.RESPONSE_BODY.address.city;		 
		 shippinCode = companyList.RESPONSE_BODY.address.pinCode;
		
		
	}
	
	if(shipaddressDescription != null && shipaddressDescription != "" && shipaddressDescription != undefined && shiplocation != null && shiplocation != "" && shiplocation != undefined
			&& shipcity != null && shipcity != "" && shipcity != undefined && shippinCode != null && shippinCode != "" && shippinCode != undefined){
	var shipaddressDetails = shipaddressDescription + " " + shiplocation + " " + shipcity + " " + shippinCode;
	}
	$("#deladdress").val(shipaddressDetails);
	
}





function updateinvoiceItemDetails(ava,itemId){
	
	
	var hsnCode = $("#"+"itemHsn-"+itemId).val();
	var matUOM = $("#"+"itemUOM-"+itemId).val(); 
	var finalitemQty=$("#"+"finalitemQty-"+itemId).val();
	var batchQty =$("#"+"receivdQty-"+itemId).val();
	var purchaseDis =$("#"+"itemDiscount-"+itemId).val();
    var mrp=$("#"+"itemMrp-"+itemId).val();
    var cgstTaxpercent=$("#"+"cgsttax_"+itemId).val();
    var cgstTaxAount=$("#"+"cgsttaxAmt-"+itemId).val();
    var sgstTaxpercent=$("#"+"sgsttax_"+itemId).val();
    var sgstTaxAount=$("#"+"sgsttaxAmt-"+itemId).val();
    var totalPrice=$("#"+"processPrice-"+itemId).val();
		

    _.each(finalInvoiceList.invoiceItemList, function(item) { 
		if(item.id == itemId){
			item.hsnCode = hsnCode;
			item.materialUOM = matUOM;
			item.finalOrderQty = finalitemQty;
			item.itemQty = batchQty;
			item.discount = purchaseDis;
			item.maxRetailPrice = mrp;
			item.tax1Percent = cgstTaxpercent;
			item.tax1Amt = cgstTaxAount;
			item.tax2Percent = sgstTaxpercent;
			item.tax2Amt = sgstTaxAount;
			item.unitPrice = totalPrice;
		}
	
    });
    
    
	sessionStorage.setItem("STOCK_VENDOR_INVOICE", JSON.stringify(finalInvoiceList));
	

    
	  var finalInvoiceList = JSON.parse(sessionStorage.getItem("STOCK_VENDOR_INVOICE"));
		
	
	 console.log("...111111..finalInvoiceList........"+JSON.stringify(finalInvoiceList));

    $("#invoiceContainer").html(_.template(invoiceTemplate, finalInvoiceList));
	$('#invoiceContainer').trigger("create");
	
	
    
  /*  _.each(finalInvoiceList.invoiceItemList, function(mitem){

			$("#date-"+item.id).datepicker({

			dateFormat : "dd-mm-yy",

			changeMonth: true,

			changeYear: true,

		});

			$("#date-"+item.id).val(item.vdrInvoiceDt);
			  

			$("#vendorDt-"+item.id).datepicker({

				dateFormat : "dd-mm-yy",

				changeMonth: true,

				changeYear: true,

			});

			$("#vendorDt-"+item.id).val(item.batchGoodsReceivedDate);

		

	});*/

    _.each(finalInvoiceList.invoiceItemList, function(mitem) { 
		$("#itemHsn-"+item.id+item.materialId).val(item.hsnCode);
		$("#itemUOM-"+item.id+item.materialId).val(item.materialUOM);
		$("#finalitemQty-"+item.id+item.materialId).val(item.finalOrderQty);
		$("#receivdQty-"+item.id+item.materialId).val(item.itemQty);
		$("#itemDiscount-"+item.id+item.materialId).val(item.batchDiscountPercentage );
		$("#itemMrp-"+item.id+item.materialId).val(item.maxRetailPrice);
		$("#cgsttax_"+item.id+item.materialId).val(item.tax1Percent);
		$("#cgsttaxAmt-"+item.id+item.materialId).val(item.tax1Amt);
		$("#sgsttax_"+item.id+item.materialId).val(item.tax2Percent);
		$("#sgsttaxAmt-"+item.id+item.materialId).val(item.tax2Amt);
		$("#processPrice"+item.id+item.materialId).val(item.unitPrice);
		  
		  /*$("#date-"+item.id+item.materialId).datepicker({

				dateFormat : "dd-mm-yy",

				changeMonth: true,

				changeYear: true,

			});

				$("#date-"+item.id+item.materialId).val(item.vdrInvoiceDt);
		  
				
				$("#vendorDt-"+item.id+item.materialId).datepicker({

					dateFormat : "dd-mm-yy",

					changeMonth: true,

					changeYear: true,

				});

			$("#vendorDt-"+item.id+item.materialId).val(item.batchGoodsReceivedDate);*/
		  
		  
	
       });
    
  
       
}




function updateMrp(mrp,rowId,mrpprice,orderId,type,tax,discountArray)
{

	var newMrp = mrp.value;
	
	//materialItemList = [];

	if(discountArray == undefined){
		discountItem={
				discountItemList:[]
		}
	}
	
	if(newMrp != ""){
	

       
      	if (type == "MRP"){
      		
    		updateMrpForInvoice(newMrp,rowId,orderId,discountItem.discountItemList,type);
    		
    		result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
      		   
   		var select = "MRP"
   		calculateOnMRP(select,rowId,newMrp,orderId,tax,discountArray)
   	}else{
   		
   		
   		updateTaxAblePriceForInvoice(newMrp,rowId,orderId,discountItem.discountItemList,type);
		
		result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
      	// alert(result.invoiceGrandTotl+"result.invoiceGrandTotl"+".............."+proAmount);

   		
   	 /*result.invoiceGrandTotl = parseFloat(result.invoiceGrandTotl) - parseFloat(proAmount);
     result.promocodeAmount = parseFloat(proAmount);*/
   		
//   		$("#invoiceContainer").html("")
//   	    $("#invoiceContainer").html(_.template(mainTemplate, result));
//   		
    	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
		$('#invoiceContainer').trigger("create");

   	}
//   	$('#invoiceContainer').trigger("create");
 //  	$("#advancePaymentAmt").val(advancePaymentAmount);
	}else
		{
	//	$("#itemMrp-"+rowId).val(olderMatId);
		}
	

	
	
_.each(result.invoiceItemList,function(items){
	
	
	
	
		
		//alert(JSON.stringify(items));
		
		$("#cgsttax_"+items.rowId).val(items.tax1);
		
		$("#sgsttax_"+items.rowId).val(items.tax2);			
		$("#sgsttax_"+items.rowId).prop('disabled',true);
		$("#matbrand-"+items.rowId).val(items.prdBrand);
		
		$("#materialType-"+items.rowId).val(items.materialType);
		
		if(items.isFreeItem == true){
			
			$("#txtcheck_"+items.rowId).prop('checked', true);
		}
		
		if(items.materialPackageId != undefined && items.materialPackageId != null && items.materialPackageId != ""){

			   
			   $("#cgsttax_"+items.rowId).prop('disabled',true);
				
				$("#sgsttax_"+items.rowId).prop('disabled',true);
			   
			   
			   
		   }
					    		
			$("#itemDisc-"+rowId).focus();
	});
	


        
   //     console.log(".................."+JSON.stringify(materialItemList));  
}



function calculateOnMRP(mrp,rowId,price,orderId,tax,discountArray){
	
	
	
//	alert("mrp......."+mrp.value);
	
	if (mrp == "MRP"){
		var newMrp = mrp;
	}else {
		var newMrp = mrp.value;
	}
	/*
	taxItem={
			taxItemList:[]
	}
	*/
	

	//alert("newMrp.........."+newMrp);
	if(discountArray == undefined){
		discountItem={
				discountItemList:[]
		}
	}
	//alert("newMrp......"+newMrp)
	if (newMrp == "MRP"){
		
	
		
		if (price !=""){
			
			result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
			
		   	_.each(result.invoiceItemList,function(itemm){
		   		
		   	
		   		
		   		if(itemm.rowId == rowId){
		   			var discAmt = 0;
		   			var addtionalDis = 0;
		   		  if(itemm.batchDiscountPercentage != null && itemm.batchDiscountPercentage != 0 && itemm.batchDiscountPercentage!="" )
					{
					  //discAmt = ((item.discount/100) * (item.finalOrderQty * newMrp));
					  discAmt = calculateItemLevelDiscounAmt(price,1,itemm.batchDiscountPercentage);
					}
		   		  
		   		 // alert("batchDiscountPercentage..."+discAmt);
		   		  if(discountArray != undefined && discountArray!= null && discountArray !="" ){
					   
					 //  var disTotAmount = price * itemm.finalOrderQty;
					   
					   addtionalDis=calculateAdditionalDiscountAmount(discountArray,price);
					   
					
				   }
		   		  
		   	
				   var finPrice = 0;
				   
				   finPrice = parseFloat(price) - parseFloat(discAmt) - parseFloat(addtionalDis);
				   finPrice1 = parseFloat(finPrice) * parseFloat(itemm.finalOrderQty)
				  
				   
		   			calculateUnitPrice(finPrice,tax)
		   		//	itemm.maxRetailPrice = price;
				   
		   			
		   		}
		   	})
		   	

			
		   	//console.log("matter that materrs most......................"+JSON.stringify(result))
		   	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
		//	updateMrpDetailsForInvoice(newMrp,matId,orderId,discountItem.discountItemList);
			//alert("itemPrice........"+price);
			//updateMrpDetailsForInvoice(itemPrice,matId,orderid,discountarray);
		//	alert("......."+itemPrice+".................."+discountItem.discountItemList);
			updateMrpDetailsForInvoice(itemPrice,rowId,discountItem.discountItemList,newMrp);
			
			result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
		  /*    alert(JSON.stringify(result));
		       console.log(".......jyo...."+JSON.stringify(result));
		       */
		/*           _.find(result.invoiceItemList,function(itm){
		 
		        	
		        		  if(itm.orderId == orderId){
		        			  if(itm.matId == matId){
		    			   itm.type=newMrp;
		    		   }
		    	   }
		    	   
		       });*/
		       
		    // 	console.log("check here ............"+JSON.stringify(result))
			
		       /* additionDiscAmt = result.invoiceSubTotl * (customerAdditionalDiscount/100);
		        additionDiscAmt = parseFloat(additionDiscAmt).toFixed(2);
		        incentiveDiscAmt = result.invoiceSubTotl * (customerIncentiveDiscount/100);
		        incentiveDiscAmt =  parseFloat(incentiveDiscAmt).toFixed(2);
		      
		       customerDiscountAmt = result.invoiceSubTotl - additionDiscAmt - incentiveDiscAmt;
		       customerDiscountAmt = parseFloat(customerDiscountAmt).toFixed(2);*/
		     //  alert(customerDiscountAmt+"customerDiscountAmt");
		      /* if(parseFloat(customerDiscountAmt) > 0)
		       	{
		       	 
		       	 result.subTotal =  customerDiscountAmt;
		       //	 alert(result.invoiceGrandTotl+"result.invoiceGrandTotl");
		       	 var grandTotal = result.invoiceGrandTotl - additionDiscAmt - incentiveDiscAmt;
		       	 result.invoiceGrandTotl = Math.round(parseFloat(grandTotal).toFixed(2));
		       	 result.additionalDiscount = additionDiscAmt;
		       	 result.incentiveDiscount = incentiveDiscAmt;
		       	}else{
		       		result.additionalDiscount =0;;
		         	 result.incentiveDiscount=0;
		       	}*/
		       
		       sessionStorage.removeItem("INVOICE_ITEMS");

		  	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
		 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
		  //    console.log("....ranjan........"+JSON.stringify(result));
		    //   alert(JSON.stringify(result));
		 	
		 	 result.invoiceGrandTotl = parseFloat(result.invoiceGrandTotl);
		//     result.promocodeAmount = parseFloat(proAmount);
		 	
		 	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
				$('#invoiceContainer').trigger("create");
		//   	$("#advancePaymentAmt").val(advancePaymentAmount);
		   	_.each(result.invoiceItemList,function(itemm){
		   		$("#itemType-"+itemm.rowId).val(itemm.priceCalc);
		   	
		   	})
		   	//$("#itemType-"+matId).val("MRP");
			}else
				{
				$("#itemMrp-"+rowId).val(olderMatId);
				}
	}else {
		
		
		
//	alert("discount type ");
		
//	createOrderItemsForInvoice();
		
	//	alert(price+"...............1............price")
		
		updateMrpForInvoiceByWithoutDiscount(newMrp,price,orderitemId,discountArray)
	
    result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
    
    //   alert(result.invoiceSubTotl);
  //     alert(customerAdditionalDiscount+"customerAdditionalDiscount- customerIncentiveDiscount"+customerIncentiveDiscount);
       /* additionDiscAmt = result.invoiceSubTotl * (customerAdditionalDiscount/100);
        additionDiscAmt = parseFloat(additionDiscAmt).toFixed(2);
        incentiveDiscAmt = result.invoiceSubTotl * (customerIncentiveDiscount/100);
        incentiveDiscAmt =  parseFloat(incentiveDiscAmt).toFixed(2);
      
       customerDiscountAmt = result.invoiceSubTotl - additionDiscAmt - incentiveDiscAmt;
       customerDiscountAmt = parseFloat(customerDiscountAmt).toFixed(2);*/
      // alert(customerDiscountAmt+"customerDiscountAmt");
       /*if(parseInt(customerDiscountAmt) > 0)
       	{
       	 
       	 result.subTotal =  customerDiscountAmt;
       	// alert(result.invoiceGrandTotl+"result.invoiceGrandTotl");
       	 var grandTotal = result.invoiceGrandTotl - additionDiscAmt - incentiveDiscAmt;
       	 result.invoiceGrandTotl = Math.round(parseFloat(grandTotal).toFixed(2));
       	// alert("additionDiscAmt..."+additionDiscAmt);
       	 result.additionalDiscount = additionDiscAmt;
       	 result.incentiveDiscount = incentiveDiscAmt;
       	}else{
       		//alert("comws here"+ result.invoiceGrandTotl);
       		 result.additionalDiscount =0;
	        	 result.incentiveDiscount =0;
       	}*/
     //  console.log("result"+JSON.stringify(result));
      // alert(JSON.stringify(result));
       
       result.invoiceGrandTotl = parseFloat(result.invoiceGrandTotl) - parseFloat(proAmount);
       result.promocodeAmount = parseFloat(proAmount);
       
       $("#invoiceContainer").html(_.template(invoiceTemplate, result));
		$('#invoiceContainer').trigger("create");
   	
 	_.each(result.invoiceItemList,function(itemm){
 		$("#itemType-"+itemm.rowId).val(itemm.priceCalc);
   	})
	}
	
	 _.each(result.invoiceItemList,function(items){
			
			//alert(JSON.stringify(items));
			
			$("#cgsttax_"+items.rowId).val(items.tax1);
			
			$("#sgsttax_"+items.rowId).val(items.tax2);					
			$("#sgsttax_"+items.rowId).prop('disabled',true);
			
			
			//alert(items.isFreeItem+"..........123........items.isFreeItem");
			
			if(items.isFreeItem == true){
				
				$("#txtcheck_"+items.rowId).prop('checked', true);
			}
			
			if(items.materialPackageId != undefined && items.materialPackageId != null && items.materialPackageId != ""){

				   
				   $("#cgsttax_"+items.rowId).prop('disabled',true);
					
					$("#sgsttax_"+items.rowId).prop('disabled',true);
				   
				   
				   
			   }
			
			
		});
		
	 $("#itemDisc-"+rowId).focus();
	}



function updateDisocuntPercentage(discPercent,rowId,olderMatId,orderId,type,tax,discountArray)
{
	
	//var type;
	
	var discPer = 0;
	
	if(discPercent.value !=null && discPercent.value !=""){
		discPer = discPercent.value
	}
	

	var newMrp = $("#itemMrp-"+rowId).val();
	
//	alert(newMrp+"....newMrp")
	
	//materialItemList = [];

	if(discountArray == undefined){
		discountItem={
				discountItemList:[]
		}
	}
	if(newMrp != 0 && newMrp != ""){
		
 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
 	 	
 		_.each(result.invoiceItemList,function(items){
 			if(items.rowId == rowId){
 				items.batchDiscountPercentage = discPer;
 			}
 		});
 		
 		//alert("discPer.."+discPer);
 		//console.log("result"+JSON.stringify(result));
 		
 		 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
 		
 		
		
		
		
		updateMrpForInvoice(newMrp,rowId,discountItem.discountItemList);
		
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
     /*  alert(result.invoiceSubTotl);
       alert(customerAdditionalDiscount+"customerAdditionalDiscount");*/

      /*  additionDiscAmt = result.invoiceSubTotl * (customerAdditionalDiscount/100);
        additionDiscAmt = parseFloat(additionDiscAmt).toFixed(2);
        incentiveDiscAmt = result.invoiceSubTotl * (customerIncentiveDiscount/100);
        incentiveDiscAmt =  parseFloat(incentiveDiscAmt).toFixed(2);
      
       customerDiscountAmt = result.invoiceSubTotl - additionDiscAmt - incentiveDiscAmt;
       customerDiscountAmt = parseFloat(customerDiscountAmt).toFixed(2);*/
     //  alert(customerDiscountAmt+"customerDiscountAmt");
      /* if(parseFloat(customerDiscountAmt) > 0)
       	{
       	 
       	 result.subTotal =  customerDiscountAmt;
       //	 alert(result.invoiceGrandTotl+"result.invoiceGrandTotl");
       	 var grandTotal = result.invoiceGrandTotl - additionDiscAmt - incentiveDiscAmt;
       	 result.invoiceGrandTotl = Math.round(parseFloat(grandTotal).toFixed(2));
       	 result.additionalDiscount = additionDiscAmt;
       	 result.incentiveDiscount = incentiveDiscAmt;
       	}else{
       		result.additionalDiscount =0;;
         	 result.incentiveDiscount=0;
       	}*/
      // console.log(JSON.stringify(result));
    //   alert(JSON.stringify(result));
     /*  $("#orderItemListContainer").html("")
       $("#orderItemListContainer").html(_.template(mainTemplate, result));*/
       

	if (type == "MRP"){
  		
		var select = "MRP"
		calculateOnMRP(select,rowId,newMrp,orderId,tax,discountArray)
	}else{
		
  	// alert(result.invoiceGrandTotl+"result.invoiceGrandTotl"+".............."+proAmount);

		
	 result.invoiceGrandTotl = parseFloat(result.invoiceGrandTotl) - parseFloat(proAmount);
 result.promocodeAmount = parseFloat(proAmount);
		
		$("#invoiceContainer").html("")
	       $("#invoiceContainer").html(_.template(mainTemplate, result));
//		console.log("check me .............."+JSON.stringify(result.invoiceItemList));
		_.each(result.invoiceItemList,function(itemm){
			$("#itemType-"+rowId).val(itemm.priceCalc);
			
	   	})
	}
		$('#invoiceContainer').trigger("create");
   //	$("#advancePaymentAmt").val(advancePaymentAmount);
	}else
		{
		
		
		var Exprice = 0;
 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
 	 	
 		_.each(result.invoiceItemList,function(items){
 			if(items.rowId == rowId){
 				items.batchDiscountPercentage = discPer;
 				Exprice = items.matTaxAblePrice;
 			}
 		});
 		
 		//console.log("result"+JSON.stringify(result));
 		
 		 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
 		
 		 
     updateTaxAblePriceForInvoice(Exprice,rowId,orderId,discountItem.discountItemList,type);
		
		result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
      	// alert(result.invoiceGrandTotl+"result.invoiceGrandTotl"+".............."+proAmount);

   		
   	 /*result.invoiceGrandTotl = parseFloat(result.invoiceGrandTotl) - parseFloat(proAmount);
     result.promocodeAmount = parseFloat(proAmount);*/
   		
//   		$("#invoiceContainer").html("")
//   	    $("#invoiceContainer").html(_.template(mainTemplate, result));
//   		
    	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
		$('#invoiceContainer').trigger("create");
		
		}
	

	
	
_.each(result.invoiceItemList,function(items){
		
		//alert(JSON.stringify(items));
		
		$("#cgsttax_"+items.rowId).val(items.tax1);
		
		$("#sgsttax_"+items.rowId).val(items.tax2);				
		$("#sgsttax_"+items.rowId).prop('disabled',true);
		$("#matbrand-"+items.rowId).val(items.prdBrand);
		
		$("#materialType-"+items.rowId).val(items.materialType);
		
	/*if(items.isFreeItem == true){
			
			$("#txtcheck_"+items.orderItemId).prop('checked', true);
		}*/
		
	
		if(items.materialPackageId != undefined && items.materialPackageId != null && items.materialPackageId != ""){

		   
		   $("#cgsttax_"+items.rowId).prop('disabled',true);
			
			$("#sgsttax_"+items.rowId).prop('disabled',true);
		   
		   
		   
	   }
				    		$("#itemDisc-"+rowId).focus();
	});
	


        

}


function updateQty(qty,rowId,olderMatId,orderId,type,tax,discountArray)
{
	
	//var type;
	
	var finlQty = 0;
	
	if(qty.value !=null && qty.value !=""){
		finlQty = qty.value
	}
	

	var newMrp = $("#itemMrp-"+rowId).val();
	
//	alert(newMrp+"....newMrp")
	
	//materialItemList = [];

	if(discountArray == undefined){
		discountItem={
				discountItemList:[]
		}
	}
	if(newMrp != 0 && newMrp != ""){
		
 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
 	 	
 		_.each(result.invoiceItemList,function(items){
 			if(items.rowId == rowId){
 				items.finalOrderQty = finlQty;
 			}
 		});
 		
 		//console.log("result"+JSON.stringify(result));
 		
 		 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
 		
 		
		
		
		
		updateMrpForInvoice(newMrp,rowId,discountItem.discountItemList);
		
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
     /*  alert(result.invoiceSubTotl);
       alert(customerAdditionalDiscount+"customerAdditionalDiscount");*/

      /*  additionDiscAmt = result.invoiceSubTotl * (customerAdditionalDiscount/100);
        additionDiscAmt = parseFloat(additionDiscAmt).toFixed(2);
        incentiveDiscAmt = result.invoiceSubTotl * (customerIncentiveDiscount/100);
        incentiveDiscAmt =  parseFloat(incentiveDiscAmt).toFixed(2);
      
       customerDiscountAmt = result.invoiceSubTotl - additionDiscAmt - incentiveDiscAmt;
       customerDiscountAmt = parseFloat(customerDiscountAmt).toFixed(2);*/
     //  alert(customerDiscountAmt+"customerDiscountAmt");
      /* if(parseFloat(customerDiscountAmt) > 0)
       	{
       	 
       	 result.subTotal =  customerDiscountAmt;
       //	 alert(result.invoiceGrandTotl+"result.invoiceGrandTotl");
       	 var grandTotal = result.invoiceGrandTotl - additionDiscAmt - incentiveDiscAmt;
       	 result.invoiceGrandTotl = Math.round(parseFloat(grandTotal).toFixed(2));
       	 result.additionalDiscount = additionDiscAmt;
       	 result.incentiveDiscount = incentiveDiscAmt;
       	}else{
       		result.additionalDiscount =0;;
         	 result.incentiveDiscount=0;
       	}*/
      // console.log(JSON.stringify(result));
    //   alert(JSON.stringify(result));
     /*  $("#orderItemListContainer").html("")
       $("#orderItemListContainer").html(_.template(mainTemplate, result));*/
       //alert("TYPE....."+type);

	if (type == "MRP"){
  		
		var select = "MRP"
		calculateOnMRP(select,rowId,newMrp,orderId,tax,discountArray)
	}else{
		
  	// alert(result.invoiceGrandTotl+"result.invoiceGrandTotl"+".............."+proAmount);

		
	 result.invoiceGrandTotl = parseFloat(result.invoiceGrandTotl) - parseFloat(proAmount);
 result.promocodeAmount = parseFloat(proAmount);
		
		$("#invoiceContainer").html("")
	       $("#invoiceContainer").html(_.template(mainTemplate, result));
//		console.log("check me .............."+JSON.stringify(result.invoiceItemList));
		_.each(result.invoiceItemList,function(itemm){
			$("#itemType-"+rowId).val(itemm.priceCalc);
			
			$("#matbrand-"+rowId).val(itemm.prdBrand);
	  		
	  	$("#materialType-"+rowId).val(itemm.materialType);
			
	   	})
	}
		$('#invoiceContainer').trigger("create");
   //	$("#advancePaymentAmt").val(advancePaymentAmount);
	}else
		{
		
		
		var Exprice = 0;
 	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
 	 	
 		_.each(result.invoiceItemList,function(items){
 			if(items.rowId == rowId){
 				items.finalOrderQty = finlQty;
 				Exprice = items.matTaxAblePrice;
 			}
 		});
 		
 		//console.log("result"+JSON.stringify(result));
 		
 		 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));
 		
 		 
     updateTaxAblePriceForInvoice(Exprice,rowId,orderId,discountItem.discountItemList,type);
		
		result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
      	// alert(result.invoiceGrandTotl+"result.invoiceGrandTotl"+".............."+proAmount);

   		
   	 /*result.invoiceGrandTotl = parseFloat(result.invoiceGrandTotl) - parseFloat(proAmount);
     result.promocodeAmount = parseFloat(proAmount);*/
   		
//   		$("#invoiceContainer").html("")
//   	    $("#invoiceContainer").html(_.template(mainTemplate, result));
//   		
    	 $("#invoiceContainer").html(_.template(invoiceTemplate, result));
		$('#invoiceContainer').trigger("create");
		
		}
	

	
	
_.each(result.invoiceItemList,function(items){
		
		//alert(JSON.stringify(items));
		
		$("#cgsttax_"+items.rowId).val(items.tax1);
		
		$("#sgsttax_"+items.rowId).val(items.tax2);				
		$("#sgsttax_"+items.rowId).prop('disabled',true);
		
		$("#matbrand-"+items.rowId).val(items.prdBrand);
	  		
	  	$("#materialType-"+items.rowId).val(items.materialType);
		
	/*if(items.isFreeItem == true){
			
			$("#txtcheck_"+items.orderItemId).prop('checked', true);
		}*/
		
	
				    		if(items.materialPackageId != undefined && items.materialPackageId != null && items.materialPackageId != ""){

		   
		   $("#cgsttax_"+items.rowId).prop('disabled',true);
			
			$("#sgsttax_"+items.rowId).prop('disabled',true);
		   
		   
		   
	   }
				    		$("#itemDisc-"+rowId).focus();
	});
	


        

}



function calculateUnitPrice(amount,tax){
	var caltotaltax = 0;
	var taxVa = 0;
	//alert("taxlist........."+JSON.stringify(tax));
//	var taxlist = JSON.parse(tax);
	
	//alert("taxlist....22222....."+tax);
	_.each(tax,function(item){
		
		taxVa = parseFloat(taxVa) +parseFloat(item.taxPercent)
		
	
	});
	
	
	taxpercent(taxVa);
	
		 var newsellingPrize = (parseFloat(amount)) - parseFloat(amount)*(parseFloat(taxPer)/100);
		 
		 itemPrice = parseFloat(newsellingPrize);
		 
	
}

function taxpercent(tax){


	var taxpercentage =parseFloat(tax);
	var totalAmount = 100;
	 disc1 = parseFloat(totalAmount - (totalAmount * taxpercentage)/100);
	
	
		disc2 = parseFloat(disc1 + (disc1 * taxpercentage)/100) ;
	
	
	 diff1 = parseFloat(totalAmount - disc2);

	 diff2 = (disc1 * diff1)/disc2
	
	 finresult = totalAmount - (disc1 + diff2);
	
	finresult = finresult
		
	taxPer = finresult;
	}





function updateMatCode(matCode,rowId,olderMatId,orderId,type,tax,discountArray)
{

	var matCode = matCode.value;
   var newMrp = $("#itemMrp-"+rowId).val();
	//var newMrp = matCode.value;
	
	//materialItemList = [];

		
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	_.each(result.invoiceItemList,function(items){
		if(items.rowId == rowId){
			items.matCode = matCode;
		}
	});
	
//	console.log("result"+JSON.stringify(result));
	
	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));

	
_.each(result.invoiceItemList,function(items){
		
		//alert(JSON.stringify(items));
		
		$("#cgsttax_"+items.rowId).val(items.tax1);
		
		$("#sgsttax_"+items.rowId).val(items.tax2); 		 	
		$("#sgsttax_"+items.rowId).prop('disabled',true);
		
	if(items.isFreeItem == true){
			
			$("#txtcheck_"+items.rowId).prop('checked', true);
		}
		
		if(items.materialPackageId != undefined && items.materialPackageId != null && items.materialPackageId != ""){

		   $("#cgsttax_"+items.rowId).prop('disabled',true);
		   $("#sgsttax_"+items.rowId).prop('disabled',true);
  
	   }
		
	});
	

}


function updateUom(matUom,rowId,olderMatId,orderId,type,tax,discountArray)
{

	var matUom = matUom.value;
	//alert(matUom);
 	
	result = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	_.each(result.invoiceItemList,function(items){
		if(items.rowId == rowId){
			items.materialUOM = matUom;
		}
	});

	 sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(result));

_.each(result.invoiceItemList,function(items){
		
		//alert(JSON.stringify(items));
		
		$("#cgsttax_"+items.rowId).val(items.tax1);
		
		$("#sgsttax_"+items.rowId).val(items.tax2); 		 	
		$("#sgsttax_"+items.rowId).prop('disabled',true);
		$("#matbrand-"+items.rowId).val(items.prdBrand);
		
		$("#materialType-"+items.rowId).val(items.materialType);
		
	if(items.isFreeItem == true){
			
			$("#txtcheck_"+items.rowId).prop('checked', true);
		}
		
		if(items.materialPackageId != undefined && items.materialPackageId != null && items.materialPackageId != ""){

		   $("#cgsttax_"+items.rowId).prop('disabled',true);
		   $("#sgsttax_"+items.rowId).prop('disabled',true);
  
	   }
		
	});
	

}


function categoryChange(){
		
    mainCategoryId = $("#maincategoryContainer").val();
	
	 $("#categoryDL").val("");
   subcategory = {
   		subcatList :[]
   }

   
   product = {
			productList:[]
	}
   $("#productDL").val("");
   
 
   	product = {
   			productList:[]
   	}
   	
	/*strUrl=	request_url + "materialMST/getMatListByCategory/" + sessionStorage.getItem("companyBranch")+"/"+mainCategoryId;
	productLst = getJSONData(strUrl);*/
   	
   	
   	var selectedType = $('input[name=options]:checked').val();
   	
   	

   	if($("#maincategoryContainer").val() != null && $("#maincategoryContainer").val() != ""){
   	
	if(selectedType == "CAR SPARES"){
		
	//	if($("#vehicleDetailsId").val() !="" && $("#vehicleDetailsId").val() !=null){
		
		strUrl = request_url_ro + "materialMST/getMatListByVehicleDetails/" + sessionStorage.getItem("companyBranch") + "///"+$("#maincategoryContainer").val();
	    productLst = getJSONData(strUrl);
		
	    
		sessionStorage.setItem("ITEMS_LIST", JSON.stringify(productLst.RESPONSE_BODY));
		
		
		
		 _.each(productLst.RESPONSE_BODY,function(prdlist){
			 
			 if(prdlist.materialType == 'OES'){
				 
				 if(prdlist.prdBrand !=null && prdlist.prdBrand !=""){
					 value = prdlist.materialName+" ("+prdlist.materialType+")" +"-"+prdlist.prdBrand;
				 }else{
					 value = prdlist.materialName+" ("+prdlist.materialType+")";
				 }
				  
				 
				  
			  }else{
				  
				  value = prdlist.materialName;
			  }
			 
	       	product.productList.push({
	       		 id:prdlist.id,
	   		     value:value,
	       	    qty:prdlist.availableQuantity,
	       	    vehId:prdlist.vehicleId,
	       	    genericId:prdlist.matGenericId,
	       	 vehMake:prdlist.vehMake,
	       	vehModel:prdlist.vehModel,
	       	vehicleVariant:prdlist.vehicleVariant,
	       	materialType:prdlist.materialType,
	       	prdBrand:prdlist.prdBrand,
	       	});
	       	      
	     
	      
	       	
	       });
		 
		/*}else{
			alert("Please Select the Vehicle");
			$("#maincategoryContainer").val("");
			}*/
		}
   	}
  
   $("#productDL").autocomplete({
	     source:product.productList,
	     select: function(e, ui) {
	    	 $("#productId").val((ui.item.id).trim());
	         $(this).val(ui.item.value);   
	        $("#productDL").val((ui.item.value).trim());
	        $("#avialQnty").val(ui.item.qty);
	        $("#materialType").val(ui.item.materialType);
	        $("#matbrand").val(ui.item.prdBrand);
	        $("#materialType").val(ui.item.materialType);
	     
	        productId = $("#productId").val();
	        
	     }
	 });
   
   
	 if(outstandingValidation){
		 $("#msgessageText").show();
		$("#msgtxt").text("Credit lock has been activated for this customer. Please take necessary approvals to create order.");
	}else{
		$("#msgessageText").hide();
		$("#msgtxt").html("");
	}
   
}


function carsparesClick(){
	$("#vehicleDetLabel").show();
	$("#vehDivtd").show();
	
	$("#carsparradio").prop("checked", false);
	$("#commonItemradio").prop("checked", false);
	$("#packradio").prop("checked", false);
	
	$("#carsparelable").css("background-color", "#17607d");
	$("#commonitemlable").css("background-color", "#17607d");
	$("#packlable").css("background-color", "#17607d");
	
	$("#carsparradio").prop("checked", true);
	$("#carsparelable").css("background-color", "#0062cc");
	$("#vehicleDetailsDl").attr("disabled",false);
	$("#maincategoryContainer").val("");
	 $("#maincategoryContainer").attr("disabled", false); 
	 $("#vehicleDetailsDl").val("");
	 $("#vehicleDetailsId").val("");
//	 product = {
//				productList:[]
//		}
	//categoryChange();
}



function commonItemsClick(){
	
	var commanItemsCatId = sessionStorage.getItem("COMMAN_CATEGORY_ID");
	
	$("#carsparradio").prop("checked", false);
	$("#commonItemradio").prop("checked", false);
	$("#packradio").prop("checked", false);
	
	$("#carsparelable").css("background-color", "#17607d");
	$("#commonitemlable").css("background-color", "#17607d");
	$("#packlable").css("background-color", "#17607d");
	
	$("#commonItemradio").prop("checked", true);
	$("#commonitemlable").css("background-color", "#0062cc");
	
	
	
	
//	alert("click........"+commanItemsCatId);
	
	$("#maincategoryContainer").val(commanItemsCatId);
	$("#vehicleDetailsId").val("");
	$("#vehicleDetailsDl").val("");
	commoncategoryChange();
	
	
	
	/*$("#vehicleDetLabel").hide();
	$("#vehDivtd").hide();*/
	$("#vehicleDetailsDl").attr("disabled",true);
	
}



function stockItemsClick(){


	$("#carsparradio").prop("checked", false);

	$("#commonItemradio").prop("checked", false);



	$("#carsparelable").css("background-color", "#17607d");

	$("#commonitemlable").css("background-color", "#17607d");

	

	$("#commonItemradio").prop("checked", false);

	$("#commonitemlable").css("background-color", "#17607d");
	
	$("#stockItemradio").prop("checked", true);	
	$("#stockitemlable").css("background-color", "#0062cc");

	

	var stockItemsCatId = sessionStorage.getItem("STOCK_ITEM_CATEGORY_ID");

	

	$("#maincategoryContainer").val(stockItemsCatId);

	$("#vehicleDetailsId").val("");

	$("#vehicleDetailsDl").val("");

	commoncategoryChange();

	

	$("#vehicleDetLabel").hide();

	$("#vehDivtd").hide();

}



function commoncategoryChange(){
	
	//alert("here")
    mainCategoryId = $("#maincategoryContainer").val();
	//alert("........."+mainCategoryId);
	
	 $("#categoryDL").val("");
    subcategory = {
    		subcatList :[]
    }

    
    product = {
			productList:[]
	}
    $("#productDL").val("");
    

    	product = {
    			productList:[]
    	}
    	

		
    	if($("#maincategoryContainer").val() != null && $("#maincategoryContainer").val() != ""){
		
		strUrl = request_url_ro + "materialMST/getMatListByVehicleDetails/" + sessionStorage.getItem("companyBranch") + "/" + $("#vehicleDetailsId").val() +"//"+$("#maincategoryContainer").val();
	    productLst = getJSONData(strUrl);
			    
		sessionStorage.setItem("ITEMS_LIST", JSON.stringify(productLst.RESPONSE_BODY));
		
		
//		 _.each(productLst.RESPONSE_BODY,function(items){
			 /*  if(items.materialType == 'OEM'){*/
		
		// Commenting isFasting Reject Function to make way for making the common items as Fasting Moving
			   
			  
//		productLst.RESPONSE_BODY = _.reject(productLst.RESPONSE_BODY,function(item){
//			return item.isFastMoving == "Y"
//		});
		
		 _.each(productLst.RESPONSE_BODY,function(prdlist){
			 
/*			 if(prdlist.materialType == 'OES'){
				 
				 if(prdlist.prdBrand !=null && prdlist.prdBrand !=""){
					 value = prdlist.materialName+" ("+prdlist.materialType+")" +"-"+prdlist.prdBrand;
				 }else{
					 value = prdlist.materialName+" ("+prdlist.materialType+")";
				 }
				  
				 
				  
			  }else{
				  
				  value = prdlist.materialName;
			  }*/
			 
 if(prdlist.materialType == 'OES'){
				 
				
				 
				 if(prdlist.prdBrand != null && prdlist.prdBrand != "" && prdlist.prdBrand != "null" && prdlist.matCode != null && prdlist.matCode != "" && prdlist.matCode != "null"){
					 value = prdlist.materialName+" ("+prdlist.materialType+")" +"-"+prdlist.prdBrand+" ("+prdlist.matCode+")";
				 }else if(prdlist.prdBrand != null && prdlist.prdBrand != "" && prdlist.prdBrand != "null"){
					 value = prdlist.materialName+" ("+prdlist.materialType+")" +"-"+prdlist.prdBrand;
				 }else if(prdlist.matCode != null && prdlist.matCode != "" && prdlist.matCode != "null"){
					 value = prdlist.materialName+" ("+prdlist.materialType+")" +"-("+prdlist.matCode+")";
				 }
				  
				 
				  
			  }else{
					 if(prdlist.matCode != null && prdlist.matCode !=""){
				  value = prdlist.materialName+" ("+prdlist.matCode+")";
					 }else{
						 value = prdlist.materialName;
					 }
			  }
			 
	       	product.productList.push({
	       		 id:prdlist.id,
	   		     value:value,
	       	    qty:prdlist.availableQuantity,
	       	    vehId:prdlist.vehicleId,
	       	    genericId:prdlist.matGenericId,
	       	 vehMake:prdlist.vehMake,
	       	vehModel:prdlist.vehModel,
	       	vehicleVariant:prdlist.vehicleVariant,
	       	materialType:prdlist.materialType,
	       	prdBrand:prdlist.prdBrand,
	       	});
	       	      
	     
	      
	       	
	       });
		 
		 $("#maincategoryContainer").attr("disabled", true); 
		
	

    	}
	 
	 console.log(".........."+JSON.stringify(product.productList));
	  	
  
	 
   
    $("#productDL").autocomplete({
	     source:product.productList,
	     select: function(e, ui) {
	    	 $("#productId").val((ui.item.id).trim());
	         $(this).val(ui.item.value);   
	        $("#productDL").val((ui.item.value).trim());
	        $("#avialQnty").val(ui.item.qty);
	        $("#materialType").val(ui.item.materialType);
	        $("#matbrand").val(ui.item.prdBrand);
	     
	        productId = $("#productId").val();

	        
	       
	    
	     }
	 });
    
    

    
	 if(outstandingValidation){
		 $("#msgessageText").show();
			$("#msgtxt").text("Credit lock has been activated for this customer. Please take necessary approvals to create order.");
	}else{
		$("#msgessageText").hide();
	$("#msgtxt").html("");
	}
    
}

//oes onchange
function changeMaterial(rowId){
	
finalInvoiceList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));



var changedMaterialTyp = $("#materialType-"+rowId).val();

_.each(finalInvoiceList.invoiceItemList,function(items){
		if(items.rowId == rowId ){
			
			items.materialType = changedMaterialTyp;
			
			}
		});	
		//alert("change.."+changedMaterialTyp);
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(finalInvoiceList));
	
}
function changeBrand(rowId){
	
finalInvoiceList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));



var changedBrandNam = $("#matbrand-"+rowId).val();

_.each(finalInvoiceList.invoiceItemList,function(items){
		if(items.rowId == rowId ){
			
			items.prdBrand = changedBrandNam;
			
			}
		});	
	//alert("change.."+changedBrandNam);	
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(finalInvoiceList));
	
}


function onInvoiceTotalChange(amount){
	var totPrice = 0;
	
	if(amount.value !=null && amount.value !=""){
		totPrice = amount.value;
	}
	

	finalInvoiceList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));

           finalInvoiceList.invoiceGrandTotl = parseFloat(totPrice).toFixed();
           
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(finalInvoiceList));
}


function onInvoiceSubTotalChange(amount){
	var totPrice = 0;
	
	if(amount.value !=null && amount.value !=""){
		totPrice = amount.value;
	}
	

	
	finalInvoiceList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));

    finalInvoiceList.invoiceSubTotl = parseFloat(totPrice).toFixed();
           
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(finalInvoiceList));
}


function onInvoiceTaxChange(amount,taxId){
	var taxAmount = 0;
	
	if(amount.value !=null && amount.value !=""){
		taxAmount = amount.value;
	}
	

	
	finalInvoiceList = JSON.parse(sessionStorage.getItem("INVOICE_ITEMS"));
	
	finalInvoiceList.invoiceTaxList.forEach(function(element){
		if(element.taxId == taxId){
			element.totalamount = taxAmount;
		}
	});
	

//    finalInvoiceList.invoiceSubTotl = parseFloat(totPrice).toFixed();
           
	sessionStorage.setItem("INVOICE_ITEMS", JSON.stringify(finalInvoiceList));
}
