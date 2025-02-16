jQuery(document).ready(function() {
	const cal_if = (x) => {
	    // Use case-insensitive regex to match IF statements
	    const re = /IF\(([^()]*|\((?:[^()]*|\([^()]*\))*\))*\)/gi; // Added 'i' flag for case insensitivity

	    // Replace outermost IF statements
	    x = x.replace(re, (match) => {
	        return cal_if_inner(match);
	    });

	    // Recursively check for more IF statements
	    if (x.match(re)) {
	        x = cal_if(x);
	    }

	    return x;
	};

	const cal_if_inner = (x) => {
	    // Remove IF and parentheses for processing
	    x = x.replace(/[IF()]/gi, ''); // Made 'IF' case insensitive
	    const data = x.split(",");

	    // Check for equality conditions
	    const check_data = data[0].split("==");
	    if (check_data.length > 1) {
	        return check_data[0].trim() === check_data[1].trim()
	            ? eval(data[1].trim()) // Evaluate and return the true case
	            : eval(data[2].trim()); // Evaluate and return the false case
	    } else {
	        // Handle normal conditional evaluation
	        try {
	            return eval(data[0].trim())
	                ? eval(data[1].trim()) // Evaluate and return the true case
	                : eval(data[2].trim()); // Evaluate and return the false case
	        } catch (e) {
	            console.error("Error evaluating condition:", data[0].trim(), e);
	            return 0; // Return a default value on error
	        }
	    }
	};
	const calculateDaysBetweenDates = (date1, date2) => {
		let timeDiff;
		console.log(date2,date1);
		if (date2 == 0 || date1 == 0) {
		    return 0;
		} else {
			console.log("abc",date2,date1);
		    timeDiff = date2 - date1; // Calculate the difference between the two dates
		    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
		}
	    
	};
		// Function to calculate months between two dates
	const calculateMonthsBetweenDates = (date1, date2) => {
	    let timeDiff;
	    console.log(date2, date1);
	    if (date2 == 0 || date1 == 0) {
	        return 0;
	    } else {
	        console.log("abc", date2, date1);
	        timeDiff = date2 - date1; // Calculate the difference between the two dates
	        const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
	        return Math.ceil(totalDays / 30.44); // Convert days to months (average)
	    }
	};

	// Function to calculate years between two dates
	const calculateYearsBetweenDates = (date1, date2) => {
	    if (date2 == 0 || date1 == 0) {
	        return 0;
	    } else {

		    const startDate = new Date(Math.min(date1, date2));
		    const endDate = new Date(Math.max(date1, date2));
		    
		    let years = endDate.getFullYear() - startDate.getFullYear();
		    
		    // Adjust if the end day is less than the start day or the month is less
		    if (endDate.getMonth() < startDate.getMonth() || 
		        (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())) {
		        years--;
		    }
		    
		    return years;
		}
	};


	/* Calculate value for select box and radio button */
	function CALCULATIONCF7_custom_radio_button(){
		jQuery("form.wpcf7-form select option").each(function (i) {
	       	if(jQuery(this).attr("type") === undefined) {
	       		var cal_selectval = jQuery(this).attr("value");
	       		if(cal_selectval.indexOf("--") != -1){
	       			var cal_selectdata = cal_selectval.split("--");
	       			jQuery(this).attr("price", cal_selectdata[1]);
	       			jQuery(this).attr("value", cal_selectdata[0]);
	       			jQuery(this).text(cal_selectdata[0]);
	       		}		
	       	}
       	})
		jQuery("form.wpcf7-form input").each(function () { 
       		if( jQuery(this).attr("type") == "radio" || jQuery(this).attr("type") == "checkbox" ) {
       			var cal_inputval = jQuery(this).attr("value");
       			console.log(cal_inputval);
       			if(cal_inputval.indexOf("--") != -1){
       				console.log("dfdfd");
       			    var cal_inputdata = cal_inputval.split("--");
       			   	jQuery(this).val(cal_inputdata[0]);
       			   	jQuery(this).attr("price", cal_inputdata[1]);
       			   	jQuery(this).parent().find('span.wpcf7-list-item-label').text(cal_inputdata[0]);
       			}
       		}
       	})
	}

	/* check form length */
	if ( jQuery( ".wpcf7-form" ).length ) {
		CALCULATIONCF7_custom_radio_button();
		CALCULATIONCF7_calculate_formulas();
		/* select , check box , radio button change here*/
		jQuery("body").on("change",".wpcf7 input,.wpcf7 select",function(e){
			CALCULATIONCF7_calculate_formulas();
		});
		jQuery("input[type='number']").bind('keyup', function () {
		  	CALCULATIONCF7_calculate_formulas();
		});
		jQuery("input[type='text']").bind('keyup', function () {
		  	CALCULATIONCF7_calculate_formulas();
		});
	}

	/*calculator formula setup */
	function CALCULATIONCF7_calculate_formulas(){
       	var match;
       	var reg =[]; 
	   	var total = 0;

      	jQuery("form.wpcf7-form input").each(function () { 
       		if( jQuery(this).attr("type") == "checkbox" || jQuery(this).attr("type") == "radio"  ) {
       			var name = jQuery(this).attr("name").replace("[]", "");
       			reg.push(name);
       			//alert($(this).attr("name"));
       		}else{
       			reg.push(jQuery(this).attr("name"));
       		}
       	})

       	jQuery("form.wpcf7-form select").each(function () {
       		var name_select = jQuery(this).attr("name").replace("[]", "");
       		reg.push(name_select);
       	})

       	reg = calculationcf7s_duplicates_type(reg);
       	//console.log(reg);
       	var all_tag = new RegExp( reg.join("|"));
       	jQuery( ".calculationcf7-total" ).each(function( index ) {
       		var type = '';
       		var eq = jQuery(this).data('formulas');
       		var prefix_left = jQuery(this).attr("prefix_left");
       		var prefix_right = jQuery(this).attr("prefix_right");
       		var thousand_sep = jQuery(this).attr("thousand_sep");
       		var decimal_number = jQuery(this).attr("decimal_number");
       		var decimal_sep = jQuery(this).attr("decimal_sep");
       		
       		if(eq != '' || eq.length != 0){
				while ( match = all_tag.exec( eq ) ){
					var perfact_match = calculationcf7s_word_In_String(eq,match[0]);
					if(perfact_match != false){
						var type = jQuery("input[name="+match[0]+"]").attr("type");
						if( type === undefined ) {
							var type = jQuery("input[name='"+match[0]+"[]']").attr("type");
						}
						//console.log(type);
						if( type =="checkbox" ){
							var vl = 0;
							jQuery("input[name='"+match[0]+"[]']:checked").each(function () {
								var attr = jQuery(this).attr('price');
								//console.log(attr);
								if (typeof attr !== typeof undefined && attr !== false) {
									vl += new Number(attr);
								} else {
									vl += new Number(jQuery(this).val());
								}
							});
						}else if( type == "radio"){
							var attr = jQuery("input[name='"+match[0]+"']:checked").attr('price');
							if (typeof attr !== typeof undefined && attr !== false) {
								var vl = attr;
							} else {
								 var vl = jQuery("input[name='"+match[0]+"']:checked").val();
							}
						}else if( type == "date"){
							
						  var datevale = jQuery("input[name="+match[0]+"]").val();	
						  if(!isNaN(new Date(datevale).getTime())){
						  	console.log("date",new Date(datevale).getTime())
						  	vl=new Date(datevale).getTime();
						  }else{
						  	vl=0;
						  }
						 //console.log("date",new Date(vl).getTime());
						}else if( type === undefined ){
							var check_select = jQuery("select[name="+match[0]+"]").val();
							//console.log('--'+check_select+'--')
							if(check_select === undefined){
								var vl = 0;
								jQuery("select[name='"+match[0]+"[]'] option:selected").each(function () {
									var attr = jQuery(this).attr('price');
									if (typeof attr !== typeof undefined && attr !== false) {
										vl += new Number(attr);
									} else {
										vl += new Number(jQuery(this).val());
									}
								});
							} else {
								var vl = 0;
								jQuery("select[name="+match[0]+"] option:selected").each(function () {
									var attr = jQuery(this).attr('price');
									if (typeof attr !== typeof undefined && attr !== false) {
										vl += new Number(attr);
									} else {
										vl += new Number(jQuery(this).val());
									}
								});
							}
						}else{
							var attr = jQuery("input[name="+match[0]+"]").attr('price');
							if (typeof attr !== typeof undefined && attr !== false) {
							    var vl = attr;
							} else {
								var vl = jQuery("input[name="+match[0]+"]").val();	
							}
						}
						if(!jQuery.isNumeric(vl)){
							vl = 0;
						}
					}else{
					 	var error = 1;
					}
					nueq = '';
					eq = eq.replace( match[0], vl );
					neq = eq;
					var neqf = '';
					if(nueq === ''){
						neqf = eq;
					} else {
					 	neqf = nueq;
					}
				}
       		}else{
       			alert("Please Enter Formula in Calculator");
       			return false;
       		}
       		if(error == 1){
       			alert("Please Enter Valid Formula in Calculator");
       			return false;
       		}
       		var modified = '';
       		var total;
			try{
				
				var fresult = ''; 
			    

				    neqf = neqf.replace(/CEIL\(([^)]+)\)/gi, function(match, expression) {
					    return Math.ceil(eval(expression));  // Apply ceil to the expression
					});

					neqf = neqf.replace(/ROUND\((.*)\)/, function(match, expression) {
					    return Math.round(eval(expression));
					});

					neqf = neqf.replace(/FLOOR\(([^)]+)\)/gi, function(match, expression) {
					    return Math.floor(eval(expression));
					});

					neqf = neqf.replace(/MOD\(([^,]+),([^,]+)\)/gi, function(match, num1, num2) {
					    return Number(eval(num1)) % Number(eval(num2));
					});

					neqf = neqf.replace(/AVERAGE\(([^)]+)\)/gi, function(match, numbers) {
					    var nums = numbers.split(",").map(Number);
					    return nums.reduce((a, b) => a + b, 0) / nums.length;
					});

					neqf = neqf.replace(/MIN\(([^)]+)\)/gi, function(match, numbers) {
					    var nums = numbers.split(",").map(Number);
					    return Math.min(...nums);
					});

					neqf = neqf.replace(/MAX\(([^)]+)\)/gi, function(match, numbers) {
					    var nums = numbers.split(",").map(Number);
					    return Math.max(...nums);
					});

					neqf = neqf.replace(/ABS\(([^)]+)\)/gi, function(match, number) {
					    return Math.abs(eval(number));
					});

					neqf = neqf.replace(/SQRT\(([^)]+)\)/gi, function(match, expression) {
					    return Math.sqrt(eval(expression));
					});

					neqf = neqf.replace(/RANDOM\(([^,]+),([^,]+)\)/gi, function(match, start, end) {
					    return Math.floor(Math.random() * (Number(end) - Number(start) + 1)) + Number(start);
					});

					neqf = neqf.replace(/POW\(([^,]+),([^,]+)\)/gi, function(match, base, exponent) {
					    return Math.pow(eval(base), eval(exponent));
					});

					neqf = neqf.replace(/SIN\(([^)]+)\)/gi, function(match, angle) {
					    return Math.sin(eval(angle));
					});

					neqf = neqf.replace(/COS\(([^)]+)\)/gi, function(match, angle) {
					    return Math.cos(eval(angle));
					});
					neqf = neqf.replace(/DAYS\(([^,]+),([^,]+)\)/gi, function(match, date1, date2) {
						console.log("date1",date1);
					    return calculateDaysBetweenDates(date1.trim(), date2.trim());
					});
					neqf = neqf.replace(/MONTHS\(([^,]+),([^,]+)\)/gi, function(match, date1, date2) {
						console.log("date1",date1);
					    return calculateMonthsBetweenDates(date1.trim(), date2.trim());
					});
					neqf = neqf.replace(/YEARS\(([^,]+),([^,]+)\)/gi, function(match, date1, date2) {
						console.log("date1",date1);
					    return calculateYearsBetweenDates(date1.trim(), date2.trim());
					});

				neqf =cal_if(neqf);
				console.log(neqf);


			    var r = eval( neqf ); // Evaluate the final equation
			    console.log(r);
			    total = r;

			    if( decimal_number != undefined ) {
			      	fresult = r.toFixed(decimal_number);
				} else {
					fresult = r;
				}
				if( decimal_sep != undefined ) {
					decimal_sep = decimal_sep.replace('comma', ',');
			      	fresult = fresult.replace('.', decimal_sep);
				}

				if( thousand_sep != undefined ) {
					thousand_sep = thousand_sep.replace('comma', ',');
			      	fresult=fresult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousand_sep);
				}
				console.log(fresult);

				
				
				
				if( prefix_left != undefined ) {
					modified = prefix_left;
				}
				//console.log("modified",modified);
				fresult = isNaN(fresult) ? 0 : fresult;
				modified = modified+fresult;
				//console.log("modified",modified);
				if( prefix_right != undefined ) {
					modified = modified+prefix_right;
				}
				//console.log("modified",modified);

			}
			catch(e)
			{
				alert( "Error:" + e );
				console.log( "Error:" + e );
			}
			
			jQuery(this).attr("price", total);
			jQuery(this).val(modified);
		});
	}

	/*contact form 7 duplicator type  */
	function calculationcf7s_duplicates_type(arr) {
	    var ret_arr = [];
	    var obj = {};
	    for (var i = 0; i < arr.length; i++) {
	        obj[arr[i]] = true;
	    }
	    //console.log(obj);
	    for (var key in obj) {
	    	if("_wpcf7" == key || "_wpcf7_version" == key  || "_wpcf7_locale" == key  || "_wpcf7_unit_tag" == key || "_wpnonce" == key || "undefined" == key  || "_wpcf7_container_post" == key || "_wpcf7_nonce" == key  ){

	    	}else {
	    		ret_arr.push(key);
	    	}
	    }
	    return ret_arr;
	}

	/* calculator word In String */
	function calculationcf7s_word_In_String(s, word){
	  return new RegExp( '\\b' + word + '\\b', 'i').test(s);
	}
	
	
});