registerIndicator(
"bulls",
"Bulls Power(v1.0)",
function (context) {
	    var dataInput = getDataInput(context, 0)
	    var dataInputHigh = getDataInput(context, 1)
	    var dataOutput = getDataOutput(context, "bulls")
	    var dataOutputEma = getDataOutput(context, "ema")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	        }
	    }

	    ema(dataInput, dataOutputEma, calculatedLength, period)

	    while (ptr < dataInput.length) {
	        dataOutput[ptr] = dataInputHigh[ptr] - dataOutputEma[ptr]
	        ptr++
	    }
	},
[{
	name: "period",
	value: 14,
	required: true,
	type: "Integer",
	range: [1, 100]
}], [{
	name: "Close",
	index: 0
}, {
	name: "High",
	index: 1
}], [{
	name: "bulls",
	visible: true,
	renderType: "Histogram",
	color: "steelblue"
}, {
	name: "ema",
	visible: false,
	renderType: null,
	color: null
}],
"SEPARATE_WINDOW")
