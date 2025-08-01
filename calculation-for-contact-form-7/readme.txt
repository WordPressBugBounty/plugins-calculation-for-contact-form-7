=== Calculation For Contact Form 7 ===
Tags: calculation contact form 7 , calcualtor contact form 7 , contact form 7 calculation
Requires at least: 5.5
Tested up to: 6.8
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html


== Description ==

**Contact Form 7 Calculator**  make calculations between each field without reloading its work. It can be making a cost calculator for contact form 7. You can do your form in summation, multiplication, deduction, and division as well as many other formulae. 

This plugin in you can be using any kind of calculators like weight calculation, hotel booking quote, car renting calculation, mortgage calculator, cost calculator, finance calculator, tax calculator, and many others.

**Contact Form 7 Price Calculator** like between more than two fields you can make calculations on all kinds of arithmetic expressions allowed in your form.

<h3>FEATURES FOR CALCULATION FOR THE CONTACT FORM 7:</h3>

* Easy to use
* Show calculator tag in contact form 7.
* Add different calculation formulas.
* Days, Months and Year Counting.
* You can add a prefix for calculator value.
* Choice digits after the decimal point for calculator value.
* Maths Equation
* Conditional Logic
* Multiple Total field
* Hide Field 
* Custom Label Radio, Select Box, Checkbox
* Prefix Left (Pro)
* Prefix Right (Pro)
* Formating Decimal (Pro)
* Thousand Seperator (Pro)
* Decialmal Seperator (Pro)

[**📽Documentation**](https://www.plugin999.com/plugin/calculation-for-contact-form-7/#tab-description) | [**📽Get Pro**](https://www.plugin999.com/plugin/calculation-for-contact-form-7/) | [**📽Support**](https://www.plugin999.com/support/)

<strong>DEMO Basic Calculator</strong>: https://plugin999.com/demo/calcutecontactform7/basic-calculator-operations/
<strong>DEMO Date Calculator</strong>: https://plugin999.com/demo/calcutecontactform7/calendar/
<strong>DEMO Conditional Calculator</strong>: https://plugin999.com/demo/calcutecontactform7/conditional-function/
<strong>DEMO Maths Calculator</strong>: https://plugin999.com/demo/calcutecontactform7/funtion-2/

Get Me Explain How to Setup form

<pre><code>
[text text-1]
[text text-2]
</code></pre>

<h4>Create Label and Price in Radio, Select, Checkbox</h4>
<pre><code>
[select menu-1 default:1 "$20--20" "$40--40" "$60--60" "$80--80"]
[checkbox checkbox-1 default:1 "$20--20" "$40--40" "$60--60" "$80--80"]
[radio radio-1 default:1 "$20--20" "$40--40" "$60--60" "$80--80"]
</code></pre>

<h4>Addition</h4>
<pre><code>
[calculator calculator-1 "text-1 + text-2"]
</code></pre>

<h4>Subtraction</h4>
<pre><code>
[calculator calculator-2 "text-1 - text-2"]
</code></pre>

<h4>Multiplication</h4>
<pre><code>
[calculator calculator-3 "text-1 * text-2"]
</code></pre>

<h4>Division</h4>
<pre><code>
[calculator calculator-4 "text-1 / text-2"]
</code></pre>

<h4>If Condition</h4>
If text-1 is smaller than text-2 than value come 10 otherwise 5
<pre><code>
[calculator calculator-5 "if(text-1 < text-2, 10 , 5)"]
</code></pre>

<h4>If Else Condition </h4>
If text-1 is smaller than text-2 than value come 10 otherwise , If text1 smaller than 2 than 1 otherwise 2 (Inner If Must Keep into <strong>( )</strong>)
<pre><code>
[calculator calculator-5 "if(text1 < text2,(if(text1 < 2, (1), (2))), 5)"]
</code></pre>

<h4>MOD Function</h4>
<pre><code>
[calculator calculator-6 "MOD(text-1 , text-2)"]
</code></pre>

<h4>AVERAGE Function</h4>
<pre><code>
[calculator calculator-7 "AVERAGE(text-1 , text-2)"]
</code></pre>

<h4>MIN Function</h4>
<pre><code>
[calculator calculator-8 "MIN(text-1 , text-2)"]
</code></pre>

<h4>MAX Function</h4>
<pre><code>
[calculator calculator-9 "MAX(text-1 , text-2)"]
</code></pre>

<h4>RANDOM Function</h4>
<pre><code>
[calculator calculator-10 "RANDOM(text-1 , text-2)"]
</code></pre>

<h4>POW Function</h4>
<pre><code>
[calculator calculator-11 "POW(text-1 , text-2)"]
</code></pre>

<h4>CEIL Function</h4>
<pre><code>
[calculator calculator-12 "CEIL(text-1)"]
</code></pre>

<h4>ROUND Function</h4>
<pre><code>
[calculator calculator-13 "ROUND(text-1)"]
</code></pre>

<h4>FLOOR Function</h4>
<pre><code>
[calculator calculator-14 "FLOOR(text-1)"]
</code></pre>

<h4>SIN Function</h4>
<pre><code>
[calculator calculator-15 "SIN(text-1)"]
</code></pre>

<h4>COS Function</h4>
<pre><code>
[calculator calculator-16 "COS(text-1)"]
</code></pre>

<h4>ABS Function</h4>
<pre><code>
[calculator calculator-17 "ABS(text-1)"]
</code></pre>

<h4>SQRT Function</h4>
<pre><code>
[calculator calculator-18 "SQRT(text-1)"]
</code></pre>

<h4>Date Calculation</h4>
<pre><code>
[date date-1]
[date date-2]
</code></pre>

<h4>Calculate Days</h4>
<pre><code>
[calculator calculator-18 "DAYS(date-1 , date-2)"]
</code></pre>

<h4>Calculate Days</h4>
<pre><code>
[calculator calculator-19 "DAYS(date-1 , date-2)"]
</code></pre>

<h4>Calculate Months</h4>
<pre><code>
[calculator calculator-20 "MONTHS(date-1 , date-2)"]
</code></pre>

<h4>Calculate Years</h4>
<pre><code>
[calculator calculator-21 "YEARS(date-1 , date-2)"]
</code></pre>

<h4>Calculate Field Hide</h4>
<pre><code>
[calculator calculator-22 hide_field "text-1 + text-2"]
</code></pre>

<h4>Calculate Prefix Left</h4>
<pre><code>
[calculator calculator-22 prefix_left:$ "text-1 + text-2"]
</code></pre>

<h4>Calculate Prefix Right</h4>
<pre><code>
[calculator calculator-22 prefix_right:$ "text-1 + text-2"]
</code></pre>

<h4>Calculate Thousand Seperator</h4>
<pre><code>
[calculator calculator-22 thousand_sep:comma "text-1 + text-2"]
</code></pre>

<h4>Calculate Decimal Number</h4>
<pre><code>
[calculator calculator-22 decimal_number:2 "text-1 + text-2"]
</code></pre>

<h4>Calculate Decimal Seperator</h4>
<pre><code>
[calculator calculator-22 decimal_sep:. "text-1 + text-2"]
</code></pre>


Cost Calculation easy way to complete by plugin

== CONTRIBUTE AND TRANSLATE ==

Calculation for contact form 7 is translated into multiple languages Chinese, Dutch, Russian, Spanish, and many more. Help localize calculation for contact form 7 even further by adding your locale Language. [Click Here](https://translate.wordpress.org/projects/wp-plugins/calculation-for-contact-form-7/)

== FAQ ==
= How to calculation with formula =
You click the calculator tag and then enter formulas with any fields (you can see after formulas field their examples).


== Screenshots ==
1. Explain adding a calculator field
2. Add formulas, prefix, and precision
3. Calculate field values in contact form 7
